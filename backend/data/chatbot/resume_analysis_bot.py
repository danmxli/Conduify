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

    def generate_analysis(self, resume_contexts, resume_embeddings, interview_info, interview_info_embeddings, message_history):
        """
        Generate analysis of resume.
        """
        if not GPT:
            return(mock()["ordered_content"])

        # embeddings as np array
        doc_emb = np.asarray(resume_embeddings)
        query_emb = np.asarray(interview_info_embeddings)
        query_emb.shape

        # compute dot product between both embeddings
        scores = np.dot(query_emb, doc_emb.T)[0]

        # Order with highest scores first    
        max_idx = np.argsort(-scores)
        sorted_context = []
        for idx in max_idx:
            sorted_context.append(resume_contexts[idx])

        # test
        print(sorted_context)

        passages = "\n".join(sorted_context)
        
        # TODO prompt the GPT
        return passages