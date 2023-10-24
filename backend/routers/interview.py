from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pydantic import BaseModel
from data.generate import response_evaluation
import os

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']

router = APIRouter(
    prefix='/interview',
    tags=['interview']
)

class User(BaseModel):
    response: str

@router.post("/create_dialogue")
def create_dialogue(user: User):
    ...
    latest_document = CompanyInfo.find_one(sort=[("time_created", -1)])

    if latest_document:
        info_dict = {
            "name": latest_document["name"],
            "business": latest_document["business"],
            "description": latest_document["description"],
            "question": latest_document["question"]
        }

        user_doc = {
            "message": user.response,
            "speaker": "user"
        }
        CompanyInfo.update_one(
            {"_id": latest_document["_id"]},
            {"$push": {"interview_session": user_doc}}
        )

        bot_response = response_evaluation(info_dict, user.response)
        bot_doc = {
            "message": bot_response,
            "speaker": "bot"
        }
        CompanyInfo.update_one(
            {"_id": latest_document["_id"]},
            {"$push": {"interview_session": bot_doc}}
        )

        return {"dialogs": CompanyInfo.find_one(sort=[("time_created", -1)])["interview_session"]}
        

    else:
        return {"message": "No documents found in the collection"}, 404