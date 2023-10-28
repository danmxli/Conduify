from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from routers.company import company_blueprint
from routers.interview import interview_blueprint
from routers.users import users_blueprint

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = Flask(__name__)

# Configure CORS and register routes
CORS(app)
app.register_blueprint(company_blueprint, url_prefix='/company')
app.register_blueprint(interview_blueprint, url_prefix='/interview')
app.register_blueprint(users_blueprint, url_prefix='/users')

# root route
@app.route('/', methods=["GET"])
def read_root():
    return jsonify({"message" : "root route reached"})

# testing db connection
@app.route('/connect', methods=["GET"])
def connect_db():
    collection = db["UserInfo"]
    result = list(collection.find({}))
    return jsonify(result)

# clear data
@app.route('/clear_user_companyinfo', methods=["POST"])
def clear_collections():
    data = request.get_json()
    username = data.get("username")
    try:
        db['CompanyInfo'].delete_many({"interviewee": username})
        
        db['UserInfo'].update_one({
            "username": username
        },
        {
            "$set": {
                "history": []
            }
        })

        return {"message": f'successfuly deleted CompanyInfo and UserInfo history for {username}'}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
    

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))