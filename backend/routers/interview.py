from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']

router = APIRouter(
    prefix='/interview',
    tags=['interview']
)


@router.post("/create_dialogue")
def create_dialogue():
    return {"Message": "demo"}