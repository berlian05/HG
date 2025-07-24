import Header from '../components/Header';
import Tabs from '../components/Tabs';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';
import GameCardArizona from '../components/GameCardArizona';
import BottomNavBar from '../components/BottomNavBar';

export default function Home() {
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
      <GameCardArizona />
      <BottomNavBar />
    </div>
  );
} 