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

    # for new user, insert document with empty history
    if UserInfo.count_documents({}) == 0:
    
        doc = {
            "_id": str(uuid4()),
            "time_created": int(datetime.datetime.now().timestamp()),
            "name": name,
            "email": email,
            "history": []
        }
        result = UserInfo.insert_one(doc)
        if not result.inserted_id:
            return "failed to insert doc", 400
        
        return (jsonify([]))

    # find an existing user and return the simplified history
    match = UserInfo.find_one({"name": name, "email": email})
    if not match:
        return "record not found", 400

    curr_history = match.get("history", [])
    
    simple_history = [{
        "_id": item["_id"],
        "company": item["info"]["c_name"],
        "position": item["position"],
        "languages": item["languages"],
        "c_logo": item["info"]["logo"]
    } for item in curr_history]        

    return (jsonify(simple_history))


@users_blueprint.route('/history_item', methods=["POST"])
def history_item():
    # get session data by _id
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    item_id = data.get("_id")

    match = UserInfo.find_one({"name": name, "email": email})
    if not match:
        return "record not found", 400

    curr_history = match.get("history", [])
    res = next((item for item in curr_history if item["_id"] == item_id), None)
    if res is None:
        return f"history item not found for {item_id}", 400
    
    return(jsonify(res))