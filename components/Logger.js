import { useEffect } from 'react';
import { API_URL } from '../config';

export default function Logger() {
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = function(...args) {
      originalLog.apply(console, args);
      fetch(`${API_URL}/api/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'log', message: args.join(' ') })
      }).catch(() => {});
    };

    console.error = function(...args) {
      originalError.apply(console, args);
      fetch(`${API_URL}/api/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'error', message: args.join(' ') })
      }).catch(() => {});
    };

    console.warn = function(...args) {
      originalWarn.apply(console, args);
      fetch(`${API_URL}/api/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'warn', message: args.join(' ') })
      }).catch(() => {});
    };
  }, []);

  return null;
}