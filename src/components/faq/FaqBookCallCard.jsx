import { getProfileImageUrl } from '../../lib/mediaUrl';

export default function FaqBookCallCard({ profileImageUrl }) {
  const src = getProfileImageUrl(profileImageUrl);

  return (
    <div className="faq-bookcall-card" data-name="faq-bookcall-card">
      <svg
        className="faq-bookcall-arrow"
        viewBox="0 0 140 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 88 C45 20 95 35 128 52"
          stroke="var(--color-gray-d4)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M128 52 L128 68 M128 52 L112 52"
          stroke="var(--color-gray-d4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-[1] mt-2 shrink-0">
        <img src={src} alt="Abdullah Ahmad" className="faq-bookcall-avatar" loading="lazy" />
        <span className="faq-bookcall-status" aria-hidden="true" />
      </div>

      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center text-center">
        <p className="faq-bookcall-line">In a rush?</p>
        <p className="faq-bookcall-line">Book a short call</p>
      </div>

      <a href="#contact" className="faq-bookcall-cta relative z-[1]">
        Let&apos;s talk
      </a>
    </div>
  );
}
