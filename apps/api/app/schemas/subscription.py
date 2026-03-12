from pydantic import BaseModel
from typing import Optional

class SubscriptionState(BaseModel):
    status: str = "trial"
    plan: str = "core"
    trial_ends_at: Optional[str] = None
