from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from data.search import get_link
from data.scrape import scrape_url
from data.generate import interview_question
from uuid import uuid4
import datetime
from flask import Blueprint, jsonify, request

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']
SessionInfo = db['SessionInfo']
UserInfo = db['UserInfo']

company_blueprint = Blueprint('company', __name__)


@company_blueprint.route('/search', methods=["POST"])
def get_company():
    data = request.get_json()
    email = data.get("email")
    position = data.get("position")
    languages = data.get("languages")
    company = data.get("company")
    interviewee = data.get("interviewee")

    # obtain url of resource
    url = get_link(company)
    info = scrape_url(url)

    if not info:
        return (jsonify({"message": "no info"}))

    user = UserInfo.find_one({"name": interviewee, "email": email})
    if not user:
        return "record not found", 400

    # curr history simplified
    curr_history = user.get("history", [])
    simple_history = [{
        "_id": item["_id"],
        "company": item["info"]["c_name"],
        "position": item["position"],
        "languages": item["languages"],
        "c_logo": item["info"]["logo"]
    } for item in curr_history]

    # add to history
    new_id = str(uuid4())
    new_session = {
        "_id": new_id,
        "info": info,
        "position": position,
        "languages": languages,
        "interviewee": interviewee,
        "interview_sessions": []
    }
    add_to_history = {
        "$push": {"history": new_session}
    }
    UserInfo.update_one(user, add_to_history)

    # append to simple_history
    simple_history.append({
        "_id": new_id,
        "company": info["c_name"],
        "position": position,
        "languages": languages,
        "c_logo": info["logo"]
    })

    success_message = {
        "message": "successfully updated",
        "simple_history": simple_history
    }

    return (jsonify({**success_message, **new_session}))
