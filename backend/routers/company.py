from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from pydantic import BaseModel
from data.search import get_link
from data.info import scrape_url

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']

router = APIRouter(
    prefix='/company',
    tags=['company']
)

class Company(BaseModel):
    name: str

@router.post("/search")
def get_company(company: Company):
    ...
    info_dict = {
        "name": "",
        "business": str,
        "description": str
    }

    url = get_link(company.name)
    if url is None:
        return 404
    info_dict = scrape_url(url)
    return info_dict
    
    