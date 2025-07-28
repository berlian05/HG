import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Timer({ initialSeconds = 10 }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/game');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div style={{
      background: 'rgba(13, 16, 48, 0.6)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{
        color: '#9CA6ED',
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif'
      }}>Game starts in</div>
      <div style={{
        color: 'white',
        fontSize: '32px',
        fontFamily: 'Ranchers, cursive',
        background: 'linear-gradient(180deg, #FFD44D 0%, #FFAA0D 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>{seconds}s</div>
    </div>
  );
} 