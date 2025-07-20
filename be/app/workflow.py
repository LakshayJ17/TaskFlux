from .execute import execute_workflow
from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import HTTPBearer
from .auth import get_current_user
from .db import get_mongo_db
from bson import ObjectId
from datetime import datetime

router = APIRouter(tags=["workflow"])
security = HTTPBearer()

@router.get("/workflows")
async def get_all_workflows(current_user : dict = Depends(get_current_user)):
    db = get_mongo_db()        
    user_id = current_user["_id"]
    if user_id is None:
        raise HTTPException(status_code=404, detail = "User not found")
    
    workflows_list = db.workflows.find({"user_id" : user_id})
    workflows = await workflows_list.to_list(length=10)

    for wf in workflows:
        wf["id"] = str(wf["_id"])
        wf["user_id"] = str(wf["user_id"])
        del wf["_id"]

    return workflows 

@router.get("/workflow/{workflow_id}")
async def get_current_workflow(workflow_id: str, current_user: dict = Depends(get_current_user)):
    db = get_mongo_db()

    user_id = current_user["_id"]
    workflow = await db.workflows.find_one({"_id": ObjectId(workflow_id), "user_id": user_id})
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found or access denied")
    
    workflow["id"] = str(workflow["_id"])
    workflow["user_id"] = str(workflow["user_id"])
    del workflow["_id"]
    return workflow


@router.post("/workflow/run")
async def run_workflow(payload: dict = Body(...)):
    workflow_json = payload["workflow"]
    initial_state = payload["initial_state"]
    state_type = payload["state_type"]
    result = execute_workflow(workflow_json, initial_state, state_type)

    return {"output" : result}


@router.post("/workflow/publish")
async def create_workflow(payload : dict = Body(...), current_user : dict = Depends(get_current_user)):
    db = get_mongo_db()

    workflow_doc = {
        "name": payload["name"],
        "nodes": payload["nodes"],
        "edges": payload["edges"],
        "user_id": current_user["_id"],
        "is_active": payload.get("is_active", True),  
        "initial_state": payload.get("initial_state", {}),
        "trigger": payload.get("trigger", None),
        "config": payload.get("config", {}),
        "created_at": datetime.now(datetime.UTC),
        "updated_at": datetime.now(datetime.UTC)
    }

    result = await db.workflows.insert_one(workflow_doc)
    return {"id" : str(result.inserted_id)}