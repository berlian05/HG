from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum

class GameStatus(str, Enum):
    WAITING = "waiting"
    IN_PROGRESS = "in_progress"
    FINISHED = "finished"

class BetAction(str, Enum):
    RAISE = "raise"  # Стать лидером
    FOLD = "fold"    # Выйти из игры

class PlayerInGame(BaseModel):
    user_id: str
    username: str
    photo_url: Optional[str] = None
    is_ready: bool = False
    is_leader: bool = False
    is_active: bool = True
    bets_remaining: int = 10
    last_bet_at: Optional[datetime] = None
    stats: Dict = Field(default_factory=lambda: {
        "games_played": 0,
        "games_won": 0,
        "total_earnings": 0,
        "current_rating": 1000
    })

class GameState(BaseModel):
    current_round: int = 1
    total_pot: float = 0.0
    total_bets_initial: int = 0
    total_bets_remaining: int = 0
    round_started_at: Optional[datetime] = None
    round_ends_at: Optional[datetime] = None
    waiting_started_at: Optional[datetime] = None
    waiting_ends_at: Optional[datetime] = None
    last_action: Optional[Dict] = None
    round_history: List[Dict] = Field(default_factory=list)

class GameModel(BaseModel):
    id: Optional[str] = None
    game_type: str = "arizona"
    status: GameStatus = GameStatus.WAITING
    players: List[PlayerInGame] = Field(default_factory=list)
    max_players: int = 6
    min_players: int = 2
    entry_cost: float = 45.0
    state: GameState = Field(default_factory=GameState)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    winner_id: Optional[str] = None

    class Config:
        populate_by_name = True

class GameAction(BaseModel):
    action_type: BetAction
    player_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow) 