from pydantic import BaseModel
from typing import Optional

class EventCreate(BaseModel):
    event_type: str
    actor: Optional[str] = None
    target: Optional[str] = None
    severity: float = 0.5
    notes: Optional[str] = None
