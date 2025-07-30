from fastapi import WebSocket
from typing import Dict, List
import json
import asyncio
from datetime import datetime

class ConnectionManager:
    def __init__(self):
        # Активные соединения по игре {game_id: {user_id: WebSocket}}
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}
        # Таймеры игр {game_id: asyncio.Task}
        self.game_timers: Dict[str, asyncio.Task] = {}
        
    async def connect(self, websocket: WebSocket, game_id: str, user_id: str):
        """Подключает нового пользователя к игре"""
        await websocket.accept()
        if game_id not in self.active_connections:
            self.active_connections[game_id] = {}
        self.active_connections[game_id][user_id] = websocket
        
    def disconnect(self, game_id: str, user_id: str):
        """Отключает пользователя от игры"""
        if game_id in self.active_connections:
            self.active_connections[game_id].pop(user_id, None)
            if not self.active_connections[game_id]:
                self.active_connections.pop(game_id)
                if game_id in self.game_timers:
                    self.game_timers[game_id].cancel()
                    self.game_timers.pop(game_id)
                
    async def broadcast_to_game(self, game_id: str, message: dict):
        """Отправляет сообщение всем участникам игры"""
        if game_id in self.active_connections:
            for websocket in self.active_connections[game_id].values():
                try:
                    await websocket.send_json(message)
                except:
                    # Если не удалось отправить сообщение, пропускаем
                    continue
                
    async def send_personal_message(self, game_id: str, user_id: str, message: dict):
        """Отправляет сообщение конкретному пользователю"""
        if game_id in self.active_connections and user_id in self.active_connections[game_id]:
            await self.active_connections[game_id][user_id].send_json(message)
            
    def get_connected_users(self, game_id: str) -> List[str]:
        """Возвращает список подключенных пользователей"""
        if game_id in self.active_connections:
            return list(self.active_connections[game_id].keys())
        return []

# Создаем глобальный менеджер соединений
manager = ConnectionManager() 