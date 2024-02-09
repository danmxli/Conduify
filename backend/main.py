from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from routers.company import company_blueprint
from routers.session import session_blueprint
from routers.users import users_blueprint
import time

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = Flask(__name__)

# Configure CORS and register routes
CORS(app)
app.register_blueprint(company_blueprint, url_prefix='/company')
app.register_blueprint(users_blueprint, url_prefix='/users')
app.register_blueprint(session_blueprint, url_prefix='/session')


@app.route('/', methods=["GET"])
def read_root():
    return jsonify({"message": "root route reached"})


@app.route('/dummy', methods=["POST"])
def dummy():
    time.sleep(5)
    return jsonify({})


if __name__ == '__main__':
    port = int(os.getenv("PORT", default=3000))
    if port is not None:
        app.run(debug=True, port=port)
    else:
        print("Error: PORT environment variable is not set or is not a valid integer.")
