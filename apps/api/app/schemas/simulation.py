from pydantic import BaseModel

class SimulationRequest(BaseModel):
    user_id: str
    relationship_id: str | None = None
    action: str

class SimulationOut(BaseModel):
    id: str
    user_id: str
    relationship_id: str | None = None
    action: str
    escalation_probability: float
    repair_probability: float
    stability_probability: float
