from pydantic import BaseModel
from typing import Union


class RequestPayload(BaseModel):
    """"""
    user_email: str
    file_type: str
    resume: Union[bytes, str]


class ResponsePayload(BaseModel):
    """"""
    public_resume_url: Union[str, None]
    message: str
    