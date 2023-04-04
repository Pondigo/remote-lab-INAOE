from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def read_logic_gate():
    return {"message": "logic gate sub-API!"}
