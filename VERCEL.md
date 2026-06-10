# Vercel deployment checklist

Deploy from the **repository root** — no Root Directory override.

## 1. MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Network Access** → Add IP `0.0.0.0/0` (required for Vercel serverless)
3. **Database Access** → Create a user with read/write
4. Copy the connection string → `MONGODB_URI`

## 2. Resend

1. Sign up at [resend.com](https://resend.com)
2. Create an API key → `RESEND_API_KEY`
3. **Testing:** use `Portfolio <onboarding@resend.dev>` and set `RESEND_TO_EMAIL` to the email on your Resend account
4. **Production:** verify your domain at [resend.com/domains](https://resend.com/domains), then use `Portfolio <hello@yourdomain.com>`

## 3. Vercel environment variables

In **Project → Settings → Environment Variables**, add:

| Variable | Environments | Example |
|----------|--------------|---------|
| `MONGODB_URI` | Production, Preview, Development | `mongodb+srv://user:pass@cluster.mongodb.net/abdullah-portfolio` |
| `CLIENT_URL` | Production, Preview, Development | `https://abdullahahmad.dev` |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview, Development | `https://abdullahahmad.dev` |
| `RESEND_API_KEY` | Production, Preview, Development | `re_...` |
| `RESEND_FROM_EMAIL` | Production, Preview, Development | `Portfolio <hello@yourdomain.com>` |
| `RESEND_TO_EMAIL` | Production, Preview, Development | `you@example.com` |

> Vercel preview URLs (`*.vercel.app`) are **automatically allowed** for CORS — you don't need to add each preview URL to `CLIENT_URL`.

## 4. Deploy

```bash
# Push to GitHub, then in Vercel:
# New Project → Import repo → Deploy
```

Or via CLI:

```bash
npx vercel --prod
```

## 5. Seed production database (one time)

Run locally against your **Atlas** URI:

```bash
MONGODB_URI="mongodb+srv://..." npm run seed
```

This loads all portfolio content, testimonials, and profile images into MongoDB.

## 6. Verify after deploy

```bash
curl https://YOUR-SITE.vercel.app/api/health
# → {"ok":true,"mongo":true,...}

curl -X POST https://YOUR-SITE.vercel.app/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"type":"message","name":"Test","email":"test@example.com","message":"Hello"}'
# → {"success":true,...}
```

Open the site and test **Book appointment** on the contact section.

## Architecture on Vercel

| Route | Handler | Purpose |
|-------|---------|---------|
| `/` | App Router (SSR) | Homepage from MongoDB |
| `/api/contact` | Dedicated API route | Booking + messages (fast) |
| `/api/health` | Dedicated API route | Health check |
| `/api/portfolio` | Express bridge | Content bundle |
| `/api/media/:id` | Express bridge | Profile & testimonial images |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 503 on homepage | Check `MONGODB_URI` and Atlas network access (`0.0.0.0/0`) |
| Empty sections | Run `npm run seed` against Atlas |
| Booking succeeds but no email | Verify Resend domain + `RESEND_FROM_EMAIL` / `RESEND_TO_EMAIL` |
| CORS error | Set `CLIENT_URL` to your production domain |
