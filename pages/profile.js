import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function Profile() {
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
        <div style={{
          background: 'rgba(24, 24, 58, 0.82)',
          borderRadius: 24,
          padding: 24,
          marginBottom: 24,
          border: '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 40px 0 #0e1330cc',
        }}>
          <h2 style={{ 
            color: '#FFD44D', 
            margin: '0 0 16px 0',
            fontSize: 24,
            textAlign: 'center' 
          }}>Баланс</h2>
          <div style={{
            fontSize: 36,
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            textShadow: '0 2px 8px #0e1330cc',
          }}>
            0 <span style={{ fontSize: 20, color: '#FFD44D' }}>HGP</span>
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
          }}>История транзакций</h3>
          <div style={{
            color: '#a3a3d1',
            textAlign: 'center',
            padding: '32px 0',
          }}>
            Транзакции отсутствуют
          </div>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
} 