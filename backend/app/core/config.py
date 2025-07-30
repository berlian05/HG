from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "hg_game"
    telegram_bot_token: str = "your_telegram_bot_token"
    secret_key: str = "your_secret_key_for_jwt"
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings() 