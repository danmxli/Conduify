from models.payloadData import RequestPayload, ResponsePayload
from services.parseResume import ParseResumeService
from services.aws import AwsService


class UploadResumeService:
    """"""

    def __init__(self) -> None:
        self.aws = AwsService()
        self.parse_resume = ParseResumeService()

    async def upload(self, payload: RequestPayload) -> ResponsePayload:
        """TODO """
        url = await self.aws.generate_public_url(payload)
        if url is None:
            return {
                "public_resume_url": None,
                "message": "Failed to generate public url"
            }

        if not await self.parse_resume.extract(url):
            return {
                "public_resume_url": url,
                "message": "Failed to extract context"
            }

        return {
            "public_resume_url": url,
            "message": "Success"
        }
