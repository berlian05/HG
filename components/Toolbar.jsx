import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Toolbar() {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '16px',
      background: '#23232b',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <button
        onClick={() => router.push('/profile')}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: '8px',
          transition: 'transform 0.15s cubic-bezier(.4,2,.6,1), background 0.2s',
          transform: pressed ? 'scale(0.96)' : 'scale(1)',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#353545'}
        onMouseOut={e => e.currentTarget.style.background = 'none'}
      >
        Профиль
      </button>
    </header>
  );
} 