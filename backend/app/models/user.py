from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserStats(BaseModel):
    games_played: int = 0
    games_won: int = 0
    total_earnings: float = 0.0
    current_rating: int = 1000

class UserBase(BaseModel):
    telegram_id: int
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    photo_url: Optional[str] = None

class UserModel(UserBase):
    id: Optional[str] = None
    stats: UserStats = Field(default_factory=UserStats)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

class UserInDB(UserModel):
    auth_token: Optional[str] = None 