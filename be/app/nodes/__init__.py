from .sum import sum_node
from .oddoreven import odd_even_node


NODE_REGISTRY = {
    "sum" : sum_node,
    "odd_even" : odd_even_node 
}