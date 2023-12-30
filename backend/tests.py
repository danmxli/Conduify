from data.chatbot.resume_helper import ResumeHelper
import os
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
mock_contexts = [
    "\n | Dan Li | Email : d22li@uwaterloo.ca\n | Github | Mobile : +1-647-675-6975\n | Education • University of Waterloo | Waterloo, ON\n | Bachelor of Applied Science - BASc, Computer Engineering | Sept 2022 – Apr 2027\n | Experience • Onlia Insurance | Toronto, ON\n | Automation Developer | May 2023 - Aug 2023\n",
    "\n◦ WebDriver Testing Application: Developed a scalable front-end project to automate client-to-site interactions using the Selenium and TestNG frameworks.",
    "\n◦ Test Optimization: Implemented Java interfaces to add an extensible automation framework for simulating intricate user flows, resulting in a 38% increase in test coverage and a 26% reduction in manual QA workload.",
    "\n◦ Reporting: Refined WebDriver exception handling capabilities, resulting in a 15% reduction in the occurrence of incorrect pass-fail reporting instances.",
    "\n◦ Policy Binding Application: Configured and ran a back-end project to perform integration tests for policy binding and account activation services.",
    "\n◦ Data Retrieval: Developed a SOAP web service to retrieve policy data for binding and activation; enhanced program-to-database communication efficiency by utilizing the JDBC API with PostgreSQL.",
    "\n◦ File Writing: Configured Excel writing capabilities with Apache POI to generate spreadsheets of activated accounts for automated testing usage, resulting in a 23% increase in QA resources.",
    "\n | • BrightBearsInfo | Toronto, ON\n | Marketing Lead and Web Developer Assistant | Feb 2022 - Sept 2022\n",
    "\n◦ Youth Ambassadors: Co-founded an initiative directed towards communal youth development, career opportunities, and post-secondary research.",
    "\n◦ Website Migration: Collaborated with the developer team to transition the website from Wix to Vercel, improving project scalability for future development.",
    "Projects\n•",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Created an AI-integrated productivity visualization workspace with the Cohere API.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Leveraged the retrieval-augmented generation framework to improve the quality of LLM-generated insights and reduce hallucinations.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Developed CRUD endpoints with MongoDB and state management with React.\nImplemented Auth0 to safeguard routes, resulting in seamless customer management.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n• Vcsualizer Typescript, Next.js, Recharts",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Created a portfolio template that utilizes the Github GraphQL API to synchronize real-time account changes with the website.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Developed analysis and visualization of public contribution data, by parsing JSON responses into TypeScript objects for component rendering.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n• Financial Portfolio Flask, SQLite",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Created a portfolio application to simulate real-time stock market transactions with the Yahoo Finance API.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n◦ Developed server-side functionalities with Flask for account creation, authentication, and login.\nDeveloped CRUD endpoints with SQL enabling users to lookup/buy/sell stocks, and view transaction history.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB\n•",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB > Adjusted Cost Base Stock Reporting Application C++\n◦ Created a CLI application to sort and display financial transaction data with the insertion sort algorithm.\nOptimized the scalability of file input by implementing data parsing into a linked list structure.",
    "Projects > seePickle Typescript, Next.js, Python, MongoDB > Adjusted Cost Base Stock Reporting Application C++\n◦ Refined application memory management by developing safe pointer deletion strategies, maintaining memory leak probabilities at a rate below 7%.",
    "Programming Skills\nLanguages: Python, Javascript, Typescript, C, C++, SQL, Java, Bash Tools and Databases: Git, Docker, Linux, MongoDB, PostgreSQL Frameworks and Libraries: Flask, Django, FastAPI, Next.js, Selenium WebDriver, React.js, NumPy, Pandas"
]


load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
UserInfo = db['UserInfo']

NAME = 'Samson Alexander'
EMAIL = 'samsalexdrrr@gmail.com'
ITEM_ID = 'f662c25e-d328-4a15-ae25-6b97af5e90e8'

match = UserInfo.find_one({"name": NAME, "email": EMAIL})
curr_history = match.get("history", [])
res = next((item for item in curr_history if item["_id"] == ITEM_ID), None)


resume_helper = ResumeHelper()

resume_helper.rag("https://www.danli.dev/Base_Resume_1.pdf")

