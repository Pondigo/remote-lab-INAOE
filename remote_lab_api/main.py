from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
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

#Return hello on root
@app.get("/")
async def root():
    return {"message": "Hello"}


# Example endpoint for authentication
@app.post("/auth")
async def authenticate(request: Request):
    data = await request.json()
    username = data['user']
    password = data['password']
    #Check if username and password are correct
    if username == 'admin' and password == 'admin':
        #Print
        headers = {
            "auth-token": "SOME_AUTH_TOKEN",
            "Access-Control-Allow-Origin": "*",
        }
        return JSONResponse({}, headers=headers)
    else:
        return Response(status_code=401)


@app.options("/auth")
async def options_auth(request: Request):
    # Set the appropriate CORS headers to allow cross-origin requests
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, auth-token",
    }

    # Return an empty response with the appropriate headers
    return Response(headers=headers)



# Run app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
