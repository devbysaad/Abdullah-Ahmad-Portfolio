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

- Public site: http://localhost:5173
- API: http://localhost:5001
- Admin (no public link): http://localhost:5173/admin-login

> **macOS:** Port 5000 is often used by AirPlay. This project defaults to **5001**.

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
npm start      # listens on PORT (default 5001)
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

### Split frontend + API (optional)

If the client is on a different domain than the API, set `CLIENT_URL` to the frontend origin and configure the client build to call the API base URL (proxy in dev only). Same-origin deploy avoids CORS and cookie issues.

## Resilience

- Public pages load even if some API endpoints fail; static fallbacks (testimonials, experience copy, work card copy) keep the site usable.
- Offline banner appears when no API calls succeed.

## Rules

- Name: **Abdullah Ahmad** only
- No external project links on the public site — project cards open modals
- Profile fallback: `client/public/abdullah.avif`
