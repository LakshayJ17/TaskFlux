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
    auth_provider: Optional[str] = None

class UpdateUserSchema(BaseModel):
    firstName : Optional[str] = None
    lastName : Optional[str] = None
    email : Optional[EmailStr] = None


