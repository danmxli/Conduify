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

    user = UserInfo.find_one({"email": email})
    if not user:
        return "record not found", 400

    new_session = {
        "_id": str(uuid4()),
        "info": info,
        "position": position,
        "languages": languages,
        "company": company,
        "interviewee": interviewee,
        "interview_sessions": []
    }
    add_to_history = {
        "$push": {"history": new_session}
    }
    UserInfo.update_one(user, add_to_history)
    success_message = {"message": "successfully updated"}

    return (jsonify({**success_message, **new_session}))
