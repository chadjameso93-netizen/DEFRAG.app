from fastapi import APIRouter
from app.schemas.relationship import RelationshipCreate
from app.services.relationship_service import list_relationships, create_relationship

router = APIRouter(prefix="/relationships", tags=["relationships"])

@router.get("/")
def get_relationships():
    return list_relationships()

@router.post("/")
def post_relationship(payload: RelationshipCreate):
    return create_relationship(payload.model_dump())
