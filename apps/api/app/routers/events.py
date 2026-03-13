from fastapi import APIRouter, Query
from app.schemas.event import EventCreate
from app.services.event_service import list_events, create_event

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/")
async def get_events(user_id: str = Query(...)):
    return {"events": await list_events(user_id)}

@router.post("/")
async def post_event(payload: EventCreate):
    return {"event": await create_event(payload.model_dump())}
