from pydantic import BaseModel

class EventCreate(BaseModel):
    user_id: str
    relationship_id: str | None = None
    event_type: str
    severity: float = 0.5
    notes: str | None = None
    occurred_at: str

class EventOut(EventCreate):
    id: str
