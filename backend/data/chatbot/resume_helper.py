import os
from openai import OpenAI
from dotenv import load_dotenv
import spacy
import numpy as np
load_dotenv('.env')

SIMILARITY_THRESHOLD = 0.7
GPT = True


class ResumeHelper:

    def __init__(self) -> None:
        self.nlp = spacy.load("en_core_web_md")
        self.helper = OpenAI(api_key=os.getenv('OPENAI_KEY'))

    def group(self, contexts, interview_info):
        """
        Group resume chunks together by string context similarity.
        """
        groups = []

        docs = list(self.nlp.pipe(contexts))
        texts = [{'text': doc.text, 'matched': False} for doc in docs]

        for i, e in enumerate(docs):
            if texts[i]['matched']:
                continue

            group = [e.text]
            texts[i]['matched'] = True

            for j in range(i+1, len(docs)):

                if texts[j]['matched'] or docs[i].similarity(docs[j]) <= SIMILARITY_THRESHOLD or docs[j].text in group:
                    continue

                group.append(docs[j].text)
                texts[j]['matched'] = True

            grouped_chunk = "\n".join(group)
            groups.append(grouped_chunk)

        return groups

    def cleanup_chunk(self, chunk):
        """
        Clean up formatting errors by summarizing the chunk.
        """


    def analyze_chunk(self, chunk, interview_info):
        """
        Adds similarity ranking, chunk summary, and suggestions to the chunk.
        """

        chunk.append('///EVALUATION///')
