import { useState, useEffect } from 'react';
import { API_URL, WS_URL } from '../config';

export default function TestConnection() {
  const [apiStatus, setApiStatus] = useState('testing');
  const [wsStatus, setWsStatus] = useState('testing');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    // Тестируем API подключение
    const testApi = async () => {
      try {
        addLog(`Testing API connection to: ${API_URL}`);
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
          const data = await response.json();
          addLog(`API connection successful: ${JSON.stringify(data)}`);
          setApiStatus('success');
        } else {
          addLog(`API connection failed: ${response.status} ${response.statusText}`);
          setApiStatus('error');
        }
      } catch (error) {
        addLog(`API connection error: ${error.message}`);
        setApiStatus('error');
      }
    };

    // Тестируем WebSocket подключение
    const testWebSocket = () => {
      try {
        addLog(`Testing WebSocket connection to: ${WS_URL}`);
        const ws = new WebSocket(`${WS_URL}/health`);
        
        ws.onopen = () => {
          addLog('WebSocket connection successful');
          setWsStatus('success');
          ws.close();
        };
        
        ws.onerror = (error) => {
          addLog(`WebSocket connection error: ${error}`);
          setWsStatus('error');
        };
        
        ws.onclose = () => {
          addLog('WebSocket connection closed');
        };
      } catch (error) {
        addLog(`WebSocket connection error: ${error.message}`);
        setWsStatus('error');
      }
    };

    testApi();
    testWebSocket();
  }, []);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>API Connection</h2>
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: apiStatus === 'success' ? '#d4edda' : 
                         apiStatus === 'error' ? '#f8d7da' : '#fff3cd',
          color: apiStatus === 'success' ? '#155724' : 
                apiStatus === 'error' ? '#721c24' : '#856404'
        }}>
          Status: {apiStatus}
        </div>
        <div>URL: {API_URL}</div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>WebSocket Connection</h2>
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: wsStatus === 'success' ? '#d4edda' : 
                         wsStatus === 'error' ? '#f8d7da' : '#fff3cd',
          color: wsStatus === 'success' ? '#155724' : 
                wsStatus === 'error' ? '#721c24' : '#856404'
        }}>
          Status: {wsStatus}
        </div>
        <div>URL: {WS_URL}</div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Device Info</h2>
        <div>User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent : 'Server'}</div>
        <div>Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'Server'}</div>
        <div>Port: {typeof window !== 'undefined' ? window.location.port : 'Server'}</div>
      </div>

      <div>
        <h2>Logs</h2>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '5px',
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
} 