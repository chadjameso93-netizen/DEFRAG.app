from fastapi import APIRouter, Query
from app.schemas.insight import InsightCreate
from app.services.insight_service import generate_insight, list_insights

router = APIRouter(prefix="/insights", tags=["insights"])

@router.get("/")
async def get_insights(user_id: str = Query(...)):
    return {"insights": await list_insights(user_id)}

@router.post("/")
async def post_insight(payload: InsightCreate):
    return {"insight": await generate_insight(payload.user_id, payload.relationship_id)}
