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

router = APIRouter(
    prefix='/company',
    tags=['company']
)


class Company(BaseModel):
    name: str
    position: str
    languages: list[str]


@router.post("/search")
def get_company(company: Company):
    ...
    # search mongodb for existing documents
    filter = {
        "name": company.name,
        "position": company.position,
        "languages": company.languages
    }
    info_dict = {
        "name": str,
        "business": str,
        "description": str,
    }
    result = CompanyInfo.find_one(filter)
    if result:
        info_dict = {
            "name": result["name"],
            "business": result["business"],
            "description": result["description"]
        }
        new_question = interview_question(
            info_dict, company.position, company.languages)
        CompanyInfo.update_one(filter, {"$set": {"question": new_question}})
        CompanyInfo.update_one(filter, {"$set": {"interview_session": []}})

        return CompanyInfo.find_one(filter)

    else:
        url = get_link(company.name)
        if url is None:
            return 404
        else:
            info_dict = scrape_url(url)
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
                "question": question,
                "interview_session":[]
            }

            result = CompanyInfo.insert_one(doc)
            if result.inserted_id:
                return doc
            else:
                return 404
