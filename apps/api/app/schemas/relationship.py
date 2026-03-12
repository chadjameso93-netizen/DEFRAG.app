from pydantic import BaseModel

class RelationshipCreate(BaseModel):
    source_name: str
    target_name: str
    relationship_type: str = "personal"
    tension_score: float = 0.2
    trust_score: float = 0.5
