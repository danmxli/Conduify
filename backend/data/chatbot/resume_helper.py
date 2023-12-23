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
        texts = [{'text': doc.text, 'matched': False} for doc in docs]

        for i, e in enumerate(docs):
            if not texts[i]['matched']:
                group = [e.text]
                texts[i]['matched'] = True

                for j in range(i+1, len(docs)):

                    if not texts[j]['matched'] and docs[i].similarity(docs[j]) > SIMILARITY_THRESHOLD and docs[j].text not in group:
                        group.append(docs[j].text)
                        texts[j]['matched'] = True

                groups.append(group)

        # test
        return groups

    def analyze_chunk(self):
        """
        Adds similarity ranking, chunk summary, and suggestions to the chunk.
        """
