from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from flask import Blueprint, jsonify, request

from data.config.classify import user_intent
from data.chatbot.interview_bot import InterviewBot
from data.chatbot.resume_analysis_bot import ResumeBot

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']
SessionInfo = db['SessionInfo']
UserInfo = db['UserInfo']

session_blueprint = Blueprint('session', __name__)


@session_blueprint.route('/new', methods=["POST"])
def new_session():
    """
    handle response to user input.
    update interivew_sessions.
    """
    data = request.get_json()
    item_id = data.get("_id")
    name = data.get("name")
    email = data.get("email")
    input = data.get("input")

    match = UserInfo.find_one({"name": name, "email": email})
    if not match:
        return "record not found", 400

    # message history from interview_session
    curr_history = match.get("history", [])
    res = next((item for item in curr_history if item["_id"] == item_id), None)
    if res is None:
        return f"history item not found for {item_id}", 400
    message_history = res["interview_sessions"]

    # session_status
    session_status = res["session_status"]

    # session_status is ask, determine intent of user
    if session_status == 'ask':
        ...
        intent = user_intent(input)[0]
        # contexts and embeddings
        resume_contexts = res["resume_contexts"]
        resume_embeddings = res["resume_embeddings"]
        interview_info = res["interview_info"]
        interview_info_embeddings = res["interview_info_embeddings"]

        if intent == 'conduct interview':
            ...
            interview_bot = InterviewBot()
            bot_message = interview_bot.generate_question(
                resume_contexts, resume_embeddings, interview_info, interview_info_embeddings, message_history)

            # insert bot message into interview_sessions
            result = update_chat_history(input, bot_message, email, item_id)
            if result.modified_count == 0:
                return "error updating database", 400

            # update session_status
            result = update_session_status('conversation', email, item_id)
            return jsonify({
                "response": {
                    "role": "assistant",
                    "content": bot_message
                }
            })

        elif intent == 'analyze resume':
            ...
            # TODO
            resume_bot = ResumeBot()
            bot_message = resume_bot.generate_analysis(
                resume_contexts, resume_embeddings, interview_info, interview_info_embeddings, message_history)

            # insert bot message into interview_sessions
            result = update_chat_history(input, bot_message, email, item_id)
            if result.modified_count == 0:
                return "error updating database", 400

            return jsonify({
                "response": {
                    "role": "assistant",
                    "content": bot_message
                }
            })

        return "intent not found", 400

    # session_status is conversation, evaluate response of user
    elif session_status == 'conversation':
        ...
        interview_bot = InterviewBot()
        bot_message = interview_bot.evaluate_response(message_history, input)

        # insert bot message into interview_sessions
        result = update_chat_history(input, bot_message, email, item_id)
        if result.modified_count == 0:
            return "error updating database", 400

        # update session_status
        result = update_session_status('ask', email, item_id)
        return jsonify({"response": {
            "role": "assistant",
            "content": bot_message
        }})

    return "session status error", 400


"""
helpers
"""


def update_chat_history(input, bot_message, email, item_id):
    ...
    filter = {
        "email": email,
        "history._id": item_id,
    }
    update_history_query = {
        "$push": {
            "history.$.interview_sessions":
            {
                "$each": [
                    {
                        "role": "user",
                        "content": input
                    },
                    {
                        "role": "assistant",
                        "content": bot_message
                    }
                ]
            }
        }
    }
    result = UserInfo.update_one(filter, update_history_query)
    return result


def update_session_status(new_status, email, item_id):
    ...
    filter = {
        "email": email,
        "history._id": item_id,
    }
    set_new_query = {
        "$set": {
            "history.$.session_status": new_status
        }
    }
    result = UserInfo.update_one(filter, set_new_query)
    return result
