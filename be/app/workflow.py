# from typing import Dict, Any, List
# from pydantic import BaseModel
# import langgraph

# class NodeConfig(BaseModel):
#     provider: str
#     openaiKey: str = ""

# class Node(BaseModel):
#     id: str
#     type: str
#     config: NodeConfig
#     position: Dict[str, float]

# class Edge(BaseModel):
#     source: str
#     target: str

# class Workflow(BaseModel):
#     nodes: List[Node]
#     edges: List[Edge]


# def llm_node(config: NodeConfig, input_data: str) -> str:
#     if config.provider == "gemini":
#         # gemini api call
#         return f"Gemini response to : {input_data}"
#     elif config.provider == "openai":
#         # openai api call
#         return f"OpenAI response to : {input_data}"
#     else:
#         return "Provider not supported"
    
# # Langgraph
# def build_graph(workflow: Workflow):
#     node_funcs = {}

#     for node in workflow.nodes:
#         if node.type == "llm":
#             node_funcs[node.id] = lambda input_data, config = node.config: llm_node(config, input_data)
    
#     edges = [(edge.source, edge.target) for edge in workflow.edges]
#     return langgraph.Graph(node_funcs, edges)

# def execute_workflow(workflow: Workflow, input_data: str):
#     graph= build_graph(workflow)
#     return graph.run(input_data)


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