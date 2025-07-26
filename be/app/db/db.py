import motor.motor_asyncio
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "taskflux")

# Connection variables
mongo_client: Optional[motor.motor_asyncio.AsyncIOMotorClient] = None
mongo_db: Optional[motor.motor_asyncio.AsyncIOMotorDatabase] = None

# Connect to mongodb
async def connect_to_mongo():
    global mongo_client, mongo_db
    try:
        mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
        mongo_db = mongo_client[DATABASE_NAME]
        
        # Test connection
        await mongo_client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # Indexes for better performance
        await create_indexes()
        print("✅ mongo_db initialized:", mongo_db)
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        raise e


# Close MongoDB connection
async def close_mongo_connection():
    global mongo_client
    if mongo_client:
        mongo_client.close()
        print("MongoDB connection closed")


# Create database indexes for better performance
async def create_indexes():
    try:
        # Create unique index on email
        await mongo_db.users.create_index("email", unique=True)
        # Create index on created_at for sorting
        await mongo_db.users.create_index("created_at")
        print("✅ Database indexes created successfully!")
    except Exception as e:
        print(f"⚠️ Warning: Could not create indexes: {e}")


async def test_connection():
    try:
        await mongo_client.admin.command('ping')
        print("✅ MongoDB connection test successful!")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection test failed: {e}")
        return False

def get_mongo_db():
    if mongo_db is None:
        raise RuntimeError("MongoDB not initialized. Call connect_to_mongo first.")
    return mongo_db
