import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import GameCard from '../components/GameCard';

export default function Game() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
      paddingBottom: 90,
      width: '100vw',
      margin: 0,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 92,
    }}>
      <Header />
      <main style={{ padding: '0 16px' }}>
        <h1 style={{ 
          color: '#FFD44D', 
          textAlign: 'center',
          fontSize: 28,
          marginBottom: 24,
          textShadow: '0 2px 8px #0e1330cc',
        }}>🔥 Текущие игры</h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>
          <GameCard title="Популярная игра #1" isTimer={true} />
          <GameCard title="Популярная игра #2" isTimer={true} />
          <GameCard title="Популярная игра #3" isTimer={true} />
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
} 