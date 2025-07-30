from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, Query
from typing import List
from ..services.game import GameService
from ..services.websocket import manager
from ..models.game import GameModel, GameAction
from ..routers.auth import get_current_user_from_token
from ..models.user import UserModel
from ..core.database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/game", tags=["game"])

@router.post("/create")
async def create_game(current_user: UserModel = Depends(get_current_user_from_token)) -> GameModel:
    """Создает новую игру"""
    logger.info(f"Creating game for user: {current_user.id}")
    try:
        game = await GameService.create_game(current_user)
        logger.info(f"Game created successfully: {game.id}")
        return game
    except Exception as e:
        logger.error(f"Error creating game: {e}")
        raise

@router.post("/{game_id}/join")
async def join_game(
    game_id: str,
    current_user: UserModel = Depends(get_current_user_from_token)
) -> GameModel:
    """Присоединяется к игре"""
    logger.info(f"User {current_user.id} trying to join game {game_id}")
    try:
        game = await GameService.join_game(game_id, current_user)
        logger.info(f"User {current_user.id} successfully joined game {game_id}")
        # Отправляем обновление всем игрокам
        await manager.broadcast_to_game(game_id, {
            "type": "game_state",
            "game": game.dict()
        })
        return game
    except Exception as e:
        logger.error(f"Error joining game {game_id} for user {current_user.id}: {e}")
        raise

@router.post("/{game_id}/ready")
async def set_ready(
    game_id: str,
    is_ready: bool,
    current_user: UserModel = Depends(get_current_user_from_token)
) -> GameModel:
    """Устанавливает готовность игрока"""
    game = await GameService.set_ready(game_id, str(current_user.id), is_ready)
    # Отправляем обновление всем игрокам
    await manager.broadcast_to_game(game_id, {
        "type": "game_state",
        "game": game.dict()
    })
    return game

@router.post("/{game_id}/bet")
async def make_bet(
    game_id: str,
    action: GameAction,
    current_user: UserModel = Depends(get_current_user_from_token)
) -> GameModel:
    """Делает ставку в игре"""
    game = await GameService.make_bet(game_id, str(current_user.id), action)
    # Отправляем обновление всем игрокам
    await manager.broadcast_to_game(game_id, {
        "type": "game_state",
        "game": game.dict()
    })
    return game

@router.get("/active")
async def get_active_games(
    current_user: UserModel = Depends(get_current_user_from_token)
) -> List[GameModel]:
    """Получает список активных игр"""
    return await GameService.get_active_games()

@router.get("/{game_id}")
async def get_game(
    game_id: str,
    current_user: UserModel = Depends(get_current_user_from_token)
) -> GameModel:
    """Получает информацию об игре"""
    return await GameService.get_game(game_id)

@router.websocket("/{game_id}/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    game_id: str,
    token: str = Query(...)
):
    """WebSocket соединение для игры"""
    try:
        # Получаем пользователя по токену
        user = await get_current_user_from_token(f"Bearer {token}")
        if not user:
            await websocket.close(code=4001)
            return

        # Подключаем WebSocket
        await manager.connect(websocket, game_id, str(user.id))

        # Получаем текущее состояние игры
        game = await GameService.get_game(game_id)
        if game:
            # Отправляем текущее состояние игры
            await websocket.send_json({
                "type": "game_state",
                "game": game.dict()
            })

        try:
            while True:
                # Ждем сообщений от клиента
                data = await websocket.receive_json()
                logger.info(f"Received WebSocket message: {data}")

                if data["type"] == "ping":
                    await websocket.send_json({"type": "pong"})

        except WebSocketDisconnect:
            # Отключаем пользователя
            manager.disconnect(game_id, str(user.id))
            # Обновляем список игроков для остальных
            connected_users = manager.get_connected_users(game_id)
            if connected_users:
                game = await GameService.get_game(game_id)
                if game:
                    # Отправляем обновление всем
                    await manager.broadcast_to_game(game_id, {
                        "type": "game_state",
                        "game": game.dict()
                    })

    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close(code=4000) 