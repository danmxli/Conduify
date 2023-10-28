from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
import datetime
from flask import Blueprint, jsonify, request

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']
UserInfo = db['UserInfo']

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/home_registration', methods=["POST"])
def home_registration():
    ...
    data = request.get_json()
    name = data.get("name")
    match = UserInfo.find_one({"username": name})
    if match:
        return match

    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "username": name,
        "history": []
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return(doc)
