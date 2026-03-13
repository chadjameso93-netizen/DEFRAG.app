from pydantic import BaseModel

class InsightCreate(BaseModel):
    user_id: str
    relationship_id: str | None = None

class InsightOut(BaseModel):
    id: str
    user_id: str
    relationship_id: str | None = None
    summary: str
    confidence: float
    evidence: list[str]
    alternate_explanations: list[str]
