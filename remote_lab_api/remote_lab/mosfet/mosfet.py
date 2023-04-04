from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def read_mosfet():
    return {"message": "MOSFET sub-API!"}
