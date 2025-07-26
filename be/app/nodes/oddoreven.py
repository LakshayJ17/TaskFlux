def odd_even_node(state, config):
    """This node checks if value is odd or even"""
    print("odd even node called with state :", state)

    input_key = config.get("input_key")
    output_key = config.get("output_key")
    value = state.get(input_key)
    if value is None:
        return state
    state[output_key] = "even" if value % 2 == 0 else "odd"
    
    return state