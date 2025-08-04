const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:8000';
  }
  
  // Для Telegram Web App используем тот же домен
  const hostname = window.location.hostname;
  
  // Если мы на localhost, используем IP адрес
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${window.location.hostname}:8000`;
  }
  
  // Для Telegram Web App используем HTTPS
  return `https://${hostname}`;
};

// Функция для получения WebSocket URL
const getWebSocketUrl = () => {
  if (typeof window === 'undefined') {
    return 'ws://localhost:8000';
  }
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `ws://${window.location.hostname}:8000`;
  }
  
  // Для Telegram Web App используем WSS (secure WebSocket)
  return `wss://${hostname}`;
};

const API_URL = getApiUrl();
const WS_URL = getWebSocketUrl();

// Отладочная информация
if (typeof window !== 'undefined') {
  console.log('Config debug:', {
    hostname: window.location.hostname,
    API_URL,
    WS_URL
  });
}

export { API_URL, WS_URL };