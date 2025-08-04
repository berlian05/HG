from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "hg_game"
    telegram_bot_token: str = "8414752528:AAHrF-uPa8GujE280q7-ppe53lX7c3_GUOo"
    secret_key: str = "honest_gamble_secret_key_please_change_in_production_9d8f7a6s5"
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings() 