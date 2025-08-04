from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
import logging

# Настройка логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class UserStats(BaseModel):
    """Статистика пользователя"""
    games_played: int = Field(default=0, ge=0, description="Количество сыгранных игр")
    games_won: int = Field(default=0, ge=0, description="Количество выигранных игр")
    total_earnings: int = Field(default=0, description="Общий выигрыш")
    current_rating: int = Field(default=1000, ge=0, description="Текущий рейтинг")
    balance: float = Field(default=1000.0, description="Баланс HGP")  # Убираем ge=0 чтобы разрешить отрицательные значения

    @validator('games_won')
    def games_won_cannot_exceed_played(cls, v, values):
        if 'games_played' in values and v > values['games_played']:
            raise ValueError('Количество выигранных игр не может превышать количество сыгранных')
        return v

class UserBase(BaseModel):
    """Базовая модель пользователя"""
    telegram_id: int = Field(..., description="ID пользователя в Telegram")
    username: str = Field(..., min_length=1, max_length=32, description="Имя пользователя")
    first_name: Optional[str] = Field(None, min_length=1, max_length=64, description="Имя")
    last_name: Optional[str] = Field(None, min_length=1, max_length=64, description="Фамилия")
    photo_url: Optional[str] = Field(None, description="URL фотографии профиля")
    stats: UserStats = Field(default_factory=UserStats, description="Статистика пользователя")

    @validator('telegram_id')
    def telegram_id_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Telegram ID должен быть положительным числом')
        return v

    @validator('username')
    def username_must_be_valid(cls, v):
        if not v.replace('_', '').isalnum():
            raise ValueError('Имя пользователя может содержать только буквы, цифры и знак подчеркивания')
        return v

    @validator('photo_url')
    def validate_photo_url(cls, v):
        if v is not None and not (v.startswith('http://') or v.startswith('https://')):
            raise ValueError('URL фотографии должен начинаться с http:// или https://')
        return v

class UserModel(UserBase):
    """Модель пользователя для ответов API"""
    id: str = Field(..., description="Внутренний ID пользователя")

class UserInDB(UserBase):
    """Модель пользователя для базы данных"""
    id: str = Field(..., description="Внутренний ID пользователя")
    last_login: datetime = Field(default_factory=datetime.utcnow, description="Время последнего входа")

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }