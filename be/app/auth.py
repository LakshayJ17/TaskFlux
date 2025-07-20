from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from datetime import datetime, timedelta, UTC
from typing import Optional
import jwt
import os
from dotenv import load_dotenv
from bson import ObjectId
# from app.db import mongo_db
from .db import get_mongo_db
from .schemas.UserSchemas import UserCreate, UserLogin, UserResponse
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "secretkeydev")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()


# Hash plain password for storage
def hash_password(password : str) -> str:
    return pwd_context.hash(password)

# Verify plain pwd against its hash 
def verify_password(plain_password: str, hashed_pwd: str) -> bool:
    return pwd_context.verify(plain_password, hashed_pwd)

# Create a JWT access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    now = datetime.now(UTC)

    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

# Verify and decode a JWT token
def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Get current authenticated user from JWT token - to be used before every enpoint after signin/signup
async def get_current_user(credentials : HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    payload = verify_token(token)
    db = get_mongo_db()

    if payload is None:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Could not validate credentials",
            headers = {"WWW-Authenticate" : "Bearer"}
        )
    
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Could not validate credentials",
            headers = {"WWW-Authenticate" : "Bearer"}
        )
    
    try:
        user = await db.users.find_one({"_id" : ObjectId(user_id)})
        if user is None:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Could not validate credentials",
                headers = {"WWW-Authenticate" : "Bearer"}
            )
        return user
    except Exception as e:
        print(f"❌ Error while fetching user: {e}")
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Could not validate credentials",
            headers = {"WWW-Authenticate" : "Bearer"}
        )



@router.post("/signup", response_model = dict, status_code = status.HTTP_201_CREATED)
async def signup(user_data : UserCreate):
    db = get_mongo_db()

    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    now = datetime.now(UTC)
    user_email = user_data.email.lower()

    # Check if user already exists
    existing_user = await db.users.find_one({"email" : user_email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash pwd
    hashed_password = hash_password(user_data.password)

    user_doc = {
        "firstName" : user_data.firstName,
        "lastName": user_data.lastName,
        "email" : user_email,
        "hashed_password": hashed_password,
        "created_at": now,
        "updated_at" : now,
        "is_active" : True,
        "is_premium" : False
    }

    result = await db.users.insert_one(user_doc)

    # Create token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub" : str(result.inserted_id)},
        expires_delta=access_token_expires
    )

    return {
        "message": "User created successfully",
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # seconds
        "user": {
            "id": str(result.inserted_id),
            "firstName": user_data.firstName,
            "lastName": user_data.lastName,
            "email": user_email  # use the lowercased version
        }
    }

# Authenticate user and return jwt
@router.post('/signin', response_model = dict)
async def signin(user_data : UserLogin):
    db = get_mongo_db()

    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    email = user_data.email.lower()
    user = await db.users.find_one({"email" : email})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not user.get("is_active", True):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Account is deactivated"
        )
    
    # verify pwd
    if not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Incorrect email or password"
        )
    
    # create token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub" : str(user["_id"])},
        expires_delta=access_token_expires
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,  
        "user": {
            "id": str(user["_id"]),
            "firstName": user["firstName"],
            "lastName": user["lastName"],
            "email": user["email"]
        }
    }

# Get current authenticated user info 
@router.get("/me", response_model = UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "firstName": current_user["firstName"],
        "lastName": current_user["lastName"],
        "email": current_user["email"],
        "created_at": current_user["created_at"],
        "is_active": current_user.get("is_active", True),
        "is_premium" : current_user.get("is_premium", False),
        "google_picture"  : current_user.get("google_picture")
    }

# Refresh Jwt token
@router.post("/refresh", response_model=dict)
async def refresh_token(current_user: dict = Depends(get_current_user)):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(current_user["_id"])}, 
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

# Handling google signin/signup
@router.post("/google-auth")
async def google_auth(payload: dict):
    token = payload.get("token")
    if not token:
        raise HTTPException(status_code=400, detail="No token provided")

    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request())
        email = idinfo["email"].lower()
        first_name = idinfo.get("given_name", "")
        last_name = idinfo.get("family_name", "")
        picture = idinfo.get("picture", "")

        db = get_mongo_db()
        user = await db.users.find_one({"email": email})

        if not user:
            now = datetime.now(UTC)
            user_doc = {
                "firstName": first_name,
                "lastName": last_name,
                "email": email,
                "created_at": now,
                "updated_at": now,
                "is_active": True,
                "is_premium" : False,
                "google_picture": picture,
                "google_id": idinfo.get("sub"),
                "auth_provider": "google"
            }
            result = await db.users.insert_one(user_doc)
            user_id = result.inserted_id
        else:
            user_id = user["_id"]

        # Create your own JWT
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user_id)},
            expires_delta=access_token_expires
        )

        return {
            "message": "Google authentication successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(user_id),
                "firstName": first_name or (user and user["firstName"]),
                "lastName": last_name or (user and user["lastName"]),
                "email": email,
                "google_picture": picture or (user and user.get("google_picture"))
            }
        }
    except Exception as e:
        print("Google Auth Error:", e)
        raise HTTPException(status_code=400, detail="Invalid Google token")