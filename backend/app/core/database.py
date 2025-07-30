from motor.motor_asyncio import AsyncIOMotorClient
from .config import get_settings

settings = get_settings()

class Database:
    client: AsyncIOMotorClient = None
    
async def connect_to_mongo():
    Database.client = AsyncIOMotorClient(settings.mongodb_url)
    
async def close_mongo_connection():
    if Database.client is not None:
        Database.client.close()
        
def get_database() -> AsyncIOMotorClient:
    return Database.client[settings.database_name] 