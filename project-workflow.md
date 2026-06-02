# AAK Portfolio — Development Workflow

> **FIRST STEP (mandatory):** Open and analyze **https://uiwithbugvi.com/** before starting any phase. Every layout decision, animation, section order, and spacing detail should be cross-referenced against this site. It is the exact UI reference — not a mood board.

---

## Team

| Role | Person |
|---|---|
| Lead Developer | Saad (DevNauts) |
| Video/Media | Iman Fasih |
| Client | Abdullah Ahmad (CEO) |

---

## Timeline Overview

| Phase | What | Target |
|---|---|---|
| Phase 0 | Kickoff + content gathering | Week 1 (Mon–Wed) |
| Phase 1 | Project setup + backend | Week 1 (Wed–Fri) |
| Phase 2 | Frontend — static UI | Week 2 (Mon–Wed) |
| Phase 3 | Frontend — dynamic + admin | Week 2 (Wed–Fri) |
| Phase 4 | Integration + polish | Week 3 (Mon–Tue) |
| Phase 5 | Review + launch | Week 3 (Wed–Thu) |

---

## Phase 0 — Kickoff & Content Gathering

**Goal:** Collect all remaining assets and locked decisions before a single line of code is written.

Tasks:
- [ ] Abdullah confirms: 4 project names + descriptions + screenshots
- [ ] Abdullah confirms: contact email + LinkedIn + GitHub handles
- [ ] Abdullah confirms: Devnauts testimonials source
- [ ] Abdullah confirms: domain — keep `aak-tech.dev` or new?
- [ ] Iman delivers: hi-res profile photo (black bg, AI version)
- [ ] Iman delivers: YouTube video URL (end of week)
- [ ] Saad: analyze uiwithbugvi.com fully — document all sections, animations, and spacing in a quick internal note before coding starts

**Blocker:** Do not start Phase 1 without the profile photo and at least 2 project screenshots. The marquee and hero sections depend on these.

---

## Phase 1 — Project Setup + Backend

**Goal:** Scaffold full MERN project, get all API routes working, seed initial data.

### Setup
```bash
# Root structure
/aak-portfolio
  /client   → React + Vite
  /server   → Node + Express
```

### Server Tasks
- [ ] Init Express app, connect MongoDB
- [ ] Create Mongoose models: `Project`, `Testimonial`, `Service`, `About`, `Experience`, `User`
- [ ] Build REST routes:
  - `GET /api/projects`
  - `GET /api/testimonials`
  - `GET /api/services`
  - `GET /api/about`
  - `GET /api/experience`
  - `POST /api/auth/login` (admin only)
  - `POST/PUT/DELETE /api/admin/*` (protected)
- [ ] Auth middleware (JWT, httpOnly cookie)
- [ ] Seed script with Abdullah's confirmed content
- [ ] Test all routes in Postman/Thunder Client

### Client Setup
- [ ] Init Vite + React
- [ ] Install: Tailwind CSS, Framer Motion, Axios, React Router
- [ ] Setup API client (`/lib/api.js`)
- [ ] Define routes: `/` (home), `/admin`

---

## Phase 2 — Frontend: Static UI

**Goal:** Build the full visual layout matching uiwithbugvi.com, with placeholder/static content first. Get the look right before wiring data.

> Keep uiwithbugvi.com open in a browser tab throughout this phase.

### Components to build (in order):
- [ ] `Navbar` — sticky, links to sections
- [ ] `Hero` — headline, name, photo, CTA, stats line
- [ ] `Marquee` — infinite auto-scroll strip of project images
- [ ] `Services` — 4 service cards with descriptions
- [ ] `Work` — 4 project cards, modal/detail page on click
- [ ] `About` — bio, stats, YouTube embed
- [ ] `Experience` — trimmed timeline (6 roles)
- [ ] `Testimonials` — client review cards
- [ ] `Contact` — form + social links
- [ ] `Footer` — minimal

### Checklist per component:
- Matches reference spacing and layout
- Framer Motion animations match reference (scroll-in, hover effects)
- Responsive (mobile + desktop)
- No Devnauts branding visible

---

## Phase 3 — Dynamic Data + Admin Panel

**Goal:** Connect frontend to live API. Build `/admin-login` panel.

### Data connection:
- [ ] Replace all static content with API calls
- [ ] Handle loading and error states
- [ ] Marquee pulls real project images from DB

### Admin Panel (`/admin-login`):
- [ ] Password input → POST `/api/auth/login` → JWT cookie set
- [ ] Protected dashboard — no public link, direct URL only
- [ ] CRUD for: Projects, Testimonials, Services, About (bio + stats + video URL), Experience
- [ ] Image upload for projects (use Cloudinary or simple URL input — confirm preference)
- [ ] Logout button

---

## Phase 4 — Integration & Polish

**Goal:** Plug in final assets, fine-tune animations, cross-browser/device testing.

- [ ] Swap in final profile photo from Iman
- [ ] Embed YouTube video URL in About section
- [ ] Final project screenshots in marquee + cards
- [ ] Animation timing review against uiwithbugvi.com
- [ ] Mobile responsiveness pass
- [ ] SEO meta tags (title, description, og:image)
- [ ] Performance check (Lighthouse — target 90+)
- [ ] Cross-browser test (Chrome, Safari, Firefox)

---

## Phase 5 — Review & Launch

- [ ] Share staging link with Abdullah for review
- [ ] Address feedback (max 1 round of revisions before go-live)
- [ ] Point domain to hosting (Vercel recommended)
- [ ] Set production env vars
- [ ] Final smoke test on live URL
- [ ] Confirm admin panel works on production
- [ ] Hand off `/admin-login` credentials to Abdullah

---

## Content Status Tracker

| Asset | Owner | Status |
|---|---|---|
| Profile photo (black bg AI version) | Iman Fasih | ⬜ Pending |
| YouTube video URL | Iman Fasih | ⬜ Pending (end of week) |
| 4 project screenshots | Abdullah / DevNauts | ⬜ Pending |
| 4 project descriptions | Abdullah | ⬜ Pending |
| Testimonials text | Abdullah (DevNauts) | ⬜ Pending |
| Contact email | Abdullah | ⬜ Pending |
| LinkedIn / GitHub handles | Abdullah | ⬜ Pending |
| Domain decision | Abdullah | ⬜ Pending |

---

## Key Rules for the Dev

1. **Analyze uiwithbugvi.com first.** Every section, every animation, every spacing detail.
2. **No Devnauts links or branding** anywhere on the public-facing site.
3. **Name is Abdullah Ahmad** — not AAK, not "Abdullah Ahmad AAK".
4. **Project modals/detail pages** must not route to any external company page.
5. **Admin panel is hidden** — no button, no link, access via `/admin-login` URL only.
6. **YouTube video** goes in the About section, click-to-play.
7. Don't ship without all 4 project screenshots — the marquee is the visual centerpiece.