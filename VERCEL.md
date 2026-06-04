# Vercel deployment

Frontend only. Host the API on Railway, Render, or Fly (`server/`).

## Choose one setup

### A — Root Directory: `client` (recommended)

1. Vercel → **Settings → General → Root Directory** → `client`
2. Uses `client/vercel.json` (`npm install`, output `dist`)
3. Do **not** override Install/Build in the dashboard

### B — Root Directory: empty (repo root)

1. Leave Root Directory blank
2. Uses root `vercel.json` (`npm install --prefix client`, output `client/dist`)

## Environment variables (Vercel dashboard)

| Name | Example |
|------|---------|
| `VITE_API_URL` | `https://your-api.up.railway.app/api` |
| `VITE_SITE_URL` | `https://your-site.vercel.app` |

Never add `JWT_SECRET`, `ADMIN_PASSWORD`, or `MONGODB_URI` here.

## API host

On Railway/Render, set:

```
CLIENT_URL=https://your-site.vercel.app
```

Redeploy Vercel after changing env vars.
