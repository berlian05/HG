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
            "game": game.to_dict()
        })
        return game
    except Exception as e:
        logger.error(f"Error joining game {game_id} for user {current_user.id}: {e}")
        raise

from pydantic import BaseModel

class ReadyRequest(BaseModel):
    is_ready: bool

@router.post("/{game_id}/ready")
async def set_ready(
    game_id: str,
    request: ReadyRequest,
    current_user: UserModel = Depends(get_current_user_from_token)
) -> GameModel:
    """Устанавливает готовность игрока"""
    game = await GameService.set_ready(game_id, str(current_user.id), request.is_ready)
    # Отправляем обновление всем игрокам
    await manager.broadcast_to_game(game_id, {
        "type": "game_state",
        "game": game.to_dict()
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
        "game": game.to_dict()
    })
    return game

@router.get("/active")
async def get_active_games(
    current_user: UserModel = Depends(get_current_user_from_token)
) -> List[GameModel]:
    """Получает список активных игр"""
    return await GameService.get_active_games()

@router.get("/finished")
async def get_finished_games(
    limit: int = Query(10, ge=1, le=50),
    current_user: UserModel = Depends(get_current_user_from_token)
) -> List[GameModel]:
    """Получает список завершенных игр"""
    return await GameService.get_finished_games(limit)

@router.get("/current")
async def get_current_user_game(
    current_user: UserModel = Depends(get_current_user_from_token)
) -> GameModel:
    """Получает текущую игру пользователя"""
    game = await GameService.get_current_user_game(str(current_user.id))
    if not game:
        raise HTTPException(status_code=404, detail="No current game found")
    return game

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
    logger.info(f"WebSocket connection attempt for game {game_id}")
    logger.debug(f"Token: {token[:20]}...")
    
    try:
        # Получаем пользователя по токену напрямую
        from ..services.auth import get_current_user
        user = await get_current_user(token)
        if not user:
            logger.warning(f"Invalid token for WebSocket connection to game {game_id}")
            await websocket.close(code=4001)
            return

        # Подключаем WebSocket
        await manager.connect(websocket, game_id, str(user.id))
        logger.info(f"WebSocket connected for user {user.id} to game {game_id}")

        # Получаем текущее состояние игры
        game = await GameService.get_game(game_id)
        if game:
            # Отправляем текущее состояние игры
            await websocket.send_json({
                "type": "game_state",
                "game": game.to_dict()
            })
            logger.info(f"Sent initial game state to WebSocket for game {game_id}")

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
                        "game": game.to_dict()
                    })

    except Exception as e:
        logger.error(f"WebSocket error for game {game_id}: {e}")
        try:
            await websocket.close(code=4000)
        except:
            pass 