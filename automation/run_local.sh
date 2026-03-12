#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${1:-$HOME/DEFRAG.app}"

osascript <<APPLESCRIPT
tell application "Terminal"
    activate
    do script "cd \"$REPO_DIR/apps/api\" && source .venv/bin/activate 2>/dev/null || python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && pkill -f 'uvicorn app.main:app --reload' || true && python -m uvicorn app.main:app --reload"
    do script "cd \"$REPO_DIR/apps/web\" && npm install && pkill -f 'next dev' || true && rm -rf .next/dev && npm run dev"
end tell
APPLESCRIPT

echo "Opened backend and frontend in Terminal."
echo "Open these in your browser:"
echo "  http://127.0.0.1:8000/health"
echo "  http://localhost:3000"
echo "  http://localhost:3000/dashboard"
