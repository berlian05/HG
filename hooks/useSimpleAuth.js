import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function useSimpleAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('SimpleAuth: Initializing...');
        
        // Проверяем, есть ли уже токен
        const existingToken = localStorage.getItem('token');
        if (existingToken) {
          console.log('SimpleAuth: Found existing token, skipping auth');
          // Создаем тестового пользователя
          const testUser = {
            id: "test123",
            telegram_id: 792506815,
            username: "born095",
            first_name: "Дмитрий",
            language_code: "ru",
            photo_url: "https://api.telegram.org/file/bot8414752528:AAHrF-uPa8GujE280q7-ppe53lX7c3_GUOo/photos/file_0.jpg",
            stats: {
              games_played: 0,
              games_won: 0,
              total_earnings: 0,
              current_rating: 1000
            }
          };
          setUser(testUser);
          setLoading(false);
          return;
        }

        // Проверяем данные от Telegram WebApp
        console.log('SimpleAuth: Checking Telegram WebApp data...');
        console.log('window.Telegram?.WebApp:', window.Telegram?.WebApp);
        console.log('window.Telegram?.WebApp.user:', window.Telegram?.WebApp?.user);
        console.log('window.Telegram?.WebApp.initDataUnsafe:', window.Telegram?.WebApp?.initDataUnsafe);

        // Проверяем, есть ли данные от Telegram WebApp
        if (!window.Telegram?.WebApp?.user) {
          console.error('SimpleAuth: No Telegram WebApp data found!');
          throw new Error('Telegram WebApp data not available. Please open this app from Telegram bot.');
        }

        console.log('SimpleAuth: Using real Telegram WebApp data');
        const tgUser = window.Telegram.WebApp.user;
        const tgInitData = window.Telegram.WebApp.initData;
        
        const userData = {
          user: {
            id: tgUser.id,
            username: tgUser.username || `user_${tgUser.id}`,
            first_name: tgUser.first_name,
            last_name: tgUser.last_name,
            language_code: tgUser.language_code,
            photo_url: tgUser.photo_url
          },
          auth_date: Math.floor(Date.now() / 1000),
          hash: tgInitData || 'real_telegram_hash'
        };

        console.log('SimpleAuth: Sending auth request with real data:', userData);

        // Отправляем запрос на авторизацию
        const response = await fetch(`${API_URL}/auth/tma-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            init_data: userData
          })
        });

        console.log('SimpleAuth: Auth response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('SimpleAuth: Auth error:', errorText);
          throw new Error(`Ошибка авторизации: ${errorText}`);
        }

        const data = await response.json();
        console.log('SimpleAuth: Auth success:', data);
        console.log('SimpleAuth: Saving real token:', data.access_token);

        // Сохраняем токен
        localStorage.setItem('token', data.access_token);
        
        // Сохраняем пользователя
        setUser(data.user);

      } catch (error) {
        console.error('SimpleAuth: Error during auth:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return { user, loading, error };
}