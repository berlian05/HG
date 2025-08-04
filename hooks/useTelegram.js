import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function useTelegram() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        console.log('Starting Telegram initialization...');
        console.log('API_URL:', API_URL);
        
        setLoading(true);
        setError(null);

        // Получаем данные от Telegram WebApp
        const urlParams = new URLSearchParams(window.location.search);
        const initData = urlParams.get('initData');
        
        console.log('=== TELEGRAM WEBAPP DATA ===');
        console.log('URL params:', window.location.search);
        console.log('initData param:', initData);
        console.log('window.Telegram?.WebApp:', window.Telegram?.WebApp);
        console.log('window.Telegram?.WebApp.initData:', window.Telegram?.WebApp?.initData);
        console.log('window.Telegram?.WebApp.initDataUnsafe:', window.Telegram?.WebApp?.initDataUnsafe);
        console.log('window.Telegram?.WebApp.user:', window.Telegram?.WebApp?.user);
        console.log('=== END TELEGRAM DATA ===');
        
        let response;
        
        // Проверяем, есть ли данные от Telegram WebApp
        if (window.Telegram?.WebApp?.user) {
          console.log('Found real Telegram WebApp user data');
          const tgUser = window.Telegram.WebApp.user;
          const tgInitData = window.Telegram.WebApp.initData;
          
          console.log('Real Telegram user:', tgUser);
          console.log('Real Telegram initData:', tgInitData);
          
          // Отправляем реальные данные от Telegram на бэкенд
          response = await fetch(`${API_URL}/auth/tma-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              init_data: {
                user: tgUser,
                auth_date: Math.floor(Date.now() / 1000),
                hash: tgInitData || 'real_telegram_hash'
              }
            })
          });
        } else if (initData) {
          console.log('Found initData in URL:', initData);
          
          // Декодируем данные от Telegram
          const decodedData = JSON.parse(decodeURIComponent(initData));
          console.log('Decoded initData:', decodedData);
          
          // Отправляем данные от Telegram на бэкенд
          response = await fetch(`${API_URL}/auth/tma-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              init_data: decodedData
            })
          });
        } else {
          console.error('No Telegram WebApp data found!');
          throw new Error('Telegram WebApp data not available. Please open this app from Telegram bot.');
        }

        console.log('Auth response status:', response.status);
        console.log('Auth response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok) {
          console.error('Auth error:', responseText);
          throw new Error(`Ошибка авторизации: ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log('Auth success:', data);
        
        // Сохраняем токен
        localStorage.setItem('token', data.access_token);
        
        // Сохраняем данные пользователя
        setUser(data.user);

      } catch (err) {
        console.error('Auth error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initTelegram();
  }, []);

  // Функция для логаута
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, logout };
}