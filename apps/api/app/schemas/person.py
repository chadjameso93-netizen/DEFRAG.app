from pydantic import BaseModel

class PersonCreate(BaseModel):
    user_id: str
    name: str
    role: str | None = None

class PersonOut(PersonCreate):
    id: str
