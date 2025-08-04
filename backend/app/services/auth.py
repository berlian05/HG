from datetime import datetime, timedelta
import hmac
import hashlib
import json
from urllib.parse import parse_qs, unquote
from jose import jwt
from ..core.config import get_settings
from ..core.database import get_database
from ..models.user import UserModel, UserInDB
import logging
from bson import ObjectId

# Настройка логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Получаем настройки
settings = get_settings()
BOT_TOKEN = "7548437053:AAE2VXPfC6_ZuNRbskSz5S1AgypsVE4Fe9I"

def verify_telegram_webapp_data(init_data: dict) -> dict:
    """Проверяет данные, полученные от Telegram Web App"""
    logger.info("=== Starting Telegram WebApp data verification ===")
    logger.debug(f"Received raw init_data: {init_data}")
    
    try:
        # Проверяем, что init_data уже является словарем
        if isinstance(init_data, dict):
            logger.debug("Init_data is already a dict")
            data = init_data
            
            if isinstance(data, dict):
                logger.debug(f"Successfully parsed JSON data: {data}")
                
                if 'user' in data:
                    logger.info("Found user data in JSON")
                    logger.debug(f"User data: {data['user']}")
                    
                    # Проверяем наличие всех необходимых полей
                    required_fields = ['id', 'first_name']
                    missing_fields = [field for field in required_fields if field not in data['user']]
                    
                    if missing_fields:
                        logger.warning(f"Missing required user fields: {missing_fields}")
                        return None
                    else:
                        logger.info("All required user fields present")
                    
                    # Для отладки пропускаем проверку хэша
                    if data.get('hash') == 'debug_hash' or data.get('hash') == 'real_telegram_hash':
                        logger.warning("Debug mode: skipping hash verification")
                        return data['user']
                        
                    return data['user']
                else:
                    logger.warning("No user data found in JSON")
            else:
                logger.warning(f"Parsed JSON is not a dict: {type(data)}")
                
        # Если данные не в нужном формате, возвращаем None
        logger.warning("Invalid data format")
        return None

    except Exception as e:
        logger.error(f"Error verifying Telegram data: {str(e)}", exc_info=True)
        return None

async def create_or_update_user(user_data: dict) -> UserInDB:
    """Создает нового пользователя или обновляет существующего"""
    logger.info("=== Starting user creation/update process ===")
    logger.debug(f"Input user data: {user_data}")
    
    try:
        db = get_database()

        # Подготавливаем данные пользователя
        user_dict = {
            "telegram_id": user_data["id"],
            "username": user_data.get("username", f"user_{user_data['id']}"),
            "first_name": user_data.get("first_name"),
            "last_name": user_data.get("last_name"),
            "photo_url": user_data.get("photo_url"),
            "last_login": datetime.utcnow()
        }
        
        # Логируем данные без datetime
        log_dict = dict(user_dict)
        log_dict['last_login'] = log_dict['last_login'].isoformat()
        logger.debug(f"Prepared user dict: {log_dict}")

        # Ищем пользователя по telegram_id
        existing_user = await db.users.find_one({"telegram_id": user_data["id"]})
        
        if existing_user:
            logger.info(f"Found existing user with telegram_id: {user_data['id']}")
            # Преобразуем ObjectId в строку для логирования
            existing_user['_id'] = str(existing_user['_id'])
            logger.debug(f"Existing user data: {existing_user}")
            
            # Обновляем существующего пользователя
            await db.users.update_one(
                {"telegram_id": user_data["id"]},
                {"$set": user_dict}
            )
            
            user_dict["id"] = str(existing_user["_id"])
            user_dict["stats"] = existing_user.get("stats", {
                "games_played": 0,
                "games_won": 0,
                "total_earnings": 0,
                "current_rating": 1000,
                "balance": 1000.0  # Устанавливаем баланс по умолчанию
            })
            
            # Если у существующего пользователя нет баланса, добавляем его
            if "balance" not in user_dict["stats"]:
                user_dict["stats"]["balance"] = 1000.0
                await db.users.update_one(
                    {"telegram_id": user_data["id"]},
                    {"$set": {"stats.balance": 1000.0}}
                )
                logger.info(f"Added default balance to existing user {user_data['id']}")
            
            logger.info("User data updated successfully")
            
        else:
            logger.info(f"Creating new user with telegram_id: {user_data['id']}")
            
            # Создаем нового пользователя
            user_dict["stats"] = {
                "games_played": 0,
                "games_won": 0,
                "total_earnings": 0,
                "current_rating": 1000,
                "balance": 1000.0  # Устанавливаем баланс по умолчанию
            }
            
            result = await db.users.insert_one(user_dict)
            user_dict["id"] = str(result.inserted_id)
            
            logger.info(f"New user created with id: {user_dict['id']}")

        # Логируем финальные данные без datetime
        final_log_dict = dict(user_dict)
        final_log_dict['last_login'] = final_log_dict['last_login'].isoformat()
        logger.debug(f"Final user dict: {final_log_dict}")
        logger.info("=== User creation/update process completed successfully ===")
        
        return UserInDB(**user_dict)
        
    except Exception as e:
        logger.error(f"Error creating/updating user: {str(e)}", exc_info=True)
        raise

def create_access_token(user_id: str) -> str:
    """Создает JWT токен для пользователя"""
    logger.info("=== Starting access token creation ===")
    logger.debug(f"Creating token for user_id: {user_id}")
    
    try:
        expire = datetime.utcnow() + timedelta(days=7)
        
        to_encode = {
            "sub": str(user_id),
            "exp": expire
        }
        
        # Логируем данные с преобразованным datetime
        log_data = dict(to_encode)
        log_data['exp'] = log_data['exp'].isoformat()
        logger.debug(f"Token payload: {log_data}")
        logger.debug(f"Secret key: {settings.secret_key}")
        logger.debug(f"Algorithm: {settings.algorithm}")
        
        token = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
        
        logger.info("Access token created successfully")
        logger.debug(f"Generated token: {token[:20]}...")
        logger.debug(f"Token expiration: {expire.isoformat()}")
        
        return token
        
    except Exception as e:
        logger.error(f"Error creating access token: {str(e)}", exc_info=True)
        raise

async def get_current_user(token: str) -> UserModel:
    """Получает текущего пользователя по токену"""
    logger.info("=== Starting current user retrieval ===")
    logger.debug(f"Token to decode: {token[:20]}...")
    
    try:
        logger.debug(f"Secret key: {settings.secret_key}")
        logger.debug(f"Algorithm: {settings.algorithm}")
        
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        user_id = payload.get("sub")
        
        if user_id is None:
            logger.warning("No user_id found in token payload")
            return None
            
        logger.debug(f"Token payload: {payload}")
        logger.debug(f"User ID from token: {user_id}")
        
    except jwt.ExpiredSignatureError:
        logger.error("Token has expired")
        return None
    except jwt.JWTError as e:
        logger.error(f"Error decoding token: {str(e)}")
        return None

    try:
        db = get_database()
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        
        if user is None:
            logger.warning(f"User not found in database for id: {user_id}")
            return None

        user["id"] = str(user.pop("_id"))
        
        # Преобразуем datetime для логирования
        log_user = dict(user)
        if 'last_login' in log_user:
            log_user['last_login'] = log_user['last_login'].isoformat()
        logger.debug(f"Retrieved user data: {log_user}")
        logger.info("=== Current user retrieval completed successfully ===")
        
        return UserModel(**user)
        
    except Exception as e:
        logger.error(f"Error getting user from database: {str(e)}", exc_info=True)
        return None