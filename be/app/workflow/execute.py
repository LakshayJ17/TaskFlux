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

    if not nodes or not nodes[0]["type"].endswith("trigger"):
        print("Warning : First node sjould be trigger node")

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
    trigger = workflow_json.get("trigger")
    nodes = workflow_json.get("nodes", [])

    if trigger:
        trigger_type = trigger.get("type")
        trigger_config = trigger.get("config", {})
        print(f"Trigger type : {trigger_type}")

        if trigger_type == "manual_trigger":
            graph = build_graph(workflow_json, state_type)
            result = graph.invoke(initial_state)
            return result
        elif trigger_type == "webhook_trigger":
            graph = build_graph(workflow_json,state_type)
            result = graph.invoke(initial_state)
            return result
        elif trigger_type == "schedule_trigger":
            print("Schedule trigger detected. You need to implement scheduling logic here.")
            graph = build_graph(workflow_json, state_type)
            result = graph.invoke(initial_state)
            return result

        # TODO: Add triggers

        else:
            raise ValueError(f"Unknown trigger type: {trigger_type}")

    graph = build_graph(workflow_json, state_type)
    result = graph.invoke(initial_state)
    return result