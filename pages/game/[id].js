import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useGame from '../../hooks/useGame';
import useTestAuth from '../../hooks/useTestAuth';
import BetButton from '../../components/game/BetButton';
import CircleTimer from '../../components/game/CircleTimer';
import PlayersList from '../../components/game/PlayersList';
import Header from '../../components/Header';
import BottomNavBar from '../../components/BottomNavBar';

export default function GameRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading: userLoading } = useTestAuth();
  const {
    game,
    error,
    loading,
    connected,
    makeBet,
    fold
  } = useGame(id);

  if (userLoading || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        Ошибка: {error}
      </div>
    );
  }

  if (!game) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e1330 0%, #1a2046 60%, #18183a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        Игра не найдена
      </div>
    );
  }

  const currentPlayer = game.players.find(p => p.user_id === user.id);

  return (
    <div className="flex flex-col min-h-screen bg-[#0F1225]">
      <Header />
      
      {/* Debug Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        zIndex: 1000,
        fontSize: '14px'
      }}>
        <div>User: {user?.username}</div>
        <div>Game ID: {id}</div>
        <div>Connected: {connected ? 'Yes' : 'No'}</div>
      </div>

      <main className="flex-1 px-4 py-8">
        <div style={{
          textAlign: 'center',
          color: '#9CA6ED',
          fontSize: '20px',
          fontFamily: 'Ranchers, cursive',
          marginBottom: '24px'
        }}>
          Bets remaining - {game.state.total_bets_remaining} of {game.state.total_bets_initial}
        </div>

        <div className="flex justify-center items-center mb-8">
          <CircleTimer
            initialTime={10}
            key={game.state.round_started_at}
          />
        </div>

        <PlayersList
          players={game.players}
          currentUserId={user.id}
        />

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