import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000';

export default function useTelegram() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        // В режиме разработки используем тестового пользователя
        if (process.env.NODE_ENV === 'development') {
          console.log('Development mode: using test user');
          const debugUser = {
            id: 123456789,
            first_name: "Test",
            username: "testuser",
            language_code: "ru"
          };

          const response = await fetch(`${API_URL}/auth/tma-login?init_data=${encodeURIComponent(JSON.stringify({
            user: debugUser,
            auth_date: Math.floor(Date.now() / 1000),
            hash: 'debug_hash'
          }))}`, {
            method: 'POST'
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setUser(data.user);
          }
          setLoading(false);
          return;
        }

        // Проверяем, есть ли Telegram WebApp
        if (!window.Telegram?.WebApp) {
          console.log('Telegram WebApp not found');
          
          // Проверяем, есть ли параметры в URL
          const urlParams = new URLSearchParams(window.location.search);
          const tgWebAppData = urlParams.get('tgWebAppData');
          const tgWebAppUser = urlParams.get('tgWebAppUser');
          
          console.log('URL params:', urlParams.toString());
          console.log('tgWebAppData:', tgWebAppData);
          console.log('tgWebAppUser:', tgWebAppUser);
          
          if (tgWebAppData || tgWebAppUser) {
            console.log('Found Telegram data in URL params');
            // Используем данные из URL
            const userData = tgWebAppUser ? JSON.parse(decodeURIComponent(tgWebAppUser)) : null;
            
            if (userData) {
              const response = await fetch(`${API_URL}/auth/tma-login?init_data=${encodeURIComponent(JSON.stringify({
                user: userData,
                auth_date: Math.floor(Date.now() / 1000),
                hash: 'debug_hash'
              }))}`, {
                method: 'POST'
              });

              if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setUser(data.user);
              }
            }
          } else {
            // Используем тестового пользователя в продакшене для отладки
            console.log('Using test user in production for debugging');
            const debugUser = {
              id: 123456789,
              first_name: "Test",
              username: "testuser",
              language_code: "ru"
            };

            const response = await fetch(`${API_URL}/auth/tma-login?init_data=${encodeURIComponent(JSON.stringify({
              user: debugUser,
              auth_date: Math.floor(Date.now() / 1000),
              hash: 'debug_hash'
            }))}`, {
              method: 'POST'
            });

            if (response.ok) {
              const data = await response.json();
              localStorage.setItem('token', data.token);
              setUser(data.user);
            }
          }
          
          setLoading(false);
          return;
        }

        // Инициализируем WebApp
        console.log('Initializing Telegram WebApp');
        window.Telegram.WebApp.ready();
        console.log('WebApp initialized');

        // Получаем данные из WebApp
        const webAppData = window.Telegram.WebApp.initData;
        const webAppUser = window.Telegram.WebApp.initDataUnsafe?.user;

        console.log('WebApp initData:', webAppData);
        console.log('WebApp initDataUnsafe:', window.Telegram.WebApp.initDataUnsafe);
        console.log('WebApp user:', webAppUser);

        // Если нет данных пользователя, используем тестового пользователя
        if (!webAppUser) {
          console.log('No user data in WebApp, using test user');
          const debugUser = {
            id: 123456789,
            first_name: "Test",
            username: "testuser",
            language_code: "ru"
          };

          const response = await fetch(`${API_URL}/auth/tma-login?init_data=${encodeURIComponent(JSON.stringify({
            user: debugUser,
            auth_date: Math.floor(Date.now() / 1000),
            hash: 'debug_hash'
          }))}`, {
            method: 'POST'
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setUser(data.user);
          }
          setLoading(false);
          return;
        }

        // Отправляем данные на бэкенд
        const response = await fetch(`${API_URL}/auth/tma-login?init_data=${encodeURIComponent(webAppData || JSON.stringify({
          user: webAppUser,
          auth_date: Math.floor(Date.now() / 1000),
          hash: 'debug_hash'
        }))}`, {
          method: 'POST'
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          setUser(data.user);
        } else {
          console.error('Auth failed:', await response.text());
        }
      } catch (error) {
        console.error('Error in TMA init:', error);
      } finally {
        setLoading(false);
      }
    };

    initTelegram();
  }, []);

  return { user, loading };
}