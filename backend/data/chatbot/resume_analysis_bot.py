from data.chatbot.tests import mock
import os
from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
load_dotenv('../../.env')

# True to use OpenAI api, False to send mock data
GPT = False

SYSTEM_MESSAGE_PROMPT = """
        TODO
        """

RESUME_ANALYSIS_PROMPT = """
        TODO
        """

class ResumeBot:

    def __init__(self) -> None:
        self.interviewer = OpenAI(api_key=os.getenv('OPENAI_KEY'))

    