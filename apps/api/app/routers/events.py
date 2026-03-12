from fastapi import APIRouter
from app.schemas.event import EventCreate
from app.services.event_service import list_events, create_event

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/")
def get_events():
    return list_events()

@router.post("/")
def post_event(payload: EventCreate):
    return create_event(payload.model_dump())
