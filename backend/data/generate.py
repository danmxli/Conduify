from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv('../.env')

client = OpenAI(api_key=os.getenv('OPENAI_KEY'))

# completion = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": "Hello!"}
#     ]
# )

# print(completion)