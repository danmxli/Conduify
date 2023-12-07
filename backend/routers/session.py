from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from data.config.classify import user_intent
from flask import Blueprint, jsonify, request

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
    _id: data.get("_id")
    name = data.get("name")
    email = data.get("email")
    input = data.get("input")

    user = UserInfo.find_one({"name": name, "email": email})
    if not user:
        return "record not found", 400

    intent = user_intent(input)[0]

    if intent == 'conduct interview':
        ...
        return jsonify({})
    elif intent == 'analyze resume':
        ...
        return jsonify({})

    return "intent not found", 400
