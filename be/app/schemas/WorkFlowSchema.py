from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Dict, Optional, Any

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    config : Dict[str, Any] = {}

class Edge(BaseModel):
    source: str
    target: str


class WorkflowSchema(BaseModel):
    id : str
    user_id : str
    name : str
    created_at : datetime = Field(default_factory=lambda: datetime.now(datetime.UTC))
    updated_at : Optional[datetime] = None
    nodes: List[Node]
    edges : List[Edge]
    is_active : bool = True


