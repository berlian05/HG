import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import Timer from '../components/waiting-room/Timer';
import useGame from '../hooks/useGame';
import useTelegram from '../hooks/useTelegram';

export default function WaitingRoom() {
  const router = useRouter();
  const { gameId } = router.query;
  const { game, error, loading, connected, setReady } = useGame(gameId);
  const { user } = useTelegram();

  // Следим за статусом игры
  useEffect(() => {
    if (game?.status === 'in_progress') {
      window.history.replaceState({}, '', `/game/${gameId}`);
      router.replace(`/game/${gameId}`);
    }
  }, [game?.status, gameId, router]);

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(180deg, #0D1330 0%, #1A2046 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  if (!game) {
    return (
      <div style={{
        background: 'linear-gradient(180deg, #0D1330 0%, #1A2046 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        Game not found
      </div>
    );
  }

  // Находим текущего игрока
  const currentPlayer = game.players.find(p => p.user_id === user?.id);

  // Обработчик кнопки готовности
  const handleReadyClick = async () => {
    if (!currentPlayer) return;
    await setReady(!currentPlayer.is_ready);
  };

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
        {/* Room info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Poppins, sans-serif'
            }}>Waiting Room</span>
          </div>
          <div style={{
            background: 'rgba(156, 166, 237, 0.1)',
            borderRadius: '12px',
            padding: '4px 12px',
            color: '#9CA6ED',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif'
          }}>{game.players.length}/6 Players</div>
        </div>

        {/* Timer */}
        <Timer initialTime={30} />

        {/* Connection status */}
        {!connected && (
          <div style={{
            background: 'rgba(255, 97, 97, 0.1)',
            borderRadius: '12px',
            padding: '8px 16px',
            color: '#FF6161',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '16px'
          }}>
            Connecting to game...
          </div>
        )}

        {/* Ready button */}
        {currentPlayer && (
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={handleReadyClick}
              style={{
                background: currentPlayer.is_ready ? '#4CAF50' : '#FF6161',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {currentPlayer.is_ready ? 'Ready' : 'Not Ready'}
            </button>
          </div>
        )}

        {/* Players list */}
        <div style={{
          marginTop: '24px'
        }}>
          <div style={{
            color: '#9CA6ED',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '12px'
          }}>Players in room</div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {game.players.map((player) => (
              <div key={player.user_id} style={{
              background: 'rgba(13, 16, 48, 0.6)',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#6C63FF',
                position: 'relative',
                overflow: 'hidden'
              }}>
                  {player.photo_url && (
                    <img
                      src={player.photo_url}
                      alt={player.username}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(156, 166, 237, 0.1)',
                  padding: '1px 4px',
                  fontSize: '10px',
                    color: player.is_ready ? '#4CAF50' : '#FF6161',
                  textAlign: 'center'
                  }}>{Math.floor(player.stats?.current_rating / 100) || '1'} LVL</div>
              </div>
              <div>
                <div style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '2px'
                  }}>
                    {player.username}
                    {player.user_id === user?.id && ' (You)'}
              </div>
              <div style={{
                    color: player.is_ready ? '#4CAF50' : '#FF6161',
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
                  }}>{Math.floor(player.stats?.current_rating / 100) || '1'} LVL</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                  background: player.is_ready ? '#4CAF50' : '#FF6161',
                borderRadius: '4px',
                padding: '2px 8px',
                  color: 'white',
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif'
                }}>{player.is_ready ? 'Ready' : 'Not Ready'}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
} 