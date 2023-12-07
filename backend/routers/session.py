from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from flask import Blueprint, jsonify, request

from data.config.classify import user_intent
from data.chatbot.interview_bot import InterviewBot

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']
SessionInfo = db['SessionInfo']
UserInfo = db['UserInfo']

session_blueprint = Blueprint('session', __name__)


@session_blueprint.route('/new', methods=["POST"])
def new_session():
    data = request.get_json()
    item_id = data.get("_id")
    name = data.get("name")
    email = data.get("email")
    input = data.get("input")

    match = UserInfo.find_one({"name": name, "email": email})
    if not match:
        return "record not found", 400

    # get history item
    curr_history = match.get("history", [])
    res = next((item for item in curr_history if item["_id"] == item_id), None)
    if res is None:
        return f"history item not found for {item_id}", 400

    intent = user_intent(input)[0]

    if intent == 'conduct interview':
        ...
        # get resume contexts and embeddings
        resume_contexts = res["resume_contexts"]
        resume_embeddings = res["resume_embeddings"]

        # get interview info contexts and embeddings 
        interview_info = res["interview_info"]
        interview_info_embeddings = res["interview_info_embeddings"]

        # init interview bot
        interview_bot = InterviewBot()
        test_message = interview_bot.generate_question(resume_contexts, resume_embeddings, interview_info, interview_info_embeddings)
        return jsonify({"message": test_message})

    elif intent == 'analyze resume':
        ...
        return jsonify({})

    return "intent not found", 400
