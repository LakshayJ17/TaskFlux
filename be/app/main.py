from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router
from app.db import connect_to_mongo, close_mongo_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow your frontend in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix = "/api/v1")

@app.on_event("startup")
async def startup_db():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db():
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message" : "Welcome to TaskFlux API"}

@app.get("/health")
async def health_check():
    return {"status" : "healthy"}