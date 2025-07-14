def sum_node(state):
    a = state["a"]
    b = state["b"]

    state["result"] = a + b
    return state
