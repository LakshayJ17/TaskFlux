from .execute import execute_workflow
from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import HTTPBearer
from ..auth.auth import get_current_user
from ..db.db import get_mongo_db
from bson import ObjectId
from datetime import datetime

router = APIRouter(tags=["workflow"])
security = HTTPBearer()

@router.get("/workflows")
async def get_all_workflows(current_user: dict = Depends(get_current_user)):
    db = get_mongo_db()
    user_id = current_user["_id"]
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")
    
    workflows_list = db.workflows.find({"user_id": user_id})
    workflows = await workflows_list.to_list(length=100)

    for wf in workflows:
        wf["id"] = str(wf["_id"])
        wf["user_id"] = str(wf["user_id"])
        wf.pop("_id", None)
    return {"workflows": workflows}

@router.get("/workflow/{workflow_id}")
async def get_current_workflow(workflow_id: str, current_user: dict = Depends(get_current_user)):
    db = get_mongo_db()
    user_id = current_user["_id"]

    workflow = await db.workflows.find_one({"uuid": workflow_id, "user_id": user_id})
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found or access denied")
    
    workflow["id"] = str(workflow["_id"])
    workflow["user_id"] = str(workflow["user_id"])
    workflow.pop("_id", None)
    return {"workflow": workflow}

@router.post("/workflow/run")
async def run_workflow(payload: dict = Body(...)):
    workflow_json = payload.get("workflow")
    initial_state = payload.get("initial_state", {})
    if not workflow_json:
        raise HTTPException(status_code=400, detail="Missing workflow definition")
    result = execute_workflow(workflow_json, initial_state)
    return {"output": result}

@router.post("/workflow/publish")
async def create_workflow(payload: dict = Body(...), current_user: dict = Depends(get_current_user)):
    db = get_mongo_db()
    
    workflow_doc = {
        "uuid": payload.get("uuid"), 
        "name": payload.get("name"),
        "nodes": payload.get("nodes", []),
        "edges": payload.get("edges", []),
        "user_id": current_user["_id"],
        "is_active": payload.get("is_active", True),
        "initial_state": payload.get("initial_state", {}),
        "trigger": payload.get("trigger"),
        "config": payload.get("config", {}),
        "created_at": datetime.now(datetime.UTC),
        "updated_at": datetime.now(datetime.UTC)
    }
    result = await db.workflows.insert_one(workflow_doc)
    return {"id": str(result.inserted_id)}

@router.put("/workflow/{workflow_id}")
async def update_workflow(workflow_id: str, payload: dict = Body(...), current_user: dict = Depends(get_current_user)):
    db = get_mongo_db()
    user_id = current_user["_id"]
    update_fields = {k: v for k, v in payload.items() if k in ["name", "nodes", "edges", "is_active", "initial_state", "trigger", "config"]}
    update_fields["updated_at"] = datetime.now(datetime.UTC)
    result = await db.workflows.update_one(
        {"_id": ObjectId(workflow_id), "user_id": user_id},
        {"$set": update_fields}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Workflow not found or access denied")
    return {"updated": True}

@router.delete("/workflow/{workflow_id}")
async def delete_workflow(workflow_id: str, current_user: dict = Depends(get_current_user)):
    db = get_mongo_db()
    user_id = current_user["_id"]
    result = await db.workflows.delete_one({"_id": ObjectId(workflow_id), "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Workflow not found or access denied")
    return {"deleted": True}