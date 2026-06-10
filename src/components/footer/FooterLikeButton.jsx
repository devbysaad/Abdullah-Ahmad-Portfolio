import { useCallback, useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import {
  FOOTER_DEFAULT_LIKES,
  FOOTER_LIKED_STORAGE_KEY,
  FOOTER_LIKES_STORAGE_KEY,
} from './footer.constants';

function readCount() {
  try {
    const raw = localStorage.getItem(FOOTER_LIKES_STORAGE_KEY);
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : FOOTER_DEFAULT_LIKES;
  } catch {
    return FOOTER_DEFAULT_LIKES;
  }
}

function readLiked() {
  try {
    return localStorage.getItem(FOOTER_LIKED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function FooterLikeButton() {
  const [count, setCount] = useState(FOOTER_DEFAULT_LIKES);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setCount(readCount());
    setLiked(readLiked());
  }, []);

  const handleLike = useCallback(() => {
    if (liked) return;
    const next = count + 1;
    setCount(next);
    setLiked(true);
    setPulse(true);
    try {
      localStorage.setItem(FOOTER_LIKES_STORAGE_KEY, String(next));
      localStorage.setItem(FOOTER_LIKED_STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setPulse(false), 400);
  }, [count, liked]);

  return (
    <button
      type="button"
      className={`footer-like-btn${liked ? ' footer-like-btn--liked' : ''}${pulse ? ' footer-like-btn--pulse' : ''}`}
      onClick={handleLike}
      aria-pressed={liked}
      aria-label={liked ? `You liked this site (${count} likes)` : 'Like this website'}
      data-name="footer-like-btn"
    >
      <ThumbsUp size={16} strokeWidth={2} aria-hidden="true" />
      <span>Like</span>
      <span className="footer-like-count">{count}</span>
    </button>
  );
}
