from fastapi import FastAPI
import csv
from remote_lab.main import router as remote_lab_router

app = FastAPI()

# Set CORS policy to allow requests from any origin
@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

app.include_router(remote_lab_router, prefix="/remote_lab", tags=["remote_lab"])

# Run app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
