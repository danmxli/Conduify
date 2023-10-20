import os
import cohere
from dotenv import load_dotenv
load_dotenv('../.env')

co = cohere.Client(os.getenv('COHERE_KEY'))

def interview_question(info_dict, positions):
    ... 
    position_applied = ', '.join(positions)
    company_name = info_dict["name"]
    company_business = info_dict["business"]
    company_description = info_dict["description"]

    prompt = f"Generate exactly one interview question for a candidate applying for {position_applied} roles at {company_name}, a {company_business} company. {company_description}."
    
    response = co.generate(
        model="command-xlarge-nightly",
        prompt=prompt,
    )
    return response.generations[0].text