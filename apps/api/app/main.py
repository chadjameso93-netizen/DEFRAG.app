import os
import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, profile, relationships, events, subscription, status
from app.routers import persons, insights, simulation

app = FastAPI(title="Defrag API")

origins = [
    os.getenv("WEB_ORIGIN", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or str(uuid.uuid4())
    start = time.time()
    response = await call_next(request)
    duration = round((time.time() - start) * 1000, 2)
    response.headers["x-request-id"] = request_id
    print(f"{request.method} {request.url.path} {response.status_code} {duration}ms request_id={request_id}")
    return response

app.include_router(health.router)
app.include_router(profile.router)
app.include_router(relationships.router)
app.include_router(events.router)
app.include_router(subscription.router)
app.include_router(status.router)
app.include_router(persons.router)
app.include_router(insights.router)
app.include_router(simulation.router)
