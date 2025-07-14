from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict
from .nodes.sum import sum

class State(TypedDict):
    a : int
    b : int
    result : int

graph_builder = StateGraph(State)
graph_builder.add_node(f"{sum}", sum)

graph_builder.add_edge(START, )


