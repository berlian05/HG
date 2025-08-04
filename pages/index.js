import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';
import GameCardArizona from '../components/GameCardArizona';
import BottomNavBar from '../components/BottomNavBar';
import useGame from '../hooks/useGame';
import useTelegram from '../hooks/useTelegram';

export default function Home() {
  const { getActiveGames } = useGame();
  const { user, loading: userLoading } = useTelegram();
  const [activeGames, setActiveGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (!user) return;
        const games = await getActiveGames();
        setActiveGames(games);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
    const interval = setInterval(fetchGames, 5000);
    return () => clearInterval(interval);
  }, [getActiveGames, user]);

  if (userLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '18px'
      }}>
        Загрузка...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
      paddingBottom: 90,
      width: '100vw',
      margin: 0,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 92
    }}>
      <Header />

      <Tabs />
      <SearchBar />
      <div style={{ height: 24 }} />
      <GameCard title="Random game" />
      <div style={{ height: 24 }} />
      {!loading && (
        <>
          {activeGames.length > 0 ? (
            activeGames.map(game => (
              <div key={game.id}>
                <GameCardArizona game={game} />
                <div style={{ height: 24 }} />
              </div>
            ))
          ) : (
            <GameCardArizona />
          )}
        </>
      )}
      <BottomNavBar />
    </div>
  );
}