import { useState } from 'react';

export default function Tabs() {
  const [active, setActive] = useState(0);
  const [pressedTab, setPressedTab] = useState(null);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 0 18px 0',
      position: 'relative',
      gap: 0,
    }}>
      <button
        onClick={() => setActive(0)}
        onMouseDown={() => setPressedTab(0)}
        onMouseUp={() => setPressedTab(null)}
        onMouseLeave={() => setPressedTab(null)}
        style={{
          background: 'none',
          border: 'none',
          color: active === 0 ? '#fff' : '#b3b3e6',
          fontWeight: 700,
          fontSize: 20,
          padding: '8px 24px',
          cursor: 'pointer',
          outline: 'none',
          position: 'relative',
          transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)',
          transform: pressedTab === 0 ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        Join Games
        {active === 0 && (
          <div style={{
            height: 4,
            background: '#a18aff',
            borderRadius: 2,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -6,
          }} />
        )}
      </button>
      <button
        onClick={() => setActive(1)}
        onMouseDown={() => setPressedTab(1)}
        onMouseUp={() => setPressedTab(null)}
        onMouseLeave={() => setPressedTab(null)}
        style={{
          background: 'none',
          border: 'none',
          color: active === 1 ? '#fff' : '#b3b3e6',
          fontWeight: 700,
          fontSize: 20,
          padding: '8px 24px',
          cursor: 'pointer',
          outline: 'none',
          position: 'relative',
          transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)',
          transform: pressedTab === 1 ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        Started Games
        {active === 1 && (
          <div style={{
            height: 4,
            background: '#a18aff',
            borderRadius: 2,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -6,
          }} />
        )}
      </button>
    </div>
  );
} 