from fastapi import APIRouter

router = APIRouter(prefix="/status", tags=["status"])

@router.get("/")
def read_status():
    return {"ok": True, "api": "running"}
