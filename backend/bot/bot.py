from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes
import logging

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

BOT_TOKEN = "7548437053:AAE2VXPfC6_ZuNRbskSz5S1AgypsVE4Fe9I"
WEBAPP_URL = "https://honest-gamble.ru"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message with a button that opens the web app."""
    
    # Создаем кнопку для веб-приложения
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton(
            text="🎮 Играть",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ])
    
    await update.message.reply_text(
        "Нажмите кнопку ниже, чтобы открыть игру:",
        reply_markup=keyboard
    )

def main() -> None:
    """Start the bot."""
    # Create the Application
    application = Application.builder().token(BOT_TOKEN).build()

    # Add handlers
    application.add_handler(CommandHandler("start", start))

    # Run the bot
    print("Starting bot...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()