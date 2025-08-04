import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Debug() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message, success = true) => {
    setResults(prev => [...prev, {
      id: Date.now(),
      message,
      success,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testConnection = async () => {
    setLoading(true);
    setResults([]);

    try {
      // Тест 1: Проверка конфигурации
      addResult(`Config: API_URL = ${API_URL}`);
      addResult(`Hostname: ${typeof window !== 'undefined' ? window.location.hostname : 'Server'}`);
      addResult(`Protocol: ${typeof window !== 'undefined' ? window.location.protocol : 'Server'}`);

      // Тест 2: Простой fetch
      addResult('Testing simple fetch...');
      const response = await fetch(`${API_URL}/health`);
      addResult(`Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        addResult(`Response data: ${JSON.stringify(data)}`);
      } else {
        addResult(`Error: ${response.statusText}`, false);
      }

      // Тест 3: CORS test
      addResult('Testing CORS...');
      const corsResponse = await fetch(`${API_URL}/test-cors`);
      addResult(`CORS response status: ${corsResponse.status}`);

      // Тест 4: Auth endpoint
      addResult('Testing auth endpoint...');
      const authResponse = await fetch(`${API_URL}/auth/tma-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          init_data: {
            user: {
              id: 792506815,
              username: "test",
              first_name: "Test",
              language_code: "ru",
              photo_url: "https://example.com/photo.jpg"
            },
            hash: 'debug_hash'
          }
        })
      });
      addResult(`Auth response status: ${authResponse.status}`);

    } catch (error) {
      addResult(`Network error: ${error.message}`, false);
      addResult(`Error details: ${error.stack}`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>Debug Connection</h1>
      
      <button 
        onClick={testConnection}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      <div>
        <h2>Results:</h2>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          maxHeight: '500px',
          overflowY: 'auto'
        }}>
          {results.map(result => (
            <div 
              key={result.id}
              style={{
                marginBottom: '10px',
                padding: '8px',
                backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>
                [{result.timestamp}] {result.success ? '✓' : '✗'}
              </div>
              <div>{result.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 