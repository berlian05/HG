from datetime import datetime, timedelta
from bson import ObjectId
from ..core.database import get_database
from ..models.game import GameModel, PlayerInGame, GameStatus, GameAction, BetAction, GameState
from ..models.user import UserModel
import logging
import asyncio
from typing import Optional, Dict

logger = logging.getLogger(__name__)

class GameService:
    _round_timers: Dict[str, asyncio.Task] = {}
    _waiting_timers: Dict[str, asyncio.Task] = {}

    @staticmethod
    async def create_game(user: UserModel) -> GameModel:
        """Создает новую игру"""
        try:
            logger.info(f"Creating new game for user {user.id}")
            db = get_database()

            # Создаем игрока
            player = PlayerInGame(
                user_id=str(user.id),
                username=user.username,
                photo_url=user.photo_url,
                stats=user.stats.dict()
            )

            # Создаем игру
            game = GameModel(
                game_type="arizona",
                status=GameStatus.WAITING,
                players=[player],
                state=GameState(
                    waiting_started_at=datetime.utcnow(),
                    waiting_ends_at=datetime.utcnow() + timedelta(seconds=30),
                    total_bets_initial=10,  # Начальное количество ставок первого игрока
                    total_bets_remaining=10  # Текущее количество ставок
                )
            )

            # Сохраняем в БД
            result = await db.games.insert_one(game.dict(exclude={'id'}))
            game.id = str(result.inserted_id)

            # Запускаем таймер ожидания
            await GameService._start_waiting_timer(str(result.inserted_id))

            return game
        except Exception as e:
            logger.error(f"Error creating game: {e}")
            raise

    @staticmethod
    async def join_game(game_id: str, user: UserModel) -> GameModel:
        """Присоединяется к игре"""
        try:
            logger.info(f"User {user.id} joining game {game_id}")
            db = get_database()

            # Получаем игру
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                raise ValueError("Game not found")

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Проверяем, не присоединился ли уже игрок
            if any(p.user_id == str(user.id) for p in game.players):
                return game

            # Проверяем, есть ли место
            if len(game.players) >= game.max_players:
                raise ValueError("Game is full")

            # Проверяем статус игры
            if game.status != GameStatus.WAITING:
                raise ValueError("Game already started")

            # Создаем игрока
            player = PlayerInGame(
                user_id=str(user.id),
                username=user.username,
                photo_url=user.photo_url,
                stats=user.stats.dict()
            )

            # Добавляем игрока
            game.players.append(player)

            # Обновляем общее количество ставок
            game.state.total_bets_initial = len(game.players) * 10
            game.state.total_bets_remaining = game.state.total_bets_initial

            # Обновляем в БД
            await db.games.update_one(
                {"_id": ObjectId(game_id)},
                {"$set": {
                    "players": [p.dict() for p in game.players],
                    "state": game.state.dict()
                }}
            )

            return game
        except Exception as e:
            logger.error(f"Error joining game: {e}")
            raise

    @staticmethod
    async def set_ready(game_id: str, user_id: str, is_ready: bool) -> GameModel:
        """Устанавливает готовность игрока"""
        try:
            logger.info(f"Setting ready={is_ready} for user {user_id} in game {game_id}")
            db = get_database()

            # Получаем игру
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                raise ValueError("Game not found")

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Находим игрока
            player_index = next((i for i, p in enumerate(game.players) if p.user_id == user_id), None)
            if player_index is None:
                raise ValueError("Player not in game")

            # Если игрок становится готовым и еще не платил вступительный взнос
            if is_ready and not game.players[player_index].is_ready:
                # Проверяем баланс игрока
                user_data = await db.users.find_one({"_id": ObjectId(user_id)})
                if not user_data:
                    raise ValueError("User not found")
                
                # Получаем баланс с значением по умолчанию 1000 HGP
                user_stats = user_data.get('stats', {})
                user_balance = user_stats.get('balance', 1000.0)  # По умолчанию 1000 HGP
                
                # Если баланс отрицательный, устанавливаем его в 0
                if user_balance < 0:
                    user_balance = 0
                    # Обновляем баланс в базе данных
                    await db.users.update_one(
                        {"_id": ObjectId(user_id)},
                        {"$set": {"stats.balance": 0}}
                    )
                    logger.info(f"Reset negative balance to 0 for user {user_id}")
                
                if user_balance < game.entry_cost:
                    raise ValueError(f"Insufficient balance. Required: {game.entry_cost} HGP, Available: {user_balance} HGP")
                
                # Списываем вступительный взнос
                await db.users.update_one(
                    {"_id": ObjectId(user_id)},
                    {"$inc": {"stats.balance": -game.entry_cost}}
                )
                logger.info(f"Deducted {game.entry_cost} HGP from user {user_id}")

            # Обновляем статус готовности
            game.players[player_index].is_ready = is_ready

            # Проверяем, есть ли готовые игроки
            any_ready = any(p.is_ready for p in game.players)

            if any_ready:
                # Начинаем игру
                game.status = GameStatus.IN_PROGRESS
                game.started_at = datetime.utcnow()
                
                # Отменяем таймер ожидания
                await GameService._cancel_waiting_timer(game_id)
                
                # Инициализируем состояние игры
                game.state.round_started_at = datetime.utcnow()
                game.state.round_ends_at = datetime.utcnow() + timedelta(seconds=10)
                game.state.current_bet = game.entry_cost
                
                # Запускаем таймер раунда
                await GameService._start_round_timer(game_id)

            # Обновляем в БД
            await db.games.update_one(
                {"_id": ObjectId(game_id)},
                {"$set": {
                    "players": [p.dict() for p in game.players],
                    "status": game.status,
                    "started_at": game.started_at,
                    "state": game.state.dict()
                }}
            )

            return game
        except Exception as e:
            logger.error(f"Error setting ready status: {e}")
            raise

    @staticmethod
    async def make_bet(game_id: str, user_id: str, action: GameAction) -> GameModel:
        """Делает ставку в игре"""
        try:
            logger.info(f"Making bet in game {game_id} for user {user_id}: {action}")
            db = get_database()

            # Получаем игру
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                raise ValueError("Game not found")

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Проверяем статус игры
            if game.status != GameStatus.IN_PROGRESS:
                raise ValueError("Game is not in progress")

            # Находим игрока
            player_index = next((i for i, p in enumerate(game.players) if p.user_id == user_id), None)
            if player_index is None:
                raise ValueError("Player not in game")

            player = game.players[player_index]

            # Проверяем, может ли игрок делать ставку
            if not player.is_active:
                raise ValueError("Player is not active")
            if player.bets_remaining <= 0:
                raise ValueError("No bets remaining")

            # Обрабатываем действие
            if action.action_type == BetAction.RAISE:
                # Становимся лидером
                player.bets_remaining -= 1
                player.last_bet_at = datetime.utcnow()
                player.is_leader = True

                # Сбрасываем лидерство у остальных игроков
                for p in game.players:
                    if p.user_id != user_id:
                        p.is_leader = False

                # Обновляем общее количество оставшихся ставок
                game.state.total_bets_remaining = sum(p.bets_remaining for p in game.players)
                
                # Добавляем действие в историю
                game.state.last_action = {
                    "type": action.action_type,
                    "player_id": user_id,
                    "timestamp": datetime.utcnow()
                }
                game.state.round_history.append(game.state.last_action)

            elif action.action_type == BetAction.FOLD:
                player.is_active = False
                player.is_leader = False
                
                # Добавляем действие в историю
                game.state.last_action = {
                    "type": action.action_type,
                    "player_id": user_id,
                    "timestamp": datetime.utcnow()
                }
                game.state.round_history.append(game.state.last_action)

                # Обновляем общее количество оставшихся ставок
                game.state.total_bets_remaining = sum(p.bets_remaining for p in game.players)

            # Проверяем условия окончания раунда
            active_players = [p for p in game.players if p.is_active]
            if len(active_players) == 1:
                # Раунд окончен, один победитель
                winner = active_players[0]
                await GameService._end_round(game_id, winner.user_id)
                game.status = GameStatus.FINISHED
                game.winner_id = winner.user_id
                game.finished_at = datetime.utcnow()

            # Обновляем в БД
            await db.games.update_one(
                {"_id": ObjectId(game_id)},
                {"$set": {
                    "players": [p.dict() for p in game.players],
                    "state": game.state.dict(),
                    "status": game.status,
                    "winner_id": game.winner_id,
                    "finished_at": game.finished_at
                }}
            )

            return game
        except Exception as e:
            logger.error(f"Error making bet: {e}")
            raise

    @staticmethod
    async def get_active_games() -> list[GameModel]:
        """Получает список активных игр"""
        try:
            db = get_database()
            games = await db.games.find({
                "status": {"$in": [GameStatus.WAITING, GameStatus.IN_PROGRESS]}
            }).to_list(length=100)
            return [GameModel(**{**g, 'id': str(g['_id'])}) for g in games]
        except Exception as e:
            logger.error(f"Error getting active games: {e}")
            raise

    @staticmethod
    async def get_finished_games(limit: int = 10) -> list[GameModel]:
        """Получает список завершенных игр"""
        try:
            db = get_database()
            games = await db.games.find({
                "status": GameStatus.FINISHED
            }).sort("finished_at", -1).limit(limit).to_list(length=limit)
            return [GameModel(**{**g, 'id': str(g['_id'])}) for g in games]
        except Exception as e:
            logger.error(f"Error getting finished games: {e}")
            raise

    @staticmethod
    async def get_current_user_game(user_id: str) -> GameModel:
        """Получает текущую игру пользователя"""
        try:
            db = get_database()
            # Ищем игру, где пользователь участвует и игра активна
            game_data = await db.games.find_one({
                "status": {"$in": [GameStatus.WAITING, GameStatus.IN_PROGRESS]},
                "players.user_id": user_id
            })
            
            if not game_data:
                return None
                
            return GameModel(**{**game_data, 'id': str(game_data['_id'])})
        except Exception as e:
            logger.error(f"Error getting current user game: {e}")
            raise

    @staticmethod
    async def get_game(game_id: str) -> GameModel:
        """Получает информацию об игре"""
        try:
            db = get_database()
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                raise ValueError("Game not found")
            return GameModel(**{**game_data, 'id': str(game_data['_id'])})
        except Exception as e:
            logger.error(f"Error getting game: {e}")
            raise

    @staticmethod
    async def reset_game(game_id: str) -> GameModel:
        """Сбрасывает игру в начальное состояние для нового раунда"""
        try:
            logger.info(f"Resetting game {game_id}")
            db = get_database()

            # Получаем игру
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                raise ValueError("Game not found")

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Сбрасываем состояние игры
            game.status = GameStatus.WAITING
            game.winner_id = None
            game.finished_at = None
            game.started_at = None

            # Сбрасываем состояние игроков
            for player in game.players:
                player.bets_remaining = 10
                player.is_ready = False
                player.is_active = True
                player.is_leader = False
                player.last_bet_at = None

            # Сбрасываем состояние раунда
            game.state = GameState(
                waiting_started_at=datetime.utcnow(),
                waiting_ends_at=datetime.utcnow() + timedelta(seconds=30),
                total_bets_initial=len(game.players) * 10,
                total_bets_remaining=len(game.players) * 10,
                round_history=[]
            )

            # Обновляем в БД
            await db.games.update_one(
                {"_id": ObjectId(game_id)},
                {"$set": {
                    "status": game.status,
                    "winner_id": game.winner_id,
                    "finished_at": game.finished_at,
                    "started_at": game.started_at,
                    "players": [p.dict() for p in game.players],
                    "state": game.state.dict()
                }}
            )

            # Запускаем таймер ожидания
            await GameService._start_waiting_timer(game_id)

            return game
        except Exception as e:
            logger.error(f"Error resetting game: {e}")
            raise

    @staticmethod
    async def _start_round_timer(game_id: str):
        """Запускает таймер раунда"""
        try:
            # Отменяем существующий таймер, если есть
            await GameService._cancel_round_timer(game_id)

            # Создаем новый таймер
            timer = asyncio.create_task(GameService._round_timer(game_id))
            GameService._round_timers[game_id] = timer
        except Exception as e:
            logger.error(f"Error starting round timer: {e}")

    @staticmethod
    async def _cancel_round_timer(game_id: str):
        """Отменяет таймер раунда"""
        try:
            timer = GameService._round_timers.get(game_id)
            if timer:
                timer.cancel()
                GameService._round_timers.pop(game_id)
        except Exception as e:
            logger.error(f"Error canceling round timer: {e}")

    @staticmethod
    async def _round_timer(game_id: str):
        """Таймер раунда"""
        try:
            await asyncio.sleep(10)  # 10 секунд на раунд
            
            # Получаем игру
            db = get_database()
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                return

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Проверяем статус игры
            if game.status != GameStatus.IN_PROGRESS:
                return

            # Находим победителя раунда (игрок с наибольшей ставкой)
            active_players = [p for p in game.players if p.is_active]
            if active_players:
                winner = max(active_players, key=lambda p: p.current_bet)
                await GameService._end_round(game_id, winner.user_id)

        except Exception as e:
            logger.error(f"Error in round timer: {e}")
        finally:
            GameService._round_timers.pop(game_id, None)

    @staticmethod
    async def _start_waiting_timer(game_id: str):
        """Запускает таймер ожидания"""
        try:
            # Отменяем существующий таймер, если есть
            await GameService._cancel_waiting_timer(game_id)

            # Создаем новый таймер
            timer = asyncio.create_task(GameService._waiting_timer(game_id))
            GameService._waiting_timers[game_id] = timer
        except Exception as e:
            logger.error(f"Error starting waiting timer: {e}")

    @staticmethod
    async def _cancel_waiting_timer(game_id: str):
        """Отменяет таймер ожидания"""
        try:
            timer = GameService._waiting_timers.get(game_id)
            if timer:
                timer.cancel()
                GameService._waiting_timers.pop(game_id)
        except Exception as e:
            logger.error(f"Error canceling waiting timer: {e}")

    @staticmethod
    async def _waiting_timer(game_id: str):
        """Таймер ожидания"""
        try:
            await asyncio.sleep(30)  # 30 секунд на ожидание
            
            # Получаем игру
            db = get_database()
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                return

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Проверяем статус игры
            if game.status != GameStatus.WAITING:
                return

            # Проверяем количество готовых игроков
            ready_players = [p for p in game.players if p.is_ready]
            if len(ready_players) >= 1:  # Игра начинается даже с одним готовым игроком
                # Начинаем игру
                game.status = GameStatus.IN_PROGRESS
                game.started_at = datetime.utcnow()
                game.state.round_started_at = datetime.utcnow()
                game.state.round_ends_at = datetime.utcnow() + timedelta(seconds=10)
                game.state.current_bet = game.entry_cost

                # Обновляем в БД
                await db.games.update_one(
                    {"_id": ObjectId(game_id)},
                    {"$set": {
                        "status": game.status,
                        "started_at": game.started_at,
                        "state": game.state.dict()
                    }}
                )

                # Запускаем таймер раунда
                await GameService._start_round_timer(game_id)
            else:
                # Отменяем игру
                game.status = GameStatus.FINISHED
                game.finished_at = datetime.utcnow()

                # Обновляем в БД
                await db.games.update_one(
                    {"_id": ObjectId(game_id)},
                    {"$set": {
                        "status": game.status,
                        "finished_at": game.finished_at
                    }}
                )

        except Exception as e:
            logger.error(f"Error in waiting timer: {e}")
        finally:
            GameService._waiting_timers.pop(game_id, None)

    @staticmethod
    async def _end_round(game_id: str, winner_id: str):
        """Завершает раунд и обновляет статистику"""
        try:
            db = get_database()
            
            # Получаем игру
            game_data = await db.games.find_one({"_id": ObjectId(game_id)})
            if not game_data:
                return

            game = GameModel(**{**game_data, 'id': str(game_data['_id'])})

            # Обновляем статистику победителя
            winner = next((p for p in game.players if p.user_id == winner_id), None)
            if winner:
                # Вычисляем общий приз (сумма всех вступительных взносов)
                total_prize = len(game.players) * game.entry_cost
                
                # Обновляем статистику в игре
                winner.stats["games_won"] += 1
                winner.stats["total_earnings"] += total_prize
                
                # Обновляем статистику в профиле
                await db.users.update_one(
                    {"_id": ObjectId(winner_id)},
                    {"$inc": {
                        "stats.games_won": 1,
                        "stats.total_earnings": total_prize,
                        "stats.balance": total_prize,  # Начисляем приз на баланс
                        "stats.current_rating": 50  # Увеличиваем рейтинг за победу
                    }}
                )
                logger.info(f"Winner {winner_id} received {total_prize} HGP prize")

            # Обновляем статистику всех игроков
            for player in game.players:
                await db.users.update_one(
                    {"_id": ObjectId(player.user_id)},
                    {"$inc": {
                        "stats.games_played": 1
                    }}
                )

            # Обновляем состояние игры
            game.status = GameStatus.FINISHED
            game.winner_id = winner_id
            game.finished_at = datetime.utcnow()
            game.state.round_started_at = None
            game.state.round_ends_at = None
            game.state.last_action = {
                "type": "round_end",
                "winner_id": winner_id,
                "pot": len(game.players) * 45,
                "timestamp": datetime.utcnow()
            }
            game.state.round_history.append(game.state.last_action)

            # Обновляем в БД
            await db.games.update_one(
                {"_id": ObjectId(game_id)},
                {"$set": {
                    "status": game.status,
                    "winner_id": game.winner_id,
                    "finished_at": game.finished_at,
                    "players": [p.dict() for p in game.players],
                    "state": game.state.dict()
                }}
            )

            # Убираем автоматический сброс - пусть игра остается завершенной
            # asyncio.create_task(GameService._delayed_reset(game_id))

        except Exception as e:
            logger.error(f"Error ending round: {e}")
            raise

    @staticmethod
    async def _delayed_reset(game_id: str):
        """Сбрасывает игру через небольшую задержку"""
        try:
            await asyncio.sleep(5)  # Даем время показать результаты
            await GameService.reset_game(game_id)
        except Exception as e:
            logger.error(f"Error in delayed reset: {e}") 