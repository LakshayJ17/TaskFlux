from .sum import sum_node
from .oddoreven import odd_even_node
from .manual_trigger_node import manual_trigger_node

NODE_REGISTRY = {
    "manual_trigger" : manual_trigger_node,
    "sum" : sum_node,
    "odd_even" : odd_even_node 
}