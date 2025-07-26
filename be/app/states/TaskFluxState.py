from typing import TypedDict

class TaskfluxState(TypedDict, total=False):
    values: list[int]
    result: int
    sum_result: int
    odd_even_result: str 
    email_to: str
    email_content: str
    email_sent: bool
    ai_reply: str
    webhook_payload: dict
    schedule_time: str
