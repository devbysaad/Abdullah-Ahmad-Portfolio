# API deployment

## Vercel (serverless)

See root **`VERCEL.md` → section 2**. Root Directory must be **`server`**, Install = `npm install` only.

## Railway (recommended for simplicity)

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub.
2. **Root Directory** → `server`
3. **Start command** → `npm start` (from `railway.toml`)
4. Add env vars (from `.env.example`):

   | Variable | Required |
   |----------|----------|
   | `MONGODB_URI` | Yes (MongoDB Atlas) |
   | `JWT_SECRET` | Yes |
   | `ADMIN_PASSWORD` | Yes |
   | `CLIENT_URL` | Yes — your Vercel URL |
   | `NODE_ENV` | `production` |
   | `PORT` | Railway sets this automatically |
   | `CLOUDINARY_*` | For admin uploads |

5. Generate domain → e.g. `https://your-api.up.railway.app`
6. In **Vercel** (frontend), set `VITE_API_URL=https://your-api.up.railway.app/api`
7. Run seed once locally against Atlas: `cd server && npm run seed`

Health check: `GET /api/health`

## Render

1. New **Web Service** → connect repo.
2. **Root Directory** → `server`
3. **Build** → `npm install`
4. **Start** → `npm start`
5. Same env vars as above.

## Do not mix Root Directory settings

| Vercel project | Root Directory | Install command |
|----------------|----------------|-----------------|
| Frontend | `client` | `npm install` |
| API | `server` | `npm install` |

Never use `npm install --prefix client` on the API project.
