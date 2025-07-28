import React from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import Timer from '../components/waiting-room/Timer';

export default function WaitingRoom() {
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
          }}>4/5 Players</div>
        </div>

        {/* Timer */}
        <Timer />

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
            {/* Player item */}
            <div style={{
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
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(156, 166, 237, 0.1)',
                  padding: '1px 4px',
                  fontSize: '10px',
                  color: '#FF6161',
                  textAlign: 'center'
                }}>98 LVL</div>
              </div>
              <div>
                <div style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '2px'
                }}>RiskyRocket</div>
                <div style={{
                  color: '#FF6161',
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif'
                }}>98 LVL</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: '#4CAF50',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'white',
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
              }}>Ready</div>
            </div>

            <div style={{
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
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(156, 166, 237, 0.1)',
                  padding: '1px 4px',
                  fontSize: '10px',
                  color: '#4CAF50',
                  textAlign: 'center'
                }}>24 LVL</div>
              </div>
              <div>
                <div style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '2px'
                }}>QueenOfHearts</div>
                <div style={{
                  color: '#4CAF50',
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif'
                }}>24 LVL</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: '#4CAF50',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'white',
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
              }}>Ready</div>
            </div>

            <div style={{
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
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(156, 166, 237, 0.1)',
                  padding: '1px 4px',
                  fontSize: '10px',
                  color: '#FF6161',
                  textAlign: 'center'
                }}>87 LVL</div>
              </div>
              <div>
                <div style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '2px'
                }}>SpinningStar</div>
                <div style={{
                  color: '#FF6161',
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif'
                }}>87 LVL</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: '#FF6161',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'white',
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
              }}>Not Ready</div>
            </div>

            <div style={{
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
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(156, 166, 237, 0.1)',
                  padding: '1px 4px',
                  fontSize: '10px',
                  color: '#FF6161',
                  textAlign: 'center'
                }}>91 LVL</div>
              </div>
              <div>
                <div style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '2px'
                }}>LuckyCharm</div>
                <div style={{
                  color: '#FF6161',
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif'
                }}>91 LVL</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: '#4CAF50',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'white',
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
              }}>Ready</div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
} 