from pydantic import BaseModel

class RelationshipCreate(BaseModel):
    user_id: str
    source_person_id: str
    target_person_id: str
    relationship_type: str = "personal"
    tension_score: float | None = None
    trust_score: float | None = None

class RelationshipOut(RelationshipCreate):
    id: str
