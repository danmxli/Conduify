import os
from openai import OpenAI
from dotenv import load_dotenv
import spacy
import numpy as np
load_dotenv('.env')

SIMILARITY_THRESHOLD = 0.7


class ResumeHelper:

    def __init__(self) -> None:
        self.nlp = spacy.load("en_core_web_md")
        self.helper = OpenAI(api_key=os.getenv('OPENAI_KEY'))

    def group(self, contexts):
        """
        Group resume chunks together by string context similarity.
        """
        groups = []

        docs = list(self.nlp.pipe(contexts))

        for i in range(len(docs)):
            # Each group is a list of similar strings, initialized with the current string
            group = [docs[i].text]
            for j in range(i + 1, len(docs)):

                if docs[i].similarity(docs[j]) > SIMILARITY_THRESHOLD:
                    group.append(docs[j].text)

            groups.append(group)

        # test
        print(groups)
        return groups

    def analyze_chunk(self):
        """
        Adds similarity ranking, chunk summary, and suggestions to the chunk.
        """
