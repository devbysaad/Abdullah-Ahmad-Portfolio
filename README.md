# Abdullah Ahmad — Portfolio

MERN portfolio replicating [uiwithbugvi.com](https://uiwithbugvi.com/) with Abdullah Ahmad's content. React + Vite, Tailwind CSS, Framer Motion, Express, MongoDB.

## Quick start

### Prerequisites

- Node.js 18+
- MongoDB running locally (or Atlas URI)

### Setup

```bash
# Install root + workspaces
npm install
cd server && cp .env.example .env
# Edit server/.env — set MONGODB_URI, JWT_SECRET, ADMIN_PASSWORD

cd server && npm run seed
cd .. && npm install
npm run dev
```

- Public site: http://localhost:5173
- API: http://localhost:5001

> **macOS note:** Port 5000 is used by AirPlay and returns `403 Forbidden`. This project uses **5001** by default.
- Admin (hidden): http://localhost:5173/admin-login

## Admin

- No link on the public site — open `/admin-login` directly
- Password from `ADMIN_PASSWORD` in `server/.env`
- CRUD: projects, services, experience, testimonials, about (bio, stats, video URL, socials)

## Rules

- Name: **Abdullah Ahmad** only
- No Devnauts branding or external project links on the public site
- Project cards open modals — not external URLs
- Animations via Framer Motion, styled to match the reference site

## Production

```bash
npm run build --prefix client
# Serve client/dist with your host; set CLIENT_URL and NODE_ENV=production on the API
```
# Abdullah-Ahmad-Portfolio
