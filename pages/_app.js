import '../styles/globals.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const [isTelegram, setIsTelegram] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    const checkTelegram = () => {
      if (typeof window !== 'undefined') {
        // В режиме разработки пропускаем проверку
        if (process.env.NODE_ENV === 'development') {
          console.log('Development mode: skipping Telegram check');
          setIsTelegram(true);
          setLoading(false);
          return;
        }

        // Ждем загрузки скрипта Telegram Web App
        const waitForTelegram = () => {
          if (window.Telegram?.WebApp) {
            console.log('Telegram WebApp found');
            window.Telegram.WebApp.ready();
            setIsTelegram(true);
            setLoading(false);
          } else {
            console.log('Waiting for Telegram WebApp...');
            setTimeout(waitForTelegram, 100);
          }
        };

        waitForTelegram();
      }
    };

    checkTelegram();
  }, []);

  // Показываем загрузку
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
        Loading...
      </div>
    );
  }

  // Если не в Telegram, показываем сообщение
  if (!isTelegram) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '18px',
        textAlign: 'center',
        padding: '20px'
      }}>
        Please open this app in Telegram
      </div>
    );
  }

  // Если все проверки пройдены, показываем приложение
  return (
    <>
      <Component {...pageProps} />
      <div id="bg-overlay-bottom" />
    </>
  );
}