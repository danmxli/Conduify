import numpy as np


class InterviewHelper:

    def __init__(self, resume_contexts, resume_embeddings, interview_info, interview_info_embeddings) -> None:
        self.resume_contexts = resume_contexts
        self.resume_embeddings = resume_embeddings
        self.interview_info = interview_info
        self.interview_info_embeddings = interview_info_embeddings

    def relevant_contexts(self):
        """
        Returns a string of resume contexts that are relevant to the interview.
        """
        # embeddings as np array
        doc_emb = np.asarray(self.resume_embeddings)
        query_emb = np.asarray(self.interview_info_embeddings)
        query_emb.shape

        # compute dot product between both embeddings
        scores = np.dot(query_emb, doc_emb.T)[0]

        # Find the highest scores
        max_idx = np.argsort(-scores)
        most_relevant_contexts = []
        top_k = 5
        for idx in max_idx[0:top_k]:
            most_relevant_contexts.append(self.resume_contexts[idx])

        # test
        # print(most_relevant_contexts)

        passages = "\n".join(most_relevant_contexts)
        return passages
