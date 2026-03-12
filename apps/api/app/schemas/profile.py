from pydantic import BaseModel
from typing import Optional

class ProfileCreate(BaseModel):
    full_name: Optional[str] = None
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    birth_place: Optional[str] = None
