import { useMemo, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';

const introVideoBaseUrl =
  'https://www.youtube.com/embed/NsJcgmyiYfo?rel=0&modestbranding=1&controls=0&autoplay=0&loop=0&mute=0&enablejsapi=1&origin=';

export default function HeroVideoSection() {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = useMemo(() => {
    if (typeof window === 'undefined') return introVideoBaseUrl;
    const url = new URL(introVideoBaseUrl);
    url.searchParams.set('origin', window.location.origin);
    return url.toString();
  }, []);

  const sendCommand = (command) => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
  };

  const handleToggle = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    sendCommand(nextState ? 'playVideo' : 'pauseVideo');
  };

  return (
    <section className="w-full pt-2 pb-12 md:pb-16">
      <div className="content-wrap px-4" data-name="hero-video-section-root">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeIn}
          className="relative overflow-hidden rounded-[30px] border bg-black"
          style={{ borderColor: 'rgba(34, 34, 34, 0.16)' }}
          data-name="hero-video-frame"
        >
          <div className="aspect-[16/9] w-full">
            <iframe
              ref={iframeRef}
              title="Intro video"
              src={videoUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 md:h-24 md:w-24 rounded-full border-[8px] border-white bg-white text-black inline-flex items-center justify-center transition-colors duration-300 hover:bg-red-600 hover:text-white"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={34} fill="currentColor" />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
