import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import useTelegram from './useTelegram';

const API_URL = 'http://localhost:8000';

export default function useGame(gameId = null) {
  const router = useRouter();
  const { user } = useTelegram();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  // Создание новой игры
  const createGame = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token for createGame:', token ? 'Token exists' : 'No token');
      if (!token) {
        // Добавляем фейковый токен для отладки
        console.log('Setting fake token for debugging');
        localStorage.setItem('token', 'fake-debug-token-for-testing');
      }

      const token2 = localStorage.getItem('token');
      console.log('Token after check:', token2);

      const response = await fetch(`${API_URL}/game/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token2}`
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const game = await response.json();
      setGame(game);
      return game;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  };

  // Присоединение к игре
  const joinGame = async (gameId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/game/${gameId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const game = await response.json();
      setGame(game);
      return game;
    } catch (error) {
      console.error('Error joining game:', error);
      throw error;
    }
  };

  // Установка готовности
  const setReady = async (isReady) => {
    try {
      if (!gameId) throw new Error('No game ID provided');
      
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/game/${gameId}/ready`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_ready: isReady })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const updatedGame = await response.json();
      setGame(updatedGame);
      return updatedGame;
    } catch (error) {
      console.error('Error setting ready status:', error);
      throw error;
    }
  };

  // Получение списка активных игр
  const getActiveGames = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return [];

      const response = await fetch(`${API_URL}/game/active`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching active games:', error);
      return [];
    }
  };

  // Подключение к WebSocket
  const connectWebSocket = useCallback(() => {
    if (!gameId || !user || wsRef.current) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8000/game/${gameId}/ws?token=${token}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message:', data);

      if (data.type === 'game_state') {
        setGame(data.game);
        
        // Если игра перешла в статус "in_progress", перенаправляем на страницу игры
        if (data.game.status === 'in_progress') {
          router.push(`/game/${data.game.id}`);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      wsRef.current = null;
      setConnected(false);
      setTimeout(connectWebSocket, 1000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error');
    };

    wsRef.current = ws;
  }, [gameId, user, router]);

  // Получение информации об игре
  const fetchGame = async () => {
    if (!gameId) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/game/${gameId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const gameData = await response.json();
      setGame(gameData);
    } catch (error) {
      console.error('Error fetching game:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchGame();
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [gameId, connectWebSocket]);

  return {
    game,
    error,
    loading,
    connected,
    createGame,
    joinGame,
    setReady,
    getActiveGames
  };
} 