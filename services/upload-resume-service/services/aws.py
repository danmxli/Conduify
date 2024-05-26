from models.payloadData import RequestPayload
from typing import Union

class AwsService:
    """"""

    async def generate_public_url(self, payload: RequestPayload) -> Union[str, None]:
        """TODO convert file to PDF, upload file to S3"""
        return "https://www.danli.dev/Base_Resume_1.pdf"
