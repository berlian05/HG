import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function useTestAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        console.log('Starting auth process...');
        
        // Пробуем получить данные из URL
        const searchParams = new URLSearchParams(window.location.search);
        const initData = searchParams.get('initData');
        
        console.log('URL params:', {
          search: window.location.search,
          initData
        });

        let userData;
        
        if (initData) {
          // Если есть данные в URL - используем их
          try {
            const decodedData = decodeURIComponent(initData);
            userData = JSON.parse(decodedData);
            console.log('Parsed URL data:', userData);
          } catch (e) {
            console.error('Error parsing URL data:', e);
          }
        }

        // Если нет данных в URL - используем тестовые
        if (!userData) {
          console.log('Using test data...');
          userData = {
            user: {
              id: 792506815,
              username: "born095",
              first_name: "Дмитрий",
              language_code: "ru",
              photo_url: "https://api.telegram.org/file/bot8414752528:AAHrF-uPa8GujE280q7-ppe53lX7c3_GUOo/photos/file_0.jpg"
            },
            hash: 'debug_hash'
          };
        }

        console.log('Sending auth request to:', `${API_URL}/auth/tma-login`);
        console.log('With data:', userData);

        const response = await fetch(`${API_URL}/auth/tma-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            init_data: userData
          })
        });

        console.log('Auth response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Auth error response:', errorText);
          throw new Error(`Auth error: ${errorText}`);
        }

        const data = await response.json();
        console.log('Auth success:', data);
        
        localStorage.setItem('token', data.access_token);
        setUser(data.user);
      } catch (err) {
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    login();
  }, []);

  return { user, loading };
}