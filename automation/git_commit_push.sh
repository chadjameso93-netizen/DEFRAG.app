#!/usr/bin/env bash
set -euo pipefail
REPO_DIR="${1:-$HOME/DEFRAG.app}"
MESSAGE="${2:-Complete Defrag automation update}"

cd "$REPO_DIR"
git add .
git commit -m "$MESSAGE" || true
git push
