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

@users_blueprint.route('/info', methods=["POST"])
def userInfo():
    data = request.get_json()
    user_id = data.get("user_id")
    match = UserInfo.find_one({"_id": user_id})
    if match:
        return (match)
    return (jsonify({"_id": "not found"}))

@users_blueprint.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    background = data.get("background")

    match = UserInfo.find_one({"username": username})
    if match:
        return (jsonify({"username": "existing"}))

    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "username": username,
        "password": password,
        "background": background,
        "history": []
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return (doc)


@users_blueprint.route('/signin', methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    match = UserInfo.find_one({"username": username, "password": password})
    if not match:
        return (jsonify({"username": "not_found"}))
    return (match)


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
        return (doc)
