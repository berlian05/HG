import React from 'react';
import useSimpleAuth from '../../hooks/useSimpleAuth';

export default function ProfileStats() {
  const { user } = useSimpleAuth();

  return (
      <div style={{
      background: 'rgba(13, 16, 48, 0.6)',
      borderRadius: '24px',
      padding: '24px',
    }}>
      <h2 style={{ 
        color: '#9CA6ED', 
        fontSize: '20px',
        fontFamily: 'Ranchers, cursive',
        marginBottom: '16px',
      }}>
        Statistics
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}>
        {/* Games played */}
        <div style={{
          background: 'rgba(156, 166, 237, 0.1)',
          borderRadius: '12px',
          padding: '16px',
        }}>
          <div style={{
            color: '#9CA6ED',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px',
          }}>Games played</div>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>{user?.stats?.games_played || 0}</div>
        </div>

        {/* Games won */}
        <div style={{
          background: 'rgba(156, 166, 237, 0.1)',
          borderRadius: '12px',
          padding: '16px',
      }}>
          <div style={{
            color: '#9CA6ED',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px',
          }}>Games won</div>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>{user?.stats?.games_won || 0}</div>
        </div>

        {/* Win rate */}
        <div style={{
          background: 'rgba(156, 166, 237, 0.1)',
          borderRadius: '12px',
          padding: '16px',
        }}>
          <div style={{
            color: '#9CA6ED',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px',
          }}>Win rate</div>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {user?.stats?.games_played 
              ? Math.round((user.stats.games_won / user.stats.games_played) * 100) 
              : 0}%
          </div>
        </div>

        {/* Rating */}
        <div style={{
          background: 'rgba(156, 166, 237, 0.1)',
          borderRadius: '12px',
          padding: '16px',
        }}>
          <div style={{
            color: '#9CA6ED',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px',
          }}>Rating</div>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>{user?.stats?.current_rating || 1000}</div>
        </div>
      </div>
    </div>
  );
}