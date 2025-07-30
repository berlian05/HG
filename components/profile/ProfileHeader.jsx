import React from 'react';
import SettingsIcon from './SettingsIcon';
import LogoutIcon from './LogoutIcon';
import useTelegram from '../../hooks/useTelegram';

export default function ProfileHeader() {
  const { user } = useTelegram();

  return (
    <div style={{
      background: 'rgba(13, 16, 48, 0.6)',
      borderRadius: '24px',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Top buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <button style={{
          background: 'rgba(44, 44, 88, 0.32)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0
        }}>
          <SettingsIcon />
        </button>
        <button style={{
          background: 'rgba(44, 44, 88, 0.32)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0
        }}>
          <LogoutIcon />
        </button>
      </div>

      {/* Avatar section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '16px',
          background: '#6C63FF',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {user?.photo_url ? (
            <img 
              src={user.photo_url} 
              alt={user.username || 'User'} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
          <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            color: 'white'
          }}>
              {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          )}
        </div>

        {/* Username */}
        <div style={{
          fontSize: '28px',
          fontFamily: 'Ranchers, cursive',
          background: 'linear-gradient(180deg, #FFD44D 0%, #FFAA0D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          {user?.username || 'Username'}
        </div>

        {/* Rank */}
        <div style={{
          background: 'rgba(156, 166, 237, 0.1)',
          borderRadius: '12px',
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span style={{ color: '#9CA6ED' }}>🏆</span>
          <span style={{ color: '#9CA6ED' }}>Rank {user?.stats?.games_won || 1}</span>
        </div>
      </div>
    </div>
  );
} 