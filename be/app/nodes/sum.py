def sum_node(state, config):
    """This node calculates sum of input values"""
    print("sum node called with state ", state)

    input_key = config.get("input_key", "values")
    output_key = config.get("output_key", "sum_result")
    values = state.get(input_key, [])
    state[output_key] = sum(values)
    
    return state