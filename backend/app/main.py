from fastapi import FastAPI, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import logging
import time
from .core.database import connect_to_mongo, close_mongo_connection
from .routers import auth, game

# Настройка логирования в файл
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/root/HG/backend/app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(title="HG Game Backend")

# Middleware для логирования запросов
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Логируем входящие запросы
    logger.info(
        f"INCOMING REQUEST: {request.method} {request.url.path} "
        f"Origin: {request.headers.get('origin', 'No origin')} "
        f"Client: {request.client.host}"
    )
    
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    
    # Логируем ответ
    logger.info(
        f"RESPONSE: {request.method} {request.url.path} "
        f"Status: {response.status_code} Time: {process_time:.2f}ms"
    )
    
    return response

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000", 
        "https://honest-gamble.ru",
        "http://honest-gamble.ru",
        "https://www.honest-gamble.ru",
        "http://www.honest-gamble.ru",
        "*"  # Временно разрешаем все для отладки
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time(), "server": "HG Game Backend"}

@app.get("/api/health")
async def api_health_check():
    return {"status": "healthy", "timestamp": time.time(), "server": "HG Game Backend"}

@app.get("/test-cors")
async def test_cors():
    return {"message": "CORS test successful", "timestamp": time.time()}

@app.options("/test-cors")
async def test_cors_options():
    return {"message": "CORS preflight successful"}

@app.websocket("/health")
async def websocket_health(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_json({"status": "healthy", "timestamp": time.time()})
    await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 