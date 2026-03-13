from fastapi import APIRouter, Query
from app.schemas.person import PersonCreate
from app.services.person_service import list_persons, create_person

router = APIRouter(prefix="/persons", tags=["persons"])

@router.get("/")
async def get_persons(user_id: str = Query(...)):
    return {"persons": await list_persons(user_id)}

@router.post("/")
async def post_person(payload: PersonCreate):
    return {"person": await create_person(payload.model_dump())}
