from telegram import Update, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup, MenuButtonWebApp, WebAppData
from telegram.ext import Application, CommandHandler, ContextTypes
import logging
import json
import urllib.parse
import hmac
import hashlib
import time

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO,
    handlers=[
        logging.FileHandler('/root/HG/backend/bot.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

BOT_TOKEN = "8414752528:AAHrF-uPa8GujE280q7-ppe53lX7c3_GUOo"
WEBAPP_URL = "https://honest-gamble.ru"

def create_init_data(user_data: dict) -> str:
    """Создает подписанные данные для WebApp"""
    # Создаем данные
    data = {
        "user": user_data,
        "auth_date": int(time.time())
    }
    
    # Создаем строку для подписи
    data_check_string = "\n".join([f"{k}={v}" for k, v in sorted(data.items())])
    
    # Создаем секретный ключ
    secret_key = hmac.new(
        b"WebAppData",
        BOT_TOKEN.encode(),
        hashlib.sha256
    ).digest()
    
    # Создаем подпись
    signature = hmac.new(
        secret_key,
        data_check_string.encode(),
        hashlib.sha256
    ).hexdigest()
    
    # Добавляем подпись к данным
    data["hash"] = signature
    
    # Кодируем данные для URL
    return urllib.parse.quote(json.dumps(data))

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message with a button that opens the web app."""
    try:
        # Получаем информацию о пользователе
        user = update.effective_user
        logger.info("=== NEW USER INTERACTION START ===")
        logger.info(f"User ID: {user.id}")
        logger.info(f"Username: {user.username}")
        logger.info(f"First Name: {user.first_name}")
        logger.info(f"Last Name: {user.last_name}")
        logger.info(f"Language Code: {user.language_code}")
        logger.info(f"Is Bot: {user.is_bot}")
        logger.info(f"Chat ID: {update.effective_chat.id}")
        logger.info(f"Chat Type: {update.effective_chat.type}")
        logger.info(f"Message ID: {update.message.message_id}")
        logger.info("=== USER INFO END ===")
        
        # Создаем данные для веб-приложения
        web_app_data = {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": user.username,
                "language_code": user.language_code,
                "photo_url": None
            }
        }
        
        logger.info("=== WEB APP DATA START ===")
        logger.info(f"Web App Data: {json.dumps(web_app_data, indent=2)}")
        logger.info("=== WEB APP DATA END ===")

        # Пробуем получить фото профиля
        try:
            photos = await context.bot.get_user_profile_photos(user.id, limit=1)
            if photos and photos.photos and len(photos.photos) > 0:
                file = await context.bot.get_file(photos.photos[0][-1].file_id)
                web_app_data["user"]["photo_url"] = file.file_path
                logger.info(f"Got photo URL for user {user.id}: {file.file_path}")
        except Exception as e:
            logger.warning(f"Could not get user photo: {e}")

        # Создаем данные для WebApp
        user_data = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "language_code": user.language_code,
            "photo_url": web_app_data["user"]["photo_url"]
        }
        
        # Создаем подписанные данные
        init_data = create_init_data(user_data)
        
        # Формируем URL с данными
        params = {
            "tgWebApp": "true",
            "userId": str(user.id),
            "username": user.username or "",
            "firstName": user.first_name or "",
            "lastName": user.last_name or "",
            "photoUrl": web_app_data["user"]["photo_url"] or "",
            "initData": init_data
        }
        webapp_url = f"{WEBAPP_URL}?" + "&".join([f"{k}={urllib.parse.quote(v)}" for k, v in params.items()])
        
        logger.info("=== URL INFO START ===")
        logger.info(f"WebApp URL: {webapp_url}")
        logger.info("=== URL INFO END ===")
        
        # Создаем данные для WebApp
        web_app_info = WebAppInfo(url=webapp_url)
        
        # Создаем кнопку для веб-приложения
        keyboard = ReplyKeyboardMarkup(
            [[KeyboardButton(
                text="🎮 Открыть игру",
                web_app=web_app_info
            )]],
            resize_keyboard=True,
            is_persistent=True
        )
        
        logger.info("=== KEYBOARD INFO START ===")
        logger.info("Created keyboard with WebApp button")
        logger.info(f"Button URL: {webapp_url}")
        logger.info("=== KEYBOARD INFO END ===")

        # Устанавливаем кнопку меню
        try:
            menu_button = MenuButtonWebApp(
                text="🎮 Открыть игру",
                web_app=web_app_info
            )
            await context.bot.set_chat_menu_button(
                chat_id=update.effective_chat.id,
                menu_button=menu_button
            )
            logger.info(f"Set menu button for chat {update.effective_chat.id}")
            logger.info(f"Menu button URL: {web_app_info.url}")
        except Exception as e:
            logger.warning(f"Could not set menu button: {e}")
        
        # Отправляем сообщение с кнопкой
        message = await update.message.reply_text(
            """🎮 Добро пожаловать в Honest Gamble!

Нажмите кнопку ниже, чтобы начать игру:""",
            reply_markup=keyboard
        )
        
        logger.info("=== MESSAGE SENT INFO START ===")
        logger.info(f"Message ID: {message.message_id}")
        logger.info(f"Chat ID: {message.chat_id}")
        logger.info(f"Message Text: {message.text}")
        logger.info(f"Has WebApp Button: {bool(keyboard)}")
        logger.info("=== MESSAGE SENT INFO END ===")
        
        logger.info("=== INTERACTION COMPLETE ===")
        
    except Exception as e:
        logger.error("=== ERROR INFO START ===")
        logger.error(f"Error Type: {type(e).__name__}")
        logger.error(f"Error Message: {str(e)}")
        logger.error("Stack Trace:", exc_info=True)
        logger.error("=== ERROR INFO END ===")
        
        await update.message.reply_text(
            "Произошла ошибка при запуске приложения. Пожалуйста, попробуйте позже."
        )

def main() -> None:
    """Start the bot."""
    try:
        # Create the Application
        application = Application.builder().token(BOT_TOKEN).build()

        # Add handlers
        application.add_handler(CommandHandler("start", start))

        # Run the bot
        logger.info("Starting bot...")
        application.run_polling(allowed_updates=Update.ALL_TYPES)
        
    except Exception as e:
        logger.error(f"Error starting bot: {e}", exc_info=True)

if __name__ == "__main__":
    main()