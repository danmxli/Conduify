from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from pydantic import BaseModel
from data.search import get_link
from data.info import scrape_url
from data.generate import interview_question
from uuid import uuid4
import datetime

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']
SessionInfo = db['SessionInfo']
UserInfo = db['UserInfo']

router = APIRouter(
    prefix='/company',
    tags=['company']
)


class Company(BaseModel):
    name: str
    position: str
    languages: list[str]
    interviewee: str


@router.post("/search")
def get_company(company: Company):
    session_list = []
    ...
    # scrape the company details first
    info_dict = {
        "name": str,
        "business": str,
        "description": str,
    }
    url = get_link(company.name)
    if url is None:
        return {
            "information": "not found"
        }
    # populat info_dict with company details
    info_dict = scrape_url(url)
    
    filter = { # add company name to filter
        "name": info_dict['name'],
        "position": company.position,
        "languages": company.languages,
        "interviewee": company.interviewee
    }
    print(filter)
    
    result = CompanyInfo.find_one(filter)
    if result:
        # generate interview_question
        new_question = interview_question(
            info_dict, company.position, company.languages)
        # update the question and interview_sessions list
        CompanyInfo.update_one(filter, {"$set": {"question": new_question}})
        CompanyInfo.update_one(filter, {"$set": {"interview_session": []}})


        found = CompanyInfo.find_one(filter)
        for i in update_user_session(found["_id"], found["name"], found["position"], found["languages"], company.interviewee):
            if i not in session_list:
                session_list.append(i)

        return {
            "information": found,
            "user_session": session_list
        }

    else:
        question = interview_question(
            info_dict, company.position, company.languages)

        doc = {
            "_id": str(uuid4()),
            "time_created": int(datetime.datetime.now().timestamp()),
            "name": info_dict["name"],
            "business": info_dict["business"],
            "description": info_dict["description"],
            "position": company.position,
            "languages": company.languages,
            "interviewee": company.interviewee,
            "question": question,
            "interview_session": []
        }

        for i in update_user_session(doc["_id"], doc["name"], doc["position"], doc["languages"], company.interviewee):
            if i not in session_list:
                session_list.append(i)

        result = CompanyInfo.insert_one(doc)
        if result.inserted_id:
            return {
                "information": doc,
                "user_session": session_list
            }
        else:
            return {
                "information": "not found"
            }


def update_user_session(interview_id, company_name, position, languages, interviewee):
    doc_list = []
    doc = {
        "interview_id": interview_id,
        "company_name": company_name,
        "position": position,
        "languages": languages
    }
    # find document corresponding to that interviewee
    user = UserInfo.find_one({"username": interviewee})
    if not user:
        return {"message": "user not found"}  

    # insert one if doc with matching criteria does not exist
    history = user.get("history", [])
    if doc not in history:
        history.append(doc)
    UserInfo.update_one({"username": interviewee}, {"$set": {"history": history}})
    
    # append the doc_list
    for i in UserInfo.find_one({"username": interviewee}).get("history", []):
        doc_list.append(i)

    return doc_list

    
