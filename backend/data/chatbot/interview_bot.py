import os
from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
load_dotenv('../../.env')

SYSTEM_MESSAGE = """
        You are a job recruiter who will be interviewing an applicant.
        You must respond in first person point of view. You are directly talking to the applicant, no one else.
        You have access to information about the interview. Provided below is the outline of the interview information:
        c_name: the name of your company.
        business: the business type of your company.
        description: the description of your company.
        desired position of applicant: the desired position of the applicant.
        programming skills of applicant: the programming languages the applicant is most confident in.
        In addition, you have access to important details from the resume of the applicant.
        Your task is to generate an interview question. I will provide both interview information and resume details below.
        """


class InterviewBot:
    """
    Interviewer agent.
    Generate initial interview question.
    Evaluate user response, and provide insightful feedback.
    """

    def __init__(self) -> None:
        # initialize api
        self.interviewer = OpenAI(api_key=os.getenv('OPENAI_KEY'))

    def generate_question(self, resume_contexts, resume_embeddings, interview_info, interview_info_embeddings):
        """
        Generate interview question.
        """
        # resume embedding as document
        doc_emb = np.asarray(resume_embeddings)

        # company info embedding as query
        query_emb = np.asarray(interview_info_embeddings)
        query_emb.shape

        # compute dot product between both embeddings
        scores = np.dot(query_emb, doc_emb.T)[0]

        # Find the highest scores
        max_idx = np.argsort(-scores)
        most_relevant_contexts = []
        top_k = 5

        # Get only the top contexts
        for idx in max_idx[0:top_k]:
            most_relevant_contexts.append(resume_contexts[idx])

        # test
        print(most_relevant_contexts)

        passages = "\n".join(most_relevant_contexts)

        # prompt the GPT
        initial_prompt = f"Here is the interview information: {interview_info}. Here are the important details from the resume of the applicant: {passages}. Generate an interview question for the applicant."

        response = self.interviewer.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": initial_prompt}
            ]
        )
        return (response.choices[0].message.content)
