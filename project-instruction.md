# AAK Portfolio — Project Instructions

> **FIRST STEP (mandatory):** Before writing any code, open and thoroughly analyze **https://uiwithbugvi.com/** in a browser. Study every section, animation, scroll behavior, hover effect, spacing, font size, and layout detail. This site is the exact UI reference — every implementation decision should be validated against it.

---

## Project Overview

Build a personal portfolio for **Abdullah Ahmad** — Senior Full Stack Software Engineer. The UI must be a **1:1 replica** of [uiwithbugvi.com](https://uiwithbugvi.com/), with Abdullah's content swapped in. Where the reference design doesn't suit the available content, layout adjustments are acceptable, but the visual style, animations, and feel must stay consistent.

**Stack:** MERN (MongoDB, Express.js, React, Node.js)
**Styling:** Tailwind CSS
**Animations:** Framer Motion (to match the reference site's smooth transitions)

---

## Confirmed Decisions (from client)

| # | Decision | Confirmed |
|---|---|---|
| UI | Exact 1:1 copy of uiwithbugvi.com | ✅ |
| Hero tagline | "Senior full stack software engineer shipping for 500K users daily" | ✅ |
| Name | Abdullah Ahmad (no AAK branding) | ✅ |
| Stats | "Worked for 30+ global startups and businesses" | ✅ |
| Experience | Show: Tapforce, NPC Labs, Nybble IT (extended to Jan 2025), Dubizzle Labs, Dropella | ✅ |
| Projects | 4 projects, modal/detail page approach (not linking to Devnauts) | ✅ |
| Testimonials | Devnauts client testimonials (source to be confirmed) | ✅ |
| Admin panel | To be included (/admin-login, password-protected) | ✅ |
| Profile photo | Black background AI version (from Iman Fasih) | ✅ |

---

## Site Sections (match uiwithbugvi.com section order)

### 1. Navbar
- Links: Services, Work, About, Testimonials, Contact
- Sticky, minimal, same style as reference

### 2. Hero
- **Headline:** `Senior full stack software engineer shipping for 500K users daily`
- **Name:** Abdullah Ahmad
- **CTA:** "Let's Ship" (confirmed by client: "Let's ship")
- **Photo:** Black background AI version (awaiting from Iman)
- **Sub-stats line:** "Worked for 30+ global startups and businesses"

### 3. Marquee / Scrolling Ticker
- Auto-scrolling strip of project screenshots (same as reference)
- Pull images from the 4 featured projects
- Infinite loop, smooth animation

### 4. Services
- 4 services with descriptions (finalized below):

  | Service | Description |
  |---|---|
  | Full Stack Development | End-to-end web application development, from database architecture to pixel-perfect frontend. |
  | SaaS Development | Building scalable software-as-a-service products with subscription models, dashboards, and integrations. |
  | Mobile App Development | Cross-platform mobile experiences that are fast, intuitive, and production-ready. |
  | Software Maintenance & Consulting | Ongoing support, performance optimization, and technical advisory for existing products. |

### 5. Work / Portfolio
- **4 projects** (Devnauts projects — confirmed by client)
- Each project opens a **modal or detail page** (do NOT link to devnauts.com)
- Per project: name, 1–2 sentence description, tech stack tags, screenshot/preview image, live link (if public)
- Screenshots are **critical** — coordinate with client/team to get these

### 6. About
- Short bio (3–5 sentences, rewrite for senior engineer positioning)
- Key stats: 2+ Years Experience, 30+ Clients, 12+ Applications Built
- **YouTube video** embedded here (Iman's video — delivery end of week)
  - Placement: embedded in About section
  - Mode: click-to-play (not autoplay)

### 7. Work Experience (Timeline)
Show these roles only (trimmed from full history):

1. **Full Stack Engineer** — Tapforce *(Jun 2025 – Present)*
2. **UX Engineer** — NPC Labs *(Feb 2025 – May 2025)*
3. **Full Stack Developer** — Auto Device *(Jan 2025 – May 2025)*
4. **Full-Stack Software Engineer** — Nybble IT *(Aug 2024 – Jan 2025)*
5. **Senior Frontend Developer** — Dropella *(Jun 2024 – Aug 2024)*
6. **Software Engineer** — Dubizzle Labs *(Mar 2024 – May 2024)*

> Internships (Suave, Smart Technology House) can be dropped for a cleaner look.

### 8. Testimonials
- Devnauts client testimonials (confirm source with Abdullah)
- Same card layout as reference site

### 9. Contact
- Method: both email + contact form
- Social links: LinkedIn, GitHub (confirm handles with Abdullah)
- Email: confirm with Abdullah

### 10. Footer
- Minimal — logo, socials, copyright

---

## Admin Panel (`/admin-login`)

- No link anywhere on the public site — access via direct URL only
- Password-protected (single admin, env-stored password)
- Capabilities:
  - Add / Edit / Delete projects
  - Update bio, stats, and services
  - Manage testimonials
  - Update YouTube video URL

**Tech approach:** JWT stored in httpOnly cookie, single admin user seeded in DB via env vars.

---

## MongoDB Collections

```
users          → admin credentials only
projects       → name, description, techStack[], imageUrl, liveUrl, order
testimonials   → name, role, company, text, avatar
services       → title, description, order
about          → bio, stats (years, clients, apps), videoUrl
experience     → company, role, period, description, order
```

---

## Project Structure

```
/client          → React + Vite + Tailwind + Framer Motion
  /src
    /components  → Section components (Hero, Marquee, Services, Work, About, etc.)
    /pages       → Home, Admin
    /hooks
    /lib         → API client

/server          → Node.js + Express
  /routes        → projects, testimonials, about, auth
  /models        → Mongoose schemas
  /middleware    → authMiddleware
  /controllers
  .env
```

---

## Environment Variables (`.env`)

```
MONGODB_URI=
JWT_SECRET=
ADMIN_PASSWORD=
PORT=5000
```

---

## Assets Needed (pending)

- [ ] Profile photo (black bg, AI version) — from Iman Fasih
- [ ] YouTube video link — from Iman Fasih (end of week)
- [ ] 4 project screenshots — coordinate with Abdullah/Devnauts
- [ ] Testimonials text — confirm source with Abdullah
- [ ] Contact email + social handles — confirm with Abdullah
- [ ] Domain decision — keeping `aak-tech.dev` or new?

---

## Notes

- The reference site (uiwithbugvi.com) is built on Framer. We are rebuilding in React — animations should be implemented via **Framer Motion** to match the feel.
- Do not reference or link to devnauts.com anywhere on the public site.
- Abdullah's name is **Abdullah Ahmad** — not AAK, not Abdullah Ahmad AAK.
- Keep the tone premium and senior-engineer-appropriate throughout copy.