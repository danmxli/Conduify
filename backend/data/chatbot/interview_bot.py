import os
import cohere
from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
load_dotenv('../../.env')


class InterviewBot:
    """
    Interviewer agent.
    Generate initial interview question.
    Evaluate user response, and provide insightful feedback.
    """

    def __init__(self) -> None:
        # initialize api
        self.co = cohere.Client(os.getenv('COHERE_KEY'))
        self.interviewer = OpenAI(api_key=os.getenv('OPENAI_KEY'))
        
    def generate_question(self, message, user_info, company_info):
        """
        Generate interview question.
        """
