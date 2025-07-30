import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useGame from '../../hooks/useGame';
import useTelegram from '../../hooks/useTelegram';
import BetButton from '../../components/game/BetButton';
import CircleTimer from '../../components/game/CircleTimer';
import PlayersList from '../../components/game/PlayersList';
import Header from '../../components/Header';
import BottomNavBar from '../../components/BottomNavBar';

export default function GameRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useTelegram();
  const {
    game,
    error,
    loading,
    connected,
    makeBet,
    fold
  } = useGame(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!game) return <div>Game not found</div>;

  const currentPlayer = user ? game.players.find(p => p.user_id === user.id) : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#0F1225]">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        {/* Информация о ставках */}
        <div style={{
          textAlign: 'center',
          color: '#9CA6ED',
          fontSize: '20px',
          fontFamily: 'Ranchers, cursive',
          marginBottom: '24px'
        }}>
          Bets remaining - {game.state.total_bets_remaining} of {game.state.total_bets_initial}
        </div>

        {/* Таймер */}
        <div className="flex justify-center items-center mb-8">
          <CircleTimer
            initialTime={10}
            key={game.state.round_started_at}
          />
        </div>

        {/* Список игроков */}
        <PlayersList
          players={game.players}
          currentUserId={user?.id}
        />

        {/* Кнопка ставки */}
        {currentPlayer && currentPlayer.is_active && (
          <div className="mt-8">
            <BetButton
              betCount={currentPlayer.bets_remaining}
              maxBets={10}
              onClick={() => makeBet()}
              disabled={!currentPlayer.bets_remaining}
            />
          </div>
        )}

        {/* Банк */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#9CA6ED',
          fontSize: '24px',
          fontFamily: 'Ranchers, cursive'
        }}>
          TOTAL POT ({game.state.total_pot} HGP)
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
} 