from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
import datetime

load_dotenv('../../.env')


class UserInfoCollection:

    def __init__(self, name, email) -> None:
        ...
        client = MongoClient(os.getenv("MONGODB_URI"))
        db = client['AppData']
        UserInfo = db['UserInfo']

        match = UserInfo.find_one({"name": name, "email": email})
        if not match:
            raise ValueError(
                f"No match found for name: {name}, email: {email}")

        self.col = UserInfo
        self.user = match

    def update_history(self, new_session, email):
        ...
        filter = {
            "email": email
        }
        add_to_history = {
            "$push": {"history": new_session}
        }
        result = self.col.update_one(add_to_history, filter)
        return result

    def update_interview_sessions(self, input, bot_message, email, item_id):
        ...
        filter = {
            "email": email,
            "history._id": item_id,
        }
        update_history_query = {
            "$push": {
                "history.$.interview_sessions":
                {
                    "$each": [
                        {
                            "role": "user",
                            "content": input
                        },
                        {
                            "role": "assistant",
                            "content": bot_message
                        }
                    ]
                }
            }
        }
        result = self.col.update_one(filter, update_history_query)
        return result

    def update_session_status(self, new_status, email, item_id):
        ...
        filter = {
            "email": email,
            "history._id": item_id,
        }
        set_new_query = {
            "$set": {
                "history.$.session_status": new_status
            }
        }
        result = self.col.update_one(filter, set_new_query)
        return result
