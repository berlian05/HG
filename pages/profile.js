import React from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';

// Добавляем getServerSideProps для серверного рендеринга
export async function getServerSideProps(context) {
  return {
    props: {}, // Будет доступно как props компонента
  }
}

export default function Profile() {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return null; // Не рендерим ничего на сервере
  }

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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <ProfileHeader />
          <ProfileStats />
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
              Buffs used
            </h2>
            {/* Buffs content will go here */}
          </div>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
} 