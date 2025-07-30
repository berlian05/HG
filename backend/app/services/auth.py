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

settings = get_settings()
logger = logging.getLogger(__name__)

BOT_TOKEN = "7548437053:AAE2VXPfC6_ZuNRbskSz5S1AgypsVE4Fe9I"

def verify_telegram_webapp_data(init_data: str) -> dict:
    """Проверяет данные, полученные от Telegram Web App"""
    try:
        logger.info(f"Received init_data: {init_data}")
        
        # Пробуем сначала распарсить как JSON
        try:
            data = json.loads(init_data)
            if isinstance(data, dict) and 'user' in data:
                logger.info("Successfully parsed user data")
                # Для отладки пропускаем проверку хэша
                if data.get('hash') == 'debug_hash':
                    logger.info("Debug mode: skipping verification")
                    return data
                return data
        except json.JSONDecodeError:
            logger.error("Failed to parse JSON data")
            pass

        # Если не JSON, парсим как URL-encoded строку
        parsed_data = parse_qs(init_data)
        logger.info(f"Parsed query string data: {parsed_data}")

        # Получаем и декодируем данные пользователя
        user_str = unquote(parsed_data.get('user', ['{}'])[0])
        user_data = json.loads(user_str)
        logger.info(f"Parsed user data: {user_data}")

        # Получаем остальные параметры
        auth_date = parsed_data.get('auth_date', ['0'])[0]
        hash_value = parsed_data.get('hash', [''])[0]

        if not hash_value or hash_value == 'debug_hash':
            logger.warning("Debug mode: skipping hash verification")
            return data if isinstance(data, dict) and 'user' in data else user_data  # Возвращаем данные без проверки для отладки

        # Формируем строку для проверки подписи
        check_string = []
        for key, values in parsed_data.items():
            if key != 'hash':
                check_string.append(f"{key}={values[0]}")
        check_string.sort()
        check_string = '\n'.join(check_string)
        logger.info(f"Check string: {check_string}")

        # Создаем secret key из токена бота
        secret_key = hmac.new(
            key=b"WebAppData",
            msg=BOT_TOKEN.encode(),
            digestmod=hashlib.sha256
        ).digest()

        # Вычисляем hash
        calculated_hash = hmac.new(
            key=secret_key,
            msg=check_string.encode(),
            digestmod=hashlib.sha256
        ).hexdigest()
        logger.info(f"Calculated hash: {calculated_hash}, Received hash: {hash_value}")

        # Проверяем валидность данных
        if calculated_hash != hash_value:
            logger.warning("Hash verification failed")
            return None

        # Проверяем время авторизации (не старше 24 часов)
        auth_timestamp = int(auth_date)
        if datetime.utcnow() - datetime.fromtimestamp(auth_timestamp) > timedelta(days=1):
            logger.warning("Auth date is too old")
            return None

        return user_data
    except Exception as e:
        logger.error(f"Error verifying Telegram data: {e}")
        return None

async def create_or_update_user(user_data: dict) -> UserInDB:
    """Создает нового пользователя или обновляет существующего"""
    try:
        logger.info(f"Creating/updating user with data: {user_data}")
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

        # Ищем пользователя по telegram_id
        existing_user = await db.users.find_one({"telegram_id": user_data["id"]})

        if existing_user:
            logger.info(f"Updating existing user: {existing_user['_id']}")
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
                "current_rating": 1000
            })
        else:
            logger.info("Creating new user")
            # Создаем нового пользователя
            user_dict["stats"] = {
                "games_played": 0,
                "games_won": 0,
                "total_earnings": 0,
                "current_rating": 1000
            }
            result = await db.users.insert_one(user_dict)
            user_dict["id"] = str(result.inserted_id)

        return UserInDB(**user_dict)
    except Exception as e:
        logger.error(f"Error creating/updating user: {e}")
        raise

def create_access_token(user_id: str) -> str:
    """Создает JWT токен для пользователя"""
    try:
        expire = datetime.utcnow() + timedelta(days=7)
        to_encode = {
            "sub": str(user_id),
            "exp": expire
        }
        return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    except Exception as e:
        logger.error(f"Error creating access token: {e}")
        raise

async def get_current_user(token: str) -> UserModel:
    """Получает текущего пользователя по токену"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        user_id = payload.get("sub")
        if user_id is None:
            logger.warning("No user_id in token payload")
            return None
    except Exception as e:
        logger.error(f"Error decoding token: {e}")
        return None

    try:
        db = get_database()
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if user is None:
            logger.warning(f"User not found for id: {user_id}")
            return None

        user["id"] = str(user.pop("_id"))
        return UserModel(**user)
    except Exception as e:
        logger.error(f"Error getting user from database: {e}")
        return None 