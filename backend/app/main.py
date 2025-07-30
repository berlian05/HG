from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
import time
from .core.database import connect_to_mongo, close_mongo_connection
from .routers import auth, game

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="HG Game Backend")

# Middleware для логирования запросов
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    logger.info(
        f"Method: {request.method} Path: {request.url.path} "
        f"Status: {response.status_code} Time: {process_time:.2f}ms"
    )
    return response

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене заменить на конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(auth.router)
app.include_router(game.router)

@app.on_event("startup")
async def startup_db_client():
    logger.info("Connecting to MongoDB...")
    await connect_to_mongo()
    logger.info("Successfully connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Closing MongoDB connection...")
    await close_mongo_connection()
    logger.info("MongoDB connection closed")

@app.get("/")
async def root():
    return {"message": "Welcome to HG Game API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 