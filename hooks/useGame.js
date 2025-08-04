import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import useSimpleAuth from './useSimpleAuth';
import { API_URL, WS_URL } from '../config';

export default function useGame(gameId = null) {
  const router = useRouter();
  const { user } = useSimpleAuth();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  // Создание новой игры
  const createGame = async () => {
    try {
      console.log('Creating new game...');
      console.log('User data:', user);
      
      const token = localStorage.getItem('token');
      console.log('Token for createGame:', token ? 'Token exists' : 'No token');

      if (!token) {
        console.error('No token found for game creation');
        throw new Error('No token found');
      }

      console.log('Sending create game request to:', `${API_URL}/game/create`);
      const response = await fetch(`${API_URL}/game/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Create game response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error creating game:', errorText);
        throw new Error(errorText);
      }

      const gameData = await response.json();
      console.log('Created game:', gameData);
      
      setGame(gameData);
      return gameData;
    } catch (error) {
      console.error('Error in createGame:', error);
      throw error;
    }
  };

  // Присоединение к игре
  const joinGame = async (gameId) => {
    try {
      console.log('Joining game:', gameId);
      
      const token = localStorage.getItem('token');
      console.log('Token for joinGame:', token ? 'Token exists' : 'No token');
      
      if (!token) {
        console.error('No token found for joining game');
        throw new Error('No token found');
      }

      console.log('Sending join game request to:', `${API_URL}/game/${gameId}/join`);
      const response = await fetch(`${API_URL}/game/${gameId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Join game response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error joining game:', errorText);
        throw new Error(errorText);
      }

      const gameData = await response.json();
      console.log('Joined game:', gameData);
      
      setGame(gameData);
      return gameData;
    } catch (error) {
      console.error('Error in joinGame:', error);
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
      console.log('Fetching active games...');
      
      const token = localStorage.getItem('token');
      console.log('Token for getActiveGames:', token ? 'Token exists' : 'No token');
      console.log('Token value:', token);
      
      if (!token) {
        console.warn('No token found, returning empty games list');
        return [];
      }

      console.log('Sending get active games request to:', `${API_URL}/game/active`);
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`
      });
      
      const response = await fetch(`${API_URL}/game/active`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Get active games response status:', response.status);
      console.log('Get active games response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching active games:', errorText);
        throw new Error(errorText);
      }

      const games = await response.json();
      console.log('Active games:', games);
      return games;
    } catch (error) {
      console.error('Error in getActiveGames:', error);
      return [];
    }
  };

  // Получение списка завершенных игр
  const getFinishedGames = async (limit = 10) => {
    try {
      console.log('Fetching finished games...');
      
      const token = localStorage.getItem('token');
      console.log('Token for getFinishedGames:', token ? 'Token exists' : 'No token');
      console.log('Token value:', token);
      
      if (!token) {
        console.warn('No token found, returning empty games list');
        return [];
      }

      console.log('Sending get finished games request to:', `${API_URL}/game/finished?limit=${limit}`);
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`
      });
      
      const response = await fetch(`${API_URL}/game/finished?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Get finished games response status:', response.status);
      console.log('Get finished games response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching finished games:', errorText);
        throw new Error(errorText);
      }

      const games = await response.json();
      console.log('Finished games:', games);
      return games;
    } catch (error) {
      console.error('Error in getFinishedGames:', error);
      return [];
    }
  };

  // Получение текущей игры пользователя
  const getCurrentUserGame = async () => {
    try {
      console.log('Fetching current user game...');
      
      const token = localStorage.getItem('token');
      console.log('Token for getCurrentUserGame:', token ? 'Token exists' : 'No token');
      console.log('Token value:', token);
      
      if (!token) {
        console.warn('No token found, returning null');
        return null;
      }

      console.log('Sending get current user game request to:', `${API_URL}/game/current`);
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`
      });
      
      const response = await fetch(`${API_URL}/game/current`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Get current user game response status:', response.status);
      console.log('Get current user game response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        if (response.status === 404) {
          console.log('No current game found for user');
          return null;
        }
        const errorText = await response.text();
        console.error('Error fetching current user game:', errorText);
        throw new Error(errorText);
      }

      const gameData = await response.json();
      console.log('Current user game:', gameData);
      return gameData;
    } catch (error) {
      console.error('Error in getCurrentUserGame:', error);
      return null;
    }
  };

  // Подключение к WebSocket
  const connectWebSocket = useCallback(() => {
    if (!gameId || !user || wsRef.current) {
      console.log('Skipping WebSocket connection:', {
        hasGameId: !!gameId,
        hasUser: !!user,
        hasExistingConnection: !!wsRef.current
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found for WebSocket connection');
      return;
    }

    // Используем правильный WebSocket URL
    const wsFullUrl = `${WS_URL}/game/${gameId}/ws?token=${token}`;
    console.log('Connecting to WebSocket:', wsFullUrl);

    const ws = new WebSocket(wsFullUrl);

    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      console.log('WebSocket URL:', wsFullUrl);
      setConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);

        if (data.type === 'game_state') {
          console.log('Updating game state:', data.game);
          setGame(data.game);
          
          if (data.game.status === 'in_progress') {
            console.log('Game started, redirecting to game page');
            router.push(`/game/${data.game.id}`);
          }
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected, attempting reconnect...');
      wsRef.current = null;
      setConnected(false);
      setTimeout(connectWebSocket, 1000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      console.error('WebSocket URL that failed:', wsFullUrl);
      setError('Connection error');
    };

    wsRef.current = ws;
  }, [gameId, user, router]);

  // Получение информации об игре
  const fetchGame = async () => {
    if (!gameId) return;

    try {
      console.log('Fetching game details:', gameId);
      
      const token = localStorage.getItem('token');
      console.log('Token for fetchGame:', token ? 'Token exists' : 'No token');
      console.log('Token value:', token);
      
      if (!token) {
        console.error('No token found for fetching game');
        throw new Error('No token found');
      }

      console.log('Sending fetch game request to:', `${API_URL}/game/${gameId}`);
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`
      });
      
      const response = await fetch(`${API_URL}/game/${gameId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Fetch game response status:', response.status);
      console.log('Fetch game response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching game:', errorText);
        throw new Error(errorText);
      }

      const gameData = await response.json();
      console.log('Fetched game data:', gameData);
      
      setGame(gameData);
    } catch (error) {
      console.error('Error in fetchGame:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      console.log('Game ID changed, fetching game and connecting WebSocket');
      fetchGame();
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        console.log('Cleaning up WebSocket connection');
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
    getActiveGames,
    getFinishedGames,
    getCurrentUserGame
  };
}