from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    firstName: str = Field(..., min_length=2, max_length=50)
    lastName: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: EmailStr
    created_at: datetime
    is_active: bool = True
    is_premium : bool = False
    google_picture: Optional[str] = None
    google_id: Optional[str] = None
    auth_provider: str
    manual_workflow_count: int = 0
    ai_workflow_count: int = 0
    total_integrations : int = 0
    active_workflow_count : int = 0

class UpdateUserSchema(BaseModel):
    firstName : Optional[str] = None
    lastName : Optional[str] = None
    email : Optional[EmailStr] = None
    password: Optional[str] = None
    new_password: Optional[str] = None


