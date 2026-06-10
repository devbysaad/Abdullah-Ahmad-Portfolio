/**
 * Custom card visuals — every element comes from real Abdullah Ahmad work
 * sourced from https://www.aak-tech.dev/
 * Each visual fits in the 160×104px card image area.
 */

/* ── Card 1: Web apps (green) ─────────────────────────
   Showcases the 3 biggest client platforms Abdullah shipped.
   Zameen.com & Bayut.com = Dubizzle Labs (unicorn $1B+ co).
   Dropella = longest engagement (1+ year). */
export function VisualWebApps() {
  const clients = [
    { name: 'Zameen.com', tag: 'PropTech · 500K users' },
    { name: 'Bayut.com',  tag: '60K+ verified agents' },
    { name: 'Dropella',   tag: '1+ yr · e-commerce' },
  ];

  return (
    <div className="cv-web-list">
      {clients.map((c) => (
        <div key={c.name} className="cv-web-row">
          <span className="cv-web-dot" />
          <div>
            <p className="cv-web-name">{c.name}</p>
            <p className="cv-web-tag">{c.tag}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Card 2: SaaS builds (yellow) ──────────────────────
   Mini "billing" UI mockup referencing Stripe integration
   Abdullah did at Dropella (trial flows) and Auto Device
   (plan management + real-time usage tracking). */
export function VisualSaaS() {
  return (
    <div className="cv-saas-card">
      <div className="cv-saas-header">
        <span className="cv-saas-plan">Pro Plan</span>
        <span className="cv-saas-badge">● Active</span>
      </div>
      <p className="cv-saas-sub">Stripe · Supabase billing</p>
      <div className="cv-saas-bar-wrap">
        <div className="cv-saas-bar" style={{ width: '74%' }} />
      </div>
      <div className="cv-saas-projects">
        {['Dropella', 'DeltaTest', 'Basemint'].map((p) => (
          <span key={p} className="cv-saas-chip">{p}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Card 3: Full stack (dark red) ─────────────────────
   The exact tech stack from Abdullah's skills list on
   aak-tech.dev — curated to the most recognisable ones. */
export function VisualFullStack() {
  const stack = ['Next.js', 'React', 'Node.js', 'TypeScript', 'SvelteKit', 'MongoDB'];

  return (
    <div className="cv-stack-grid">
      {stack.map((t) => (
        <span key={t} className="cv-stack-chip">{t}</span>
      ))}
    </div>
  );
}

/* ── Card 4: Scale & lead (purple) ─────────────────────
   Real numbers from aak-tech.dev:
   • "Led a team of 10 developers" — Dropella
   • "40% performance boost" — Zameen.com cart (Redis)
   • "60K+ users" — REGA integration, Bayut.com */
export function VisualLead() {
  const stats = [
    { value: '10', label: 'devs led' },
    { value: '40%', label: 'perf boost' },
    { value: '60K+', label: 'users' },
  ];

  return (
    <div className="cv-lead-grid">
      {stats.map((s) => (
        <div key={s.label} className="cv-lead-stat">
          <span className="cv-lead-value">{s.value}</span>
          <span className="cv-lead-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
