from .state_types import SumState
from langgraph.graph import StateGraph
from .nodes import NODE_REGISTRY

STATE_TYPE_MAP ={
    "SumState" : SumState
}

def build_graph(workflow_json, state_type):
    graph_builder = StateGraph(state_type)

    nodes = workflow_json["nodes"]
    edges = workflow_json["edges"]

    for node in nodes:
        node_id = node["id"]
        node_type = node["type"]
        node_func = NODE_REGISTRY[node_type]

        graph_builder.add_node(node_id, node_func)

    for edge in edges:
        source = edge["source"]
        target = edge["target"]

        graph_builder.add_edge(source, target)
    
    if nodes:
        graph_builder.set_entry_point(nodes[0]["id"])
    
    if nodes:
        graph_builder.add_node("END", lambda *args, **kwargs: None)
        graph_builder.add_edge(nodes[-1]["id"], "END")
    return graph_builder.compile()

def execute_workflow(workflow_json, initial_state, state_type_name):
    state_type = STATE_TYPE_MAP.get(state_type_name)
    if not state_type:
        raise ValueError("Invalid State type")
    
    graph = build_graph(workflow_json, state_type)
    result = graph.invoke(initial_state)
    return result