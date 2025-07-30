import React from 'react';

const PlayersList = ({ players, currentUserId }) => {
    // Сортируем игроков: лидер сверху, затем по времени последней ставки
    const sortedPlayers = [...players].sort((a, b) => {
        if (a.is_leader && !b.is_leader) return -1;
        if (!a.is_leader && b.is_leader) return 1;
        return new Date(b.last_bet_at || 0) - new Date(a.last_bet_at || 0);
    });

    return (
        <div className="space-y-2">
            {sortedPlayers.map((player) => (
                <div
                    key={player.user_id}
                    className={`
                        relative p-4 rounded-lg
                        ${player.is_leader ? 'bg-purple-700' : 'bg-gray-800'}
                        ${player.user_id === currentUserId ? 'border-2 border-purple-400' : ''}
                        transition-all duration-300 ease-in-out
                    `}
                >
                    {/* Индикатор лидера */}
                    {player.is_leader && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            👑
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold text-white">
                                {player.username}
                                {player.user_id === currentUserId && ' (Вы)'}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                                Ставки: {player.bets_remaining}/10
                            </div>
                        </div>

                        {/* Индикаторы ставок */}
                        <div className="flex items-center gap-1">
                            {[...Array(player.bets_remaining)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-green-500"
                                />
                            ))}
                            {[...Array(10 - player.bets_remaining)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-gray-600"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlayersList; 