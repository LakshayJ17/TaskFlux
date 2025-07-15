from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    config : Dict[str, any] = {}

class Edge(BaseModel):
    source: str
    target: str


class WorkflowSchema(BaseModel):
    id : str
    user_id : str
    name : str
    created_at : datetime
    updated_at : datetime
    nodes: List[Node]
    edges : List[Edge]
    is_active : bool


