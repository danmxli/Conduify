from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from flask import Blueprint, jsonify, request

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
CompanyInfo = db['CompanyInfo']

interview_blueprint = Blueprint('interview', __name__)

@interview_blueprint.route('/chat', methods=["POST"])
def chat():
    ...
    