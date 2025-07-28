import { useState } from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function TopUsers() {
  const [activePeriod, setActivePeriod] = useState('day'); // 'day', 'month', 'allTime'

  const tabStyle = (isActive) => ({
    flex: 1,
    background: isActive ? '#9CA6ED' : 'transparent',
    border: 'none',
    borderRadius: '100px',
    padding: '8px',
    color: isActive ? '#fff' : '#9CA6ED',
    fontSize: '14px',
    fontWeight: '400',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  // Имитация разных данных для разных периодов
  const userData = {
    day: [
      { name: 'RiskyRocket', level: 98, hgp: '1 500 000', games: 156 },
      { name: 'QueenOfHearts', level: 82, hgp: '980 000', games: 141 },
      { name: 'SpinningStar', level: 58, hgp: '924 500', games: 57 },
    ],
    month: [
      { name: 'RiskyRocket', level: 12, hgp: '826 100', games: 21 },
      { name: 'RiskyRocket', level: 88, hgp: '560 000', games: 86 },
      { name: 'QueenOfHearts', level: 76, hgp: '524 000', games: 78 },
    ],
    allTime: [
      { name: 'RiskyRocket', level: 98, hgp: '2 500 000', games: 356 },
      { name: 'QueenOfHearts', level: 92, hgp: '1 980 000', games: 241 },
      { name: 'SpinningStar', level: 88, hgp: '1 924 500', games: 157 },
    ],
  };

  const getCurrentData = () => {
    switch (activePeriod) {
      case 'day':
        return userData.day;
      case 'month':
        return userData.month;
      case 'allTime':
        return userData.allTime;
      default:
        return userData.day;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0D1330 0%, #1A2046 100%)',
      width: '100%',
      margin: 0,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 92,
      paddingBottom: 90,
    }}>
      <Header />
      <main style={{ 
        padding: '0 16px',
        maxWidth: 480,
        margin: '0 auto',
      }}>
        {/* Title with icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <div style={{
            width: 24,
            height: 24,
            background: '#9CA6ED',
            borderRadius: '50%',
            opacity: 0.4,
          }} />
          <h1 style={{
            color: '#fff',
            fontSize: '24px',
            fontWeight: '600',
          }}>
            Top Users
          </h1>
        </div>

        {/* Tabs */}
        <div style={{
          background: 'rgba(13, 16, 48, 0.6)',
          borderRadius: '100px',
          padding: '4px',
          display: 'flex',
          marginBottom: '24px',
        }}>
          <button 
            style={tabStyle(activePeriod === 'day')}
            onClick={() => setActivePeriod('day')}
          >
            DAY
          </button>
          <button 
            style={tabStyle(activePeriod === 'month')}
            onClick={() => setActivePeriod('month')}
          >
            MONTH
          </button>
          <button 
            style={tabStyle(activePeriod === 'allTime')}
            onClick={() => setActivePeriod('allTime')}
          >
            ALL TIME
          </button>
        </div>

        {/* Users list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {getCurrentData().map((user, index) => (
            <div key={index} style={{
              background: 'rgba(13, 16, 48, 0.6)',
              borderRadius: '16px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              {/* Avatar */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: '#6C63FF',
                position: 'relative',
              }}>
                {/* Level badge */}
                <div style={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  background: user.level >= 90 ? '#FFB800' : user.level >= 50 ? '#FF3D71' : '#7FFF00',
                  borderRadius: '8px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}>
                  {user.level} LVL
                </div>
              </div>

              {/* User info */}
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Ranchers, cursive',
                  }}>
                    {user.name}
                  </div>
                  <div style={{
                    color: '#9CA6ED',
                    fontSize: '12px',
                    opacity: 0.6,
                  }}>
                    {user.games} Games
                  </div>
                </div>
                <div style={{
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'right',
                }}>
                  {user.hgp} HGP
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
} 