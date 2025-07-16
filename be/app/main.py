from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from .auth import router as auth_router
from .workflow import router as workflow_router
from contextlib import asynccontextmanager
from .db import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow your frontend in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix = "/api/v1")
app.include_router(workflow_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message" : "Welcome to TaskFlux API"}

@app.get("/health")
async def health_check():
    return {"status" : "healthy"}