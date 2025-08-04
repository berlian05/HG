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
  console.log('Debug - User:', user);
  console.log('Debug - Game players:', game.players);
  console.log('Debug - Looking for user ID:', user?.id);
  
  const currentPlayer = game.players.find(p => {
    console.log('Debug - Comparing:', p.user_id, 'with', user?.id);
    return p.user_id === user?.id || p.user_id === user?.telegram_id;
  });
  
  console.log('Debug - Current player found:', currentPlayer);

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
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{game.players.length}/6 Players</span>
            <span style={{
              color: '#4CAF50',
              fontWeight: '600'
            }}>
              ({game.players.filter(p => p.is_ready).length} ready)
            </span>
          </div>
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

        {/* Any player ready notification */}
        {game.players.some(p => p.is_ready) && (
          <div style={{
            background: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '12px',
            padding: '8px 16px',
            color: '#4CAF50',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4CAF50',
              animation: 'pulse 1s infinite'
            }} />
            Player is ready! Game will start soon...
          </div>
        )}

        {/* Ready button */}
        {currentPlayer ? (
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={handleReadyClick}
              style={{
                background: currentPlayer.is_ready 
                  ? 'linear-gradient(135deg, #FF8A00 0%, #FFB800 100%)' 
                  : 'linear-gradient(135deg, #FF6161 0%, #e74c3c 100%)',
                border: 'none',
                borderRadius: '20px',
                padding: '20px 40px',
                color: 'white',
                fontSize: '20px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: currentPlayer.is_ready 
                  ? '0 8px 25px rgba(255, 138, 0, 0.4)' 
                  : '0 8px 25px rgba(255, 97, 97, 0.4)',
                transform: 'translateY(0)',
                minWidth: '180px',
                position: 'relative',
                overflow: 'hidden',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = currentPlayer.is_ready 
                  ? '0 12px 35px rgba(255, 138, 0, 0.5)' 
                  : '0 12px 35px rgba(255, 97, 97, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = currentPlayer.is_ready 
                  ? '0 8px 25px rgba(255, 138, 0, 0.4)' 
                  : '0 8px 25px rgba(255, 97, 97, 0.4)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.8)',
                  animation: currentPlayer.is_ready ? 'pulse 2s infinite' : 'none'
                }} />
                {currentPlayer.is_ready ? 'READY!' : 'NOT READY'}
              </div>
            </button>
          </div>
        ) : (
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: 'rgba(255, 97, 97, 0.1)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#FF6161',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center'
            }}>
              Debug: Player not found in game
            </div>
            <div style={{
              color: '#9CA6ED',
              fontSize: '12px',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center'
            }}>
              User ID: {user?.id || 'undefined'}<br/>
              Telegram ID: {user?.telegram_id || 'undefined'}<br/>
              Players in game: {game.players.map(p => p.user_id).join(', ')}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}</style>

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

              </div>
              <div style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: player.is_ready ? '#4CAF50' : '#FF6161',
                  boxShadow: player.is_ready 
                    ? '0 0 8px rgba(76, 175, 80, 0.6)' 
                    : '0 0 8px rgba(255, 97, 97, 0.6)',
                  animation: player.is_ready ? 'pulse 2s infinite' : 'none'
                }} />
                <span style={{
                  background: player.is_ready 
                    ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' 
                    : 'linear-gradient(135deg, #FF6161 0%, #e74c3c 100%)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  color: 'white',
                  fontSize: '11px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500'
                }}>{player.is_ready ? 'Ready' : 'Not Ready'}</span>
              </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
} 