from fastapi import APIRouter, Depends, HTTPException, Header, Query
from typing import Optional
from ..services.auth import verify_telegram_webapp_data, create_or_update_user, create_access_token, get_current_user
from ..models.user import UserModel

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/tma-login")
async def tma_login(init_data: str = Query(...)):
    """
    Обработка входа через Telegram Mini App
    """
    # Проверяем данные от Telegram Web App
    user_data = verify_telegram_webapp_data(init_data)
    if not user_data:
        raise HTTPException(status_code=400, detail="Invalid Telegram Web App data")
    
    # Создаем или обновляем пользователя
    user = await create_or_update_user(user_data)
    
    # Создаем токен доступа
    access_token = create_access_token(str(user.id))
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

async def get_current_user_from_token(authorization: Optional[str] = Header(None)) -> UserModel:
    """
    Получает текущего пользователя из токена в заголовке
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    token = authorization.split(" ")[1]
    user = await get_current_user(token)
    
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
    return user

@router.get("/me")
async def read_users_me(current_user: UserModel = Depends(get_current_user_from_token)):
    """
    Получает информацию о текущем пользователе
    """
    return current_user 