from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from contextlib import asynccontextmanager
from db import connect_to_mongo, close_mongo_connection
# from .workflow import Workflow, execute_workflow
# from execute import execute_workflow


app = FastAPI()
workflows = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow your frontend in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix = "/api/v1")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

# @app.post("/workflows/")
# def save_workflow(workflow: Workflow):
#     workflows["latest"] = workflow
#     return {"status": "saved"}

# @app.get("/workflows/")
# def get_workflow():
#     return workflows.get("latest", {})

# @app.post("/workflows/execute/")
# def run_workflow(input_data: str = Body(..., embed=True)):
#     workflow = workflows.get("latest")
#     if not workflow:
#         return {"error": "No workflow saved"}
#     result = execute_workflow(workflow, input_data)
#     return {"result": result}



@app.get("/")
async def root():
    return {"message" : "Welcome to TaskFlux API"}

@app.get("/health")
async def health_check():
    return {"status" : "healthy"}