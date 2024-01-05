import numpy as np
from typing import List, Dict


class InterviewHelper:

    def __init__(self, resume_contexts, resume_embeddings, interview_info, interview_info_embeddings) -> None:
        self.resume_contexts = resume_contexts
        self.resume_embeddings = resume_embeddings
        self.interview_info = interview_info
        self.interview_info_embeddings = interview_info_embeddings

    def relevant_contexts(self) -> List[Dict[str, str]]:
        """
        Returns list of most relevant resume contexts to be used for RAG
        """
        # embeddings as np array
        doc_emb = np.asarray(self.resume_embeddings)
        query_emb = np.asarray(self.interview_info_embeddings)
        query_emb.shape

        # cosine similarity and top k
        scores = np.dot(query_emb, doc_emb.T)[0]

        max_idx = np.argsort(-scores)
        top_k = 5

        most_relevant_contexts = [
            {"snippet": self.resume_contexts[idx]} for idx in max_idx[0:top_k]]

        return most_relevant_contexts
