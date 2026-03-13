from fastapi import APIRouter
from app.schemas.simulation import SimulationRequest
from app.services.simulation_service import run_simulation

router = APIRouter(prefix="/simulation", tags=["simulation"])

@router.post("/")
async def post_simulation(payload: SimulationRequest):
    return {"simulation": await run_simulation(payload.user_id, payload.relationship_id, payload.action)}
