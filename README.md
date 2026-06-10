# Abdullah Ahmad Portfolio

Next.js portfolio backed by MongoDB. Content is stored in the database; contact and booking forms send email via Resend.

## Quick start (local)

```bash
cp .env.example .env.local
# Fill in MONGODB_URI, CLIENT_URL, RESEND_*

npm install
npm run seed       # load content into MongoDB
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run seed` | Populate MongoDB from seed files |

## Deploy to Vercel

See **[VERCEL.md](./VERCEL.md)** for the full checklist (Atlas, Resend, env vars, seeding).

**Minimum env vars on Vercel:**

```
MONGODB_URI
CLIENT_URL
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_TO_EMAIL
```

After first deploy, seed your Atlas database:

```bash
MONGODB_URI="mongodb+srv://..." npm run seed
```

## Project layout

```
src/
  app/              Next.js App Router (pages, layout, SEO)
  features/home/    Homepage composition
  components/       UI sections
  lib/              Client + server utilities
  pages/api/        API routes (contact, health, Express bridge)
  server/           Mongoose models, seed scripts, Resend
```

## Content updates

Edit `src/server/seed/aak-content.js` and `src/server/seed/site-content.js`, then:

```bash
npm run seed
```
