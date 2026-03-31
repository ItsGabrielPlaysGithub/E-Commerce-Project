# Docker/DB Connectivity Changes (2026-03-31)

## Summary
This document records the configuration and runtime fixes applied to stabilize Docker startup, database connectivity, localhost access, and image/static-file serving.

## Files Changed

### 1) docker-compose.yml
- Changed frontend host mapping from `3001:3000` to `3000:3000`.
- Added frontend internal API env:
  - `BACKEND_INTERNAL_URL: http://backend:4000`
- Backend environment now overrides DB target:
  - `DB_HOST: host.docker.internal`
  - `DB_PORT: "3306"`
- Changed backend uploads mount:
  - From named volume: `backend_uploads:/app/uploads`
  - To bind mount: `./backend/uploads:/app/uploads`

Why:
- Ensures frontend is reachable at `http://localhost:3000`.
- Ensures backend uses the host MySQL instance (the one containing existing user data), not the Docker `db` service instance.
- Ensures frontend container can route internal proxy requests to backend service.
- Ensures backend serves the same uploaded files stored in the project folder.

### 2) frontend/next.config.ts
- Added internal backend URL resolution for rewrites:
  - `const backendInternalUrl = process.env.BACKEND_INTERNAL_URL ?? "http://backend:4000"`
- Updated rewrite destinations to use `${backendInternalUrl}` for:
  - `/products/upload-image`
  - `/uploads/:path*`

Why:
- Fixes frontend 500 errors caused by rewrite proxying to `http://localhost:4000` from inside container.
- In container context, `localhost` points to the frontend container itself, causing `ECONNREFUSED`.

### 3) backend/config/db.config.ts
- Added safe fallbacks for DB config values:
  - Host fallback to `localhost`
  - Port fallback to `3306`
  - Username fallback chain: `DB_USER` -> `MYSQL_USER` -> `root`
  - Password fallback chain: `DB_PASSWORD` -> `MYSQL_PASSWORD` -> `MYSQL_ROOT_PASSWORD`
  - Database fallback chain: `DB_NAME` -> `MYSQL_DATABASE`

Why:
- Prevents auth failures when only MySQL-style env vars are present.
- Makes local and containerized setups more resilient.

### 4) backend/package.json
- Updated production start command:
  - From: `node dist/main`
  - To: `node dist/src/main`

Why:
- Matches actual Nest build output path and avoids runtime module-not-found crash.

### 5) backend/Dockerfile
- Removed `npm prune --omit=dev` during image build.

Why:
- Current package layout has some runtime-required packages in devDependencies.
- Pruning caused runtime module-not-found errors (for example `@nestjs/config`).

### 6) .env
- Added: `FRONTEND_ORIGINS=http://localhost:3000,http://localhost:3001`
- `FRONTEND_ORIGIN` was effectively replaced by multi-origin config.

Why:
- Allows backend CORS for both local frontend origins.

## Observed Root Causes
1. Backend initially tried `127.0.0.1:3306` inside container (wrong for Docker service networking).
2. Env mismatch (`DB_PASSWORD` missing while `MYSQL_ROOT_PASSWORD` existed).
3. Backend start script path mismatch (`dist/main` vs `dist/src/main`).
4. Dependency pruning removed packages needed at runtime.
5. Data mismatch between Docker MySQL and host MySQL instances (user was viewing populated host DB while backend was pointed to Docker DB).
6. Frontend rewrite proxy used `localhost:4000` inside container, causing `ECONNREFUSED` and HTTP 500 on `/uploads/*`.
7. Backend initially served uploads from container volume not aligned with host project uploads content, causing 404 for existing files.

## Current Intended Runtime Topology
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- Backend DB target: host MySQL on `host.docker.internal:3306`
- Docker MySQL container remains available on host `3307` but is not the active backend target.
- Frontend rewrite target (inside Docker network): `http://backend:4000`
- Uploaded files source: bind-mounted host directory `./backend/uploads`

## Verification Checklist
1. `docker compose ps`
2. `docker compose logs backend --tail 100`
3. `docker compose logs frontend --tail 100`
4. Confirm backend env inside container:
   - `DB_HOST=host.docker.internal`
   - `DB_PORT=3306`
5. Confirm frontend env inside container:
   - `BACKEND_INTERNAL_URL=http://backend:4000`
6. Confirm backend startup log includes:
   - `Nest application successfully started`
7. Confirm image URL works on both:
   - `http://localhost:4000/uploads/products/<filename>` -> 200
   - `http://localhost:3000/uploads/products/<filename>` -> 200
8. Confirm host DB data exists and is readable by backend credentials.

## Quick Troubleshooting
- Symptom: `/uploads/...` returns 500 on frontend.
  - Check frontend logs for `Failed to proxy http://localhost:4000 ... ECONNREFUSED`.
  - Fix is to use `http://backend:4000` as rewrite destination in Docker.
- Symptom: `/uploads/...` returns 404 on backend.
  - Confirm file exists under `backend/uploads/...` in the project.
  - Confirm backend volume is bind mount `./backend/uploads:/app/uploads`.

## Notes
- If you later move all runtime packages from devDependencies to dependencies, you can safely restore image pruning for smaller production images.
- If you want to switch back to Docker MySQL, change backend `DB_HOST` to `db` and `DB_PORT` to `3306` in compose.