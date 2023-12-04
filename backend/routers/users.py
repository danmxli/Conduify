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


@users_blueprint.route('/access', methods=["POST"])
def access():
    # from auth0
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")

    # find an existing user
    if UserInfo.count_documents({}) > 0:
        match = UserInfo.find_one({"name": name, "email": email})
        if match:
            return (jsonify(match))

    # for new user, insert document
    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "name": name,
        "email": email,
        "history": []
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return (doc)
    else:
        return (jsonify({"message": "error inserting user"}))
