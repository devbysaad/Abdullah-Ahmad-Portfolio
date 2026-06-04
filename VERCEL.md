# Deploy on Vercel

Use **two Vercel projects** (frontend + API) or frontend on Vercel + API on Railway.

---

## 1. Frontend project

| Setting | Value |
|---------|--------|
| Root Directory | `client` |
| Install | *(from `client/vercel.json`)* `npm install` |
| Build | `npm run build` |
| Output | `dist` |

**Clear** any custom commands in the dashboard that use `--prefix client`.

### Env vars (Vercel dashboard)

| Name | Example |
|------|---------|
| `VITE_API_URL` | `https://your-api.vercel.app/api` |
| `VITE_SITE_URL` | `https://your-site.vercel.app` |

---

## 2. API project (serverless)

| Setting | Value |
|---------|--------|
| Root Directory | `server` |
| Install | `npm install` |
| Build | *(none — serverless)* |
| Output | *(none)* |

**Clear** any Install command like `npm install --prefix client`.

Uses `server/vercel.json` + `server/api/index.js` (Express via serverless-http).

### Env vars (Vercel dashboard)

| Name | Required |
|------|----------|
| `MONGODB_URI` | Yes (MongoDB Atlas) |
| `JWT_SECRET` | Yes |
| `ADMIN_PASSWORD` | Yes |
| `CLIENT_URL` | Yes — your **frontend** Vercel URL |
| `CLOUDINARY_CLOUD_NAME` | For admin uploads |
| `CLOUDINARY_API_KEY` | For admin uploads |
| `CLOUDINARY_API_SECRET` | For admin uploads |
| `CLOUDINARY_FOLDER` | Optional |

Do **not** set `NODE_ENV` manually — Vercel sets `VERCEL=1` automatically.

Test after deploy: `https://your-api.vercel.app/api/health`

Then set frontend `VITE_API_URL=https://your-api.vercel.app/api` and redeploy frontend.

---

## Common errors

| Error | Cause | Fix |
|-------|--------|-----|
| `client/client/package.json` | Root = `client` + `--prefix client` in dashboard | Remove custom install command |
| `server/client/package.json` | Root = `server` + wrong install command | Root = `server`, use `npm install` only |
| `fsPath` undefined | Wrong Root Directory or `framework: vite` at repo root | Use tables above; no `--prefix` |
| `25 packages` installed | Root Directory = repo root for API | Set Root Directory to `server` |
| `FUNCTION_INVOCATION_FAILED` | Missing `MONGODB_URI` / `JWT_SECRET` / `ADMIN_PASSWORD` | Add all API env vars |

---

## Alternative: API on Railway

See `server/DEPLOY.md` — often simpler for long-running Node + MongoDB.
