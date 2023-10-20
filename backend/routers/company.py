from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from pydantic import BaseModel
from data.search import get_link
from data.info import scrape_url
from data.generate import interview_question

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
    info_dict = {
        "name": str,
        "business": str,
        "description": str,
    }

    url = get_link(company.name)
    if url is None:
        return 404
    else:
        info_dict = scrape_url(url)
        question = interview_question(info_dict, company.position, company.languages)

        new_id = CompanyInfo.find_one(sort=[("_id", -1)])  # Get the latest document
        if new_id is not None:
            new_id = new_id["_id"] + 1  # Increment the latest _id
        else:
            new_id = 1  # First entry

        doc = {
            "_id": new_id,
            "name": info_dict["name"],
            "business": info_dict["business"],
            "description": info_dict["description"],
            "position": company.position,
            "languages": company.languages,
            "question": [question]
        }
        
        result = CompanyInfo.insert_one(doc)
        if result.inserted_id:
            return doc
        else:
            return 404
    
    