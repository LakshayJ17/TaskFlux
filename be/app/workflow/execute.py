from langgraph.graph import StateGraph
from ..nodes import NODE_REGISTRY
from ..states import STATE_REGISTRY


def build_graph(workflow_json, state_type):
    graph_builder = StateGraph(state_type)
    nodes = workflow_json["nodes"]
    edges = workflow_json["edges"]

    # Find terminal nodes (nodes with no outgoing edges)
    node_ids = {node["id"] for node in nodes}
    outgoing = {edge["source"] for edge in edges}
    terminal_nodes = node_ids - outgoing

    # Add nodes with a helper to avoid closure issues
    # Instead of passing just node func( if passed only node func -> it will get only state but not config -> error), this creates a new function that calls node func with both current state and its config
    def make_node(node_func, config):
        return lambda state: node_func(state, config)

    for node in nodes:
        graph_builder.add_node(
            node["id"],
            make_node(NODE_REGISTRY[node["type"]], node.get("config", {}))
        )

    # Add all edges 
    for edge in edges:
        graph_builder.add_edge(edge["source"], edge["target"])

    # Set entry point and connect terminal nodes to END
    if nodes:
        graph_builder.set_entry_point(nodes[0]["id"])
        graph_builder.add_node("END", lambda state: None)
        for node_id in terminal_nodes:
            graph_builder.add_edge(node_id, "END")

    return graph_builder.compile()


def execute_workflow(workflow_json, initial_state):
    state_type = STATE_REGISTRY["taskflux_state"]
    graph = build_graph(workflow_json, state_type)
    result = graph.invoke(initial_state)
    return result