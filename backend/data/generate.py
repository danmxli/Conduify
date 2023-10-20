import os
import cohere
from dotenv import load_dotenv
load_dotenv('../.env')

co = cohere.Client(os.getenv('COHERE_KEY'))

def interview_question(info_dict, positions, languages):
    ... 
    languages_applied = ', '.join(languages)
    company_name = info_dict["name"]
    company_business = info_dict["business"]
    company_description = info_dict["description"]

    prompt = f"You are the recruiter. Generate exactly one interview question for a candidate applying for {positions} roles at {company_name}, a {company_business} company. {company_description}. The response you generate should be exactly what a recruiter would say. Do not say anything else unrelated to the interview process. Keep it clear and concise."
    
    response = co.generate(
        model="command-xlarge-nightly",
        prompt=prompt,
    )
    return response.generations[0].text