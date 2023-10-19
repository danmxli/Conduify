from typing import Union
from fastapi import FastAPI
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from fastapi.encoders import jsonable_encoder
import routers.interview as softskills_interview

load_dotenv()
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = FastAPI()
app.include_router(softskills_interview.router)

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

# sign user up

# get user info
@app.get("/users/{_id}")
def read_item(_id: str):
    collection = db['UserInfo']
    user = collection.find_one({"_id": _id})
    if not user:
        return {"message": "user not found"}, 404
    return user