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

from langgraph.graph import StateGraph
from app.nodes import NODE_REGISTRY
from execute import execute_workflow
from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.auth import get_current_user
from db import get_mongo_db
from bson import ObjectId

router = APIRouter(prefix="/workflows", tags=["workflows"])
security = HTTPBearer()

@router.get("/")
async def get_all_workflows(id : str, current_user : dict = Depends(get_current_user)):
    db = get_mongo_db()        
    user_id = current_user["_id"]
    if user_id is None:
        raise HTTPException(status_code=404, detail = "User not found")
    
    workflows_list = db.workflows.find({"user_id" : user_id})
    workflows = await workflows_list.to_list(length=10)
    
    for wf in workflows:
        wf["id"] = str(wf["_id"])
        wf["user_id"] = str(wf["user_id"])

    return workflows 


@router.post("/execute")
async def run_workflow(payload: dict = Body(...), current_user: dict = Depends(get_current_user)):
    

    workflow_json = payload["workflow"]
    initial_state = payload["initial_state"]
    result = execute_workflow(workflow_json, initial_state)

    return {"result" : result}

 
def build_graph(workflow_json, state_type):
    graph_builder = StateGraph(state_type)

    for node in workflow_json["nodes"]:
        node_id = node["id"]
        node_type = node["type"]
        node_func = NODE_REGISTRY[node_type]

        graph_builder.add_node(node_id, node_func)

    for edge in workflow_json["edges"]:
        source = edge["source"]
        target = edge["target"]

        graph_builder.add_edge(source, target)
    
    return graph_builder.compile()