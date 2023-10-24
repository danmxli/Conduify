from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from fastapi.encoders import jsonable_encoder
import routers.interview as softskills_interview
import routers.company as getcompany

load_dotenv('../.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = FastAPI()
# Configure CORS
origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(softskills_interview.router)
app.include_router(getcompany.router)

# root route
@app.get("/")
def read_root():
    return {"Root Route": True}

# testing db connection
@app.get("/connect")
def connect_db():
    collection = db["UserInfo"]
    result = list(collection.find({}))
    return result

# sign user up

# get user info
@app.get("/users/{_id}")
def read_item(_id: int):
    collection = db['SessionInfo']
    user = collection.find_one({"_id": _id})
    if not user:
        return {"message": "user not found"}, 404
    return user

# clear data
@app.get("/clear-collections")
def clear_collections():
    try:
        collection_names = db.list_collection_names()

        # Iterate through collections and drop (delete) each one
        for collection_name in collection_names:
            db[collection_name].drop()

        return {"message": "All collections cleared successfully"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}