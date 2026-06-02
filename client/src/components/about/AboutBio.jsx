function renderWithHighlights(text, highlights = []) {
  if (!highlights.length) return text;

  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const parts = text.split(new RegExp(`(${pattern})`, 'g'));

  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <span key={`${part}-${i}`} className="font-medium text-white">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/** Parse `**bold**` segments from admin bio lines */
function parseMarkdownBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-medium text-white">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

export default function AboutBio({ paragraphs }) {
  return (
    <div className="flex flex-col gap-5 md:gap-6" data-name="about-bio">
      {paragraphs.map((para, index) => (
        <p
          key={index}
          className="m-0 text-[17px] leading-[1.55] md:text-[20px] md:leading-[1.5]"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {typeof para === 'string'
            ? parseMarkdownBold(para)
            : para.highlights?.length
              ? renderWithHighlights(para.text, para.highlights)
              : parseMarkdownBold(para.text)}
        </p>
      ))}
    </div>
  );
}
