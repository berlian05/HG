import React from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import CircleTimer from '../components/game/CircleTimer';
import BetButton from '../components/game/BetButton';

export default function Game() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0D1330 0%, #1A2046 100%)',
      minHeight: '100vh',
      paddingTop: '92px',
      paddingBottom: '90px',
      position: 'relative'
    }}>
      <Header />
      
      <main style={{
        padding: '16px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        {/* Game title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
            margin: 0
          }}>Arizona</h1>
        </div>

        {/* Bet amounts */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '32px'
        }}>
          {[10, 50, 250, 500, 1000].map((amount, index) => (
            <button
              key={amount}
              style={{
                background: index === 2 ? '#FF8A00' : 'rgba(13, 16, 48, 0.6)',
                border: 'none',
                borderRadius: '12px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer',
                position: 'relative',
                minWidth: '60px'
              }}
            >
              {amount}
              <div style={{
                fontSize: '10px',
                opacity: 0.6
              }}>WLD</div>
              {index === 2 && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #FF8A00'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '32px' }}>
          <CircleTimer time={81} />
        </div>

        {/* Bet button */}
        <BetButton />

        {/* Win amount */}
        <div style={{
          background: 'rgba(13, 16, 48, 0.6)',
          borderRadius: '12px',
          padding: '12px',
          marginTop: '24px',
          textAlign: 'center',
          color: '#9CA6ED',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          YOUR WIN (5 320 WLD)
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
} 