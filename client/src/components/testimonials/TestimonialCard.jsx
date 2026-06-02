import {
  formatTestimonialRole,
  resolveTestimonialAvatar,
  splitTestimonialParagraphs,
} from './testimonials.constants';

export default function TestimonialCard({ testimonial }) {
  const paragraphs = splitTestimonialParagraphs(testimonial.text);
  const subtitle = formatTestimonialRole(testimonial.role, testimonial.company);
  const avatarSrc = resolveTestimonialAvatar(testimonial.avatar);

  return (
    <article className="testimonial-card" data-name="testimonial-card">
      <div className="testimonial-card-quote" data-name="testimonial-quote">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="testimonial-card-paragraph">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="testimonial-card-divider" aria-hidden="true" data-name="testimonial-divider" />

      <footer className="testimonial-card-author" data-name="testimonial-author">
        <div className="testimonial-card-avatar-wrap" data-name="testimonial-avatar">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="testimonial-card-avatar"
            />
          ) : (
            <div className="testimonial-card-avatar testimonial-card-avatar--placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="testimonial-card-meta">
          <p className="testimonial-card-name">{testimonial.name}</p>
          {subtitle ? <p className="testimonial-card-role">{subtitle}</p> : null}
        </div>
      </footer>
    </article>
  );
}
