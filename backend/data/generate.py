import os
import cohere
from dotenv import load_dotenv
load_dotenv('.env')

co = cohere.Client(os.getenv('COHERE_KEY'))

def interview_question(info_dict, positions, languages):
    ... 
    # languages_applied = ', '.join(languages)
    # company_name = info_dict["name"]
    # company_business = info_dict["business"]
    # company_description = info_dict["description"]

    # prompt = f"You are the recruiter. Generate exactly one interview question for a candidate applying for {positions} roles at {company_name}, a {company_business} company. {company_description}. The response you generate should be exactly what a recruiter would say. Do not say anything else unrelated to the interview process. Keep it clear and concise."
    
    # response = co.generate(
    #     model="command-xlarge-nightly",
    #     prompt=prompt,
    # )
    # return response.generations[0].text

    return("testing for interview_question")

def response_evaluation(company_info, response):
    ...
    # company_name = company_info["name"]
    # company_business = company_info["business"]
    # company_description = company_info["description"]
    # company_question = company_info["question"]

    # prompt = f"You are grading the interviewee. The interviewee is applying for {company_name}, a {company_business} company. {company_description}. The company recruiter asked this question: {company_question} This is the interviewee response: {response} Grade the interviewee. Provide the interviewee with strengths and areas for improvement. Then, prompt the user to try again. Keep it clear and concise."

    # response = co.generate(
    #     model="command-xlarge-nightly",
    #     prompt=prompt
    # )
    # return response.generations[0].text

    return("testing for response_evaluation")
