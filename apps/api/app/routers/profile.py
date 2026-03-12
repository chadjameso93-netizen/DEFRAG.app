from fastapi import APIRouter
from app.schemas.profile import ProfileCreate
from app.services.profile_service import save_profile

router = APIRouter(prefix="/profile", tags=["profile"])

@router.post("/")
def create_profile(payload: ProfileCreate):
    return save_profile(payload.model_dump())
