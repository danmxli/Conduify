from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from data.generate import response_evaluation
import os
from flask import Blueprint, jsonify, request

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']

interview_blueprint = Blueprint('interview', __name__)

@interview_blueprint.route('/create_dialogue', methods=["POST"])
def create_dialogue():
    ...
    data = request.get_json()
    name = data.get("name")
    user_response = data.get("response")
    latest_document = CompanyInfo.find_one({"interviewee": name}, sort=[("time_created", -1)])

    if latest_document:
        info_dict = {
            "name": latest_document["name"],
            "business": latest_document["business"],
            "description": latest_document["description"],
            "question": latest_document["question"]
        }

        user_doc = {
            "message": user_response,
            "speaker": "user"
        }
        CompanyInfo.update_one(
            {"_id": latest_document["_id"]},
            {"$push": {"interview_session": user_doc}}
        )

        bot_response = response_evaluation(info_dict, user_response)
        bot_doc = {
            "message": bot_response,
            "speaker": "bot"
        }
        CompanyInfo.update_one(
            {"_id": latest_document["_id"]},
            {"$push": {"interview_session": bot_doc}}
        )

        return {"dialogs": CompanyInfo.find_one({"interviewee": name}, sort=[("time_created", -1)])["interview_session"]}
        

    else:
        return {"message": "No documents found in the collection"}, 404