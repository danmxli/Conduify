from fastapi import APIRouter
from models.payloadData import RequestPayload, ResponsePayload
from services.uploadResume import UploadResumeService

router = APIRouter()
upload_resume_service = UploadResumeService()


@router.post("/resume/upload/")
async def upload_resume(payload: RequestPayload) -> ResponsePayload:
    return await upload_resume_service.upload(payload)
