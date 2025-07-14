from app.workflow import build_graph
from app.state_types import SumState

def execute_workflow(workflow_json, initial_state):
    graph = build_graph(workflow_json, SumState)
    result = graph.invoke(initial_state)
    return result