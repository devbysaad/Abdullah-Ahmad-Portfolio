# Vercel — frontend ONLY

Do **not** create a Vercel project for `server/`. Express + MongoDB will not run on Vercel serverless.

## Setup

1. One Vercel project for this repo.
2. **Settings → General → Root Directory** → `client`
3. Uses `client/vercel.json` — do **not** add custom Install/Build commands in the dashboard.
4. If you see `npm install --prefix client`, remove it from Vercel settings (that breaks when Root Directory is `client` or `server`).

## Environment variables (Vercel)

| Name | Example |
|------|---------|
| `VITE_API_URL` | `https://your-api.up.railway.app/api` |
| `VITE_SITE_URL` | `https://your-site.vercel.app` |

Never put `JWT_SECRET`, `ADMIN_PASSWORD`, or `MONGODB_URI` here.

## Backend

Deploy `server/` on **Railway** or **Render** — see `server/DEPLOY.md`.

On the API host:

```
CLIENT_URL=https://your-site.vercel.app
```
