import { useEffect, useState } from 'react';
import useSimpleAuth from '../hooks/useSimpleAuth';

export default function TelegramProvider({ children }) {
  const [isTelegram, setIsTelegram] = useState(false);
  const { user, loading } = useSimpleAuth(); // Используем простую авторизацию

  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    const isInTelegram = window.Telegram?.WebApp || 
                      window.location.search.includes('tgWebApp=true');
    
    console.log('Telegram environment check:', {
      isInTelegram,
      webApp: window.Telegram?.WebApp,
      searchParams: window.location.search
    });

    // Всегда считаем, что мы в Telegram для тестирования
    setIsTelegram(true);
  }, []);

  // Если загружаемся - показываем загрузку
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '18px'
      }}>
        Загрузка...
      </div>
    );
  }

  // Всегда показываем приложение для тестирования
  return children;
}