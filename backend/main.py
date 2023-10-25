from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from fastapi.encoders import jsonable_encoder
import routers.interview as softskills_interview
import routers.company as getcompany
import routers.users as user
from pydantic import BaseModel

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = FastAPI()
# Configure CORS
origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(softskills_interview.router)
app.include_router(getcompany.router)
app.include_router(user.router)

# root route
@app.get("/")
def read_root():
    return {"Root Route": True}

# testing db connection
@app.get("/connect")
def connect_db():
    collection = db["UserInfo"]
    result = list(collection.find({}))
    return result


# get user info
@app.get("/users/{_id}")
def read_item(_id: int):
    collection = db['SessionInfo']
    user = collection.find_one({"_id": _id})
    if not user:
        return {"message": "user not found"}, 404
    return user

class User(BaseModel):
    name: str

# clear data
@app.post("/clear_user_companyinfo")
def clear_collections(user: User):
    try:
        db['CompanyInfo'].delete_many({"interviewee": user.name})
        
        db['UserInfo'].update_one({
            "username": user.name
        },
        {
            "$set": {
                "history": []
            }
        })

        return {"message": f'successfuly deleted CompanyInfo and UserInfo history for {user.name}'}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}