import os
from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
load_dotenv('../../.env')


class ResumeHelper:

    def __init__(self) -> None:
        self.helper = OpenAI(api_key=os.getenv('OPENAI_KEY'))

    def group(self):
        """
        Group resume chunks together by similarity.
        """



    def analyze_chunk(self):
        """
        Adds similarity ranking, chunk summary, and suggestions to the chunk.
        """
