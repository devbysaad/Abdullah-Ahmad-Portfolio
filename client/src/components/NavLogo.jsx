/**
 * Abdullah Ahmad — navbar logo mark + wordmark.
 * Mark: geometric "A" letterform, black square, orange crossbar.
 * Wordmark: "Abdullah Ahmad" in display font.
 */
export default function NavLogo() {
  return (
    <a
      href="#"
      className="nav-logo"
      aria-label="Abdullah Ahmad — home"
      data-name="nav-logo"
    >
      {/* ── Mark ── */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="nav-logo-mark"
      >
        {/* Rounded black background */}
        <rect width="34" height="34" rx="8" fill="#111011" />

        {/* Left stroke of A */}
        <line
          x1="17" y1="7"
          x2="8"  y2="27"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* Right stroke of A */}
        <line
          x1="17" y1="7"
          x2="26" y2="27"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* Crossbar — orange accent */}
        <line
          x1="11.5" y1="20"
          x2="22.5" y2="20"
          stroke="#FE4B01"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>

    </a>
  );
}
