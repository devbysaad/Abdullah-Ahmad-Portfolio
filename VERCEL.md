# Vercel deployment

Two separate Vercel projects — **frontend** (`client/`) and **API** (`server/`).

| Project | Root Directory | Example URL |
|---------|----------------|---------------|
| Frontend | `client` | `https://abdullah-ahmad-portfolio-lime.vercel.app` |
| Backend | `server` | `https://abdullah-ahmad-portfolio-backend.vercel.app` |

---

## 1. Frontend (`client`)

**Settings → General → Root Directory:** `client`

**Environment variables** (Production + Preview):

| Variable | Value |
|----------|--------|
| `VITE_API_URL` | `https://abdullah-ahmad-portfolio-backend.vercel.app/api` |
| `VITE_SITE_URL` | Your frontend URL (e.g. `https://abdullah-ahmad-portfolio-lime.vercel.app`) |
| `VITE_EMAILJS_*` | EmailJS keys (see `client/.env.example`) |

Redeploy after changing `VITE_*` vars (they are baked in at build time).

---

## 2. Backend (`server`)

**Settings → General → Root Directory:** `server`  
**Install Command:** `npm install` (not `npm install --prefix client`)

**Environment variables** (Production + Preview):

| Variable | Required | Notes |
|----------|----------|--------|
| `MONGODB_URI` | **Yes** | **MongoDB Atlas** URI — `mongodb+srv://...` — **never** `127.0.0.1` |
| `JWT_SECRET` | **Yes** | Long random string (32+ chars) |
| `ADMIN_PASSWORD` | **Yes** | Admin dashboard password |
| `CLIENT_URL` | **Yes** | Comma-separated frontend origins, e.g. `https://abdullah-ahmad-portfolio-lime.vercel.app,https://abdullah-ahmad-portfolio-sandy.vercel.app` |
| `NODE_ENV` | Recommended | `production` |
| `CLOUDINARY_CLOUD_NAME` | For uploads | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | For uploads | |
| `CLOUDINARY_API_SECRET` | For uploads | |
| `CLOUDINARY_FOLDER` | Optional | e.g. `aakportfolio` |

### MongoDB Atlas (fixes 503 / Preview mode)

1. [cloud.mongodb.com](https://cloud.mongodb.com) → create a free cluster.
2. **Database Access** → database user with password.
3. **Network Access** → **Add IP Address** → `0.0.0.0/0` (required for Vercel serverless).
4. **Connect** → Drivers → copy connection string → replace `<password>` → paste as `MONGODB_URI` in Vercel.
5. Seed the database once from your machine:

   ```bash
   cd server
   # Temporarily point .env MONGODB_URI at Atlas, then:
   npm run seed
   ```

6. **Redeploy** the backend project (Deployments → … → Redeploy).

### Verify

```bash
curl https://abdullah-ahmad-portfolio-backend.vercel.app/api/health
# {"ok":true,"env":"production","mongo":true}

curl https://abdullah-ahmad-portfolio-backend.vercel.app/api/projects
# {"success":true,"data":[...]}
```

If you see `503` with `DATABASE_CONNECTION_FAILED`, the API cannot reach MongoDB — fix `MONGODB_URI` or Atlas network access.

---

## 3. Preview mode banner

The site shows **“Preview mode — saved content”** when **every** API request fails (503). The frontend still uses local fallbacks in `aak.constants.js`, so the page works but admin edits won’t appear until the API is healthy.

---

## 4. GitHub repos

- [devbysaad/Abdullah-Ahmad-Portfolio](https://github.com/devbysaad/Abdullah-Ahmad-Portfolio)
- Link each Vercel project to the same repo with the correct **Root Directory** (`client` vs `server`).
