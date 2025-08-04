from fastapi import APIRouter, Depends, HTTPException, Header, Query, Request
from typing import Optional
import logging
from ..services.auth import (
    verify_telegram_webapp_data,
    create_or_update_user,
    create_access_token,
    get_current_user
)
from ..models.user import UserModel
from datetime import datetime

# Настройка логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

router = APIRouter(prefix="/auth", tags=["auth"])

from pydantic import BaseModel

class TMALoginData(BaseModel):
    init_data: dict

@router.post("/tma-login")
async def tma_login(request: Request, data: TMALoginData):
    """
    Обработка входа через Telegram Mini App
    """
    logger.info("=== Starting TMA login process ===")
    logger.info("=== REQUEST INFO START ===")
    logger.info(f"Client IP: {request.client.host}")
    logger.info(f"Method: {request.method}")
    logger.info(f"URL: {request.url}")
    logger.info(f"Headers: {dict(request.headers)}")
    logger.info(f"User-Agent: {request.headers.get('user-agent')}")
    logger.info("=== REQUEST INFO END ===")
    
    logger.info("=== DATA INFO START ===")
    logger.info(f"Received data: {data}")
    logger.info(f"Init data: {data.init_data}")
    logger.info("=== DATA INFO END ===")
    
    try:
        # Проверяем данные от Telegram Web App
        logger.info("Verifying Telegram Web App data")
        user_data = verify_telegram_webapp_data(data.init_data)
        
        if not user_data:
            logger.error("Invalid Telegram Web App data received")
            raise HTTPException(
                status_code=400,
                detail="Invalid Telegram Web App data"
            )
        
        logger.info("Telegram data verified successfully")
        
        # Создаем или обновляем пользователя
        logger.info("Creating/updating user in database")
        user = await create_or_update_user(user_data)
        logger.info(f"User processed: {user.telegram_id} ({user.username})")
        
        # Создаем токен доступа
        logger.info("Generating access token")
        access_token = create_access_token(str(user.id))
        
        response_data = {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user
        }
        
        logger.info("=== TMA login completed successfully ===")
        logger.debug(f"User details: ID={user.telegram_id}, Username={user.username}, Photo={user.photo_url}")
        
        return response_data
        
    except Exception as e:
        logger.error(f"Error during TMA login: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Internal server error during authentication"
        )

async def get_current_user_from_token(
    request: Request,
    authorization: Optional[str] = Header(None)
) -> UserModel:
    """
    Получает текущего пользователя из токена в заголовке
    """
    logger.info("=== Starting token authentication ===")
    logger.debug(f"Client IP: {request.client.host}")
    logger.debug(f"Authorization header present: {bool(authorization)}")
    
    if not authorization:
        logger.warning("No authorization header provided")
        raise HTTPException(
            status_code=401,
            detail="No authentication credentials provided"
        )
        
    if not authorization.startswith("Bearer "):
        logger.warning("Invalid authorization header format")
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication format"
        )
    
    token = authorization.split(" ")[1]
    logger.debug("Token extracted from header")
    
    user = await get_current_user(token)
    
    if user is None:
        logger.warning("Invalid or expired token")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired authentication token"
        )
    
    logger.info(f"User authenticated: {user.telegram_id} ({user.username})")
    logger.debug(f"User details: ID={user.telegram_id}, Username={user.username}, Photo={user.photo_url}")
    
    return user

@router.get("/me")
async def read_users_me(
    request: Request,
    current_user: UserModel = Depends(get_current_user_from_token)
):
    """
    Получает информацию о текущем пользователе
    """
    logger.info(f"User data requested: {current_user.telegram_id} ({current_user.username})")
    logger.debug(f"Full user data: ID={current_user.telegram_id}, Username={current_user.username}, Photo={current_user.photo_url}")
    
    return current_user