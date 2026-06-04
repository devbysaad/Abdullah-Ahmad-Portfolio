# Abdullah Ahmad — Portfolio

MERN portfolio inspired by [uiwithbugvi.com](https://uiwithbugvi.com/) with Abdullah Ahmad's content. React + Vite, Tailwind CSS, Framer Motion, Express, MongoDB.

## Quick start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
npm run install:all
cp server/.env.example server/.env
# Edit server/.env — MONGODB_URI, JWT_SECRET, ADMIN_PASSWORD, optional Cloudinary

cd server && npm run seed
npm run dev
```

- Public site: http://localhost:3000
- API (dev): http://localhost:3001 — proxied via `/api` while Vite runs
- Admin: http://localhost:3000/admin-login

> **Dev:** Vite uses port **3000**; Express runs on **3001** so both can run together. **Production** (`npm start`) serves everything on **3000**.

## Admin

- Password from `ADMIN_PASSWORD` in `server/.env`
- CRUD: projects, services, experience, testimonials, about (bio, stats, video, profile image via Cloudinary)
- Saving About in admin preserves `whyMeIntro`, `highlights`, and `skills` from the database

## Production (single host — recommended)

Build the client, then run the API in production mode. Express serves `client/dist` and `/api` on one port.

```bash
npm run build
# Set in server/.env (or host env):
#   NODE_ENV=production
#   MONGODB_URI=<atlas-uri>
#   JWT_SECRET=<long-random-string>
#   ADMIN_PASSWORD=<strong-password>
#   CLIENT_URL=https://your-domain.com
#   CLOUDINARY_* (for admin uploads)

npm run seed   # once, against production DB
npm start      # listens on PORT (default 3000)
```

### Environment checklist

| Variable | Purpose |
|----------|---------|
| `NODE_ENV=production` | Enables static SPA, secure cookies (HTTPS), trust proxy |
| `CLIENT_URL` | Allowed CORS origin(s); comma-separated for preview + prod |
| `MONGODB_URI` | Atlas or hosted MongoDB |
| `JWT_SECRET` | Admin session signing |
| `ADMIN_PASSWORD` | Admin login |
| `CLOUDINARY_*` | Profile/project image uploads in admin |
| `COOKIE_SECURE=false` | Only if testing production build on `http://localhost` |

### Health check

`GET /api/health` returns `{ ok, env, mongo }` for uptime monitors.

### Vercel (frontend + env)

**Do not deploy `server/` to Vercel** — use Railway/Render/Fly for the API.

1. Connect the repo; root `vercel.json` builds `client/dist`.
2. Host the API elsewhere (`npm start` in `server/`).
3. **Local:** copy `client/.env.example` → `client/.env.local` and set `VITE_API_URL`.
4. **Vercel → Settings → Environment Variables** (Production + Preview):

   | Variable | Example |
   |----------|---------|
   | `VITE_API_URL` | `https://your-api.up.railway.app/api` |
   | `VITE_SITE_URL` | `https://your-site.vercel.app` (optional) |

5. On the **API host**, set `CLIENT_URL` to your Vercel URL(s).

Only `VITE_*` vars belong in the frontend — they are baked into the build. Never put `JWT_SECRET`, `ADMIN_PASSWORD`, or `MONGODB_URI` in the client env.

### Split frontend + API (optional)

If the client is on a different domain than the API, set `CLIENT_URL` on the server and `VITE_API_URL` in the Vercel project settings (build-time only). Same-origin deploy (single host) needs no frontend env.

## Resilience

- Public pages load even if some API endpoints fail; static fallbacks (testimonials, experience copy, work card copy) keep the site usable.
- Offline banner appears when no API calls succeed.

## Rules

- Name: **Abdullah Ahmad** only
- No external project links on the public site — project cards open modals
- Profile fallback: `client/public/abdullah.avif`
