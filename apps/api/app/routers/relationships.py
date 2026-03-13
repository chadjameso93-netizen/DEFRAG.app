from fastapi import APIRouter, Query
from app.schemas.relationship import RelationshipCreate
from app.services.relationship_service import list_relationships, create_relationship

router = APIRouter(prefix="/relationships", tags=["relationships"])

@router.get("/")
async def get_relationships(user_id: str = Query(...)):
    return {"relationships": await list_relationships(user_id)}

@router.post("/")
async def post_relationship(payload: RelationshipCreate):
    return {"relationship": await create_relationship(payload.model_dump())}
