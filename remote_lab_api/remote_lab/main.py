from fastapi import APIRouter
from remote_lab.logic_gate.logic_gate import router as logic_gate_router
from remote_lab.mosfet.mosfet import router as mosfet_router
from remote_lab.solar_cell.solar_cell import router as solar_cell_router

router = APIRouter()

# Mount the routers for the sub-APIs under the main app
router.include_router(logic_gate_router, prefix="/logic_gate", tags=["logic_gate"])
router.include_router(mosfet_router, prefix="/mosfet", tags=["mosfet"])
router.include_router(solar_cell_router, prefix="/solar_cell", tags=["solar_cell"])

# Get available practices (sub-APIs)
@router.get("/")
async def get_available_practices():
    #Return a list of available practices
    available_practices = ["logic_gate", "mosfet", "solar_cell"]
    return available_practices
