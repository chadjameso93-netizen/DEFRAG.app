from fastapi import FastAPI
from app.routers import health, profile, relationships, events, subscription, status

app = FastAPI(title="Defrag API")

app.include_router(health.router)
app.include_router(profile.router)
app.include_router(relationships.router)
app.include_router(events.router)
app.include_router(subscription.router)
app.include_router(status.router)
