import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function Friends() {
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
        }}>👥 Друзья</h1>

        <div style={{
          background: 'rgba(24, 24, 58, 0.82)',
          borderRadius: 24,
          padding: 24,
          border: '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 40px 0 #0e1330cc',
          marginBottom: 24,
        }}>
          <h3 style={{ 
            color: '#b3b3e6', 
            margin: '0 0 16px 0',
            fontSize: 20 
          }}>Статистика</h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#fff',
            marginBottom: 16,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#FFD44D', fontSize: 24, fontWeight: 'bold' }}>0</div>
              <div style={{ color: '#a3a3d1', fontSize: 14 }}>Друзей</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#FFD44D', fontSize: 24, fontWeight: 'bold' }}>0</div>
              <div style={{ color: '#a3a3d1', fontSize: 14 }}>Игр вместе</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#FFD44D', fontSize: 24, fontWeight: 'bold' }}>0</div>
              <div style={{ color: '#a3a3d1', fontSize: 14 }}>Побед</div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 58, 0.82)',
          borderRadius: 24,
          padding: 24,
          border: '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 40px 0 #0e1330cc',
        }}>
          <h3 style={{ 
            color: '#b3b3e6', 
            margin: '0 0 16px 0',
            fontSize: 20 
          }}>Список друзей</h3>
          <div style={{
            color: '#a3a3d1',
            textAlign: 'center',
            padding: '32px 0',
          }}>
            У вас пока нет друзей
          </div>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
} 