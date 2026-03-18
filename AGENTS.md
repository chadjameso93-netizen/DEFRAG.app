# AGENTS.md

## Scope
These instructions apply to the entire repository unless a deeper `AGENTS.md` overrides them.

## Repo overview
- Monorepo with primary apps under `apps/`.
- `apps/web` is a Next.js app and is the main frontend.
- `apps/api` is a Python API referenced by the root README.
- Supporting material lives in `docs/`, `infra/`, `automation/`, and `defrag_all_in_one_pack/`.

## Working style
- Make focused, minimal changes that match existing patterns.
- Fix root causes instead of layering on temporary patches.
- Avoid unrelated refactors or formatting churn.
- Prefer updating existing files over creating new abstractions unless there is a clear payoff.
- When touching multiple areas, keep frontend, backend, and infra concerns separated.

## File and code conventions
- Check for nested `AGENTS.md` files before editing in subdirectories.
- Follow the style already present in the file you modify.
- Do not rename or move files unless the task requires it.
- Do not add license headers or inline comments unless requested.
- Keep imports, naming, and component structure consistent with nearby code.

## Commands
- Install dependencies before asking the user to run the app.
- Prefer `pnpm` for JavaScript workspace commands.
- Useful frontend commands from `apps/web`:
  - `pnpm install`
  - `pnpm dev` or `pnpm preview:dev`
  - `pnpm lint`
  - `pnpm test`
  - `pnpm build`
- Useful API setup from `apps/api` follows the root `README.md`:
  - `python3 -m venv .venv`
  - `source .venv/bin/activate`
  - `pip install -r requirements.txt`
  - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

## Validation
- Validate the smallest relevant surface first.
- For `apps/web` changes, prefer targeted `pnpm lint`, `pnpm test`, or `pnpm build` only when appropriate to the task.
- For API changes, run the narrowest relevant check or startup command available.
- If you cannot run validation, state that clearly in the handoff.

## Documentation
- Update docs when behavior, setup, or developer workflow changes.
- Keep instructions aligned with the root `README.md` unless intentionally changing the workflow.

## Safety
- Never commit secrets or real environment values.
- Treat infra and deployment files as production-sensitive; change them only when necessary.
- Confirm destructive operations before running them unless explicitly requested.
