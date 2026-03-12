from fastapi import APIRouter
from app.services.subscription_service import get_subscription_state

router = APIRouter(prefix="/subscription", tags=["subscription"])

@router.get("/")
def read_subscription():
    return get_subscription_state()
