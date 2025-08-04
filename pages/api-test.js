import { useState, useEffect } from 'react';
import { API_URL, WS_URL } from '../config';

export default function ApiTest() {
  const [apiStatus, setApiStatus] = useState('testing');
  const [apiResponse, setApiResponse] = useState('');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const testApi = async () => {
      try {
        addLog(`Testing API connection to: ${API_URL}`);
        addLog(`Testing health endpoint: ${API_URL}/health`);
        
        const response = await fetch(`${API_URL}/health`);
        addLog(`Response status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          addLog(`API connection successful: ${JSON.stringify(data)}`);
          setApiStatus('success');
          setApiResponse(JSON.stringify(data, null, 2));
        } else {
          const errorText = await response.text();
          addLog(`API connection failed: ${response.status} ${response.statusText}`);
          addLog(`Error details: ${errorText}`);
          setApiStatus('error');
          setApiResponse(errorText);
        }
      } catch (error) {
        addLog(`API connection error: ${error.message}`);
        setApiStatus('error');
        setApiResponse(error.message);
      }
    };

    testApi();
  }, []);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>API Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Configuration</h2>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '10px'
        }}>
          <div><strong>API URL:</strong> {API_URL}</div>
          <div><strong>WS URL:</strong> {WS_URL}</div>
          <div><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'Server'}</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>API Status</h2>
        <div style={{
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: apiStatus === 'success' ? '#d4edda' : 
                         apiStatus === 'error' ? '#f8d7da' : '#fff3cd',
          color: apiStatus === 'success' ? '#155724' : 
                apiStatus === 'error' ? '#721c24' : '#856404',
          marginBottom: '10px'
        }}>
          Status: {apiStatus}
        </div>
      </div>

      {apiResponse && (
        <div style={{ marginBottom: '20px' }}>
          <h2>API Response</h2>
          <pre style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            maxHeight: '300px',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {apiResponse}
          </pre>
        </div>
      )}

      <div>
        <h2>Logs</h2>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          maxHeight: '400px',
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