from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from pydantic import BaseModel
from uuid import uuid4
import datetime

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']
UserInfo = db['UserInfo']

router = APIRouter(
    prefix='/users',
    tags=['users']
)

class User(BaseModel):
    name: str

@router.post("/home_registration")
def home_registration(user: User):
    ...
    match = UserInfo.find_one({"username": user.name})
    if match:
        return{"username": "already exists"}

    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "username": user.name
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return(doc)
