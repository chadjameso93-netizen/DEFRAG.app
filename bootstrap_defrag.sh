#!/usr/bin/env bash
set -euo pipefail

echo "==> Bootstrapping Defrag"

mkdir -p apps/{web,api,edge-ai} \
  packages/{relational-engine,feature-engine,simulation-engine,explanation-engine,astrology-engine,psychology-engine,ui} \
  services/{auth-service,graph-service,inference-service,billing-service,invite-service,event-service} \
  infra/{docker,supabase,redis,neo4j,namecom,vercel} \
  scripts/{bootstrap,deploy,seed} \
  docs/{architecture,developer,api,product} \
  .github/workflows

cat > pnpm-workspace.yaml <<'YAML'
packages:
  - apps/*
  - packages/*
  - services/*
YAML

cat > .gitignore <<'TXT'
node_modules
.next
dist
coverage
.env
.env.local
.venv
__pycache__
*.pyc
.DS_Store
TXT

cat > .env.example <<'ENV'
APP_NAME=Defrag
APP_URL=https://defrag.app
NEXT_PUBLIC_API_URL=http://localhost:8000

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_DB=defrag

NEO4J_URI=
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=

REDIS_URL=redis://localhost:6379

STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

JWT_SECRET=change-this
JWT_EXPIRATION=7d

NAMECOM_USERNAME=
NAMECOM_TOKEN=
NAMECOM_API_URL=https://api.name.com/v4
ENV

cat > docker-compose.yml <<'YAML'
version: "3.9"

services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: defrag
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  neo4j:
    image: neo4j:5
    environment:
      NEO4J_AUTH: neo4j/password
    ports:
      - "7474:7474"
      - "7687:7687"
YAML

mkdir -p apps/api/app/routers
cat > apps/api/requirements.txt <<'TXT'
fastapi
uvicorn
python-dotenv
stripe
neo4j
redis
TXT

cat > apps/api/app/main.py <<'PY'
from fastapi import FastAPI
from routers import health

app = FastAPI(title="Defrag API")
app.include_router(health.router)
PY

cat > apps/api/app/routers/health.py <<'PY'
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}
PY

mkdir -p apps/web/app
cat > apps/web/package.json <<'JSON'
{
  "name": "defrag-web",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14",
    "react": "18",
    "react-dom": "18"
  }
}
JSON

cat > apps/web/app/page.tsx <<'TSX'
export default function Home() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 48, fontWeight: 600 }}>
        Understand the patterns shaping your relationships
      </h1>
      <p style={{ marginTop: 24, fontSize: 18, color: "#666" }}>
        Defrag helps you see relationship patterns clearly so you can make better decisions.
      </p>
      <a
        href="/signup"
        style={{
          display: "inline-block",
          marginTop: 32,
          background: "#111",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: 12,
          textDecoration: "none"
        }}
      >
        Create account
      </a>
    </main>
  );
}
TSX

cat > README.md <<'MD'
# Defrag

Defrag is a relational intelligence platform that helps people understand patterns in relationships, families, and teams.

## Local development

1. Copy environment template

   cp .env.example .env

2. Start infrastructure

   docker compose up -d

3. Start API

   cd apps/api
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload

4. Start web

   cd apps/web
   npm install
   npm run dev
MD

mkdir -p .github/workflows
cat > .github/workflows/ci.yml <<'YAML'
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r apps/api/requirements.txt
      - run: python -m compileall apps/api/app
YAML

echo "==> Bootstrap complete"
