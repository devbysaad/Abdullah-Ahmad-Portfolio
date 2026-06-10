'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';

function buildVideoUrl(embedUrl, origin) {
  const value = embedUrl?.trim();
  if (!value) return '';

  if (value.includes('youtube.com/embed/')) {
    const url = new URL(value);
    url.searchParams.set('rel', '0');
    url.searchParams.set('modestbranding', '1');
    url.searchParams.set('controls', '0');
    url.searchParams.set('enablejsapi', '1');
    url.searchParams.set('origin', origin);
    return url.toString();
  }

  return value;
}

export default function HeroVideoSection({ about }) {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';
  const videoUrl = buildVideoUrl(about?.videoUrl, origin);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loadVideo || !videoUrl) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadVideo, videoUrl]);

  const sendCommand = (command) => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*',
    );
  };

  const handleToggle = () => {
    if (!loadVideo) {
      setLoadVideo(true);
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    sendCommand(nextState ? 'playVideo' : 'pauseVideo');
  };

  if (!videoUrl) return null;

  return (
    <section ref={sectionRef} className="w-full pt-2 pb-10 md:pb-16">
      <div className="content-wrap" data-name="hero-video-section-root">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeIn}
          className="relative overflow-hidden rounded-2xl sm:rounded-[30px] border bg-black"
          style={{ borderColor: 'var(--color-charcoal-a16)' }}
          data-name="hero-video-frame"
        >
          <div className="aspect-[16/9] w-full">
            {loadVideo ? (
              <iframe
                ref={iframeRef}
                title="Intro video"
                src={videoUrl}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-[var(--color-surface-darker)]"
                aria-hidden
              />
            )}
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className="absolute left-1/2 top-1/2 flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-white bg-white text-black transition-colors duration-300 hover:bg-primary hover:text-white sm:border-[8px]"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={34} fill="currentColor" />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
