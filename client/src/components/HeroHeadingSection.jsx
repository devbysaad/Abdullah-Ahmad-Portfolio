import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';
import TelegramIcon from './hero/TelegramIcon';

const UNDERLINE_SYMBOL = 'svg11809037360';

export default function HeroHeadingSection() {
  return (
    <section className="w-full pt-4 pb-6 md:pt-6 md:pb-10" data-name="hero-heading-section-root">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <symbol id={UNDERLINE_SYMBOL} viewBox="0 0 157 21">
            <path
              d="M 130.23 16.539 C 131.221 13.74 98.752 6.956 95.785 6.464 C 71.739 2.481 48.042 2.24 23.943 5.672 C 16.99 6.663 10.15 8.342 3.298 9.792 C 1.04 10.27 3.231 10.261 4.412 10.427 C 14.912 11.909 25.43 13.261 36.002 14.24 C 66.83 17.093 97.718 17.68 128.659 18.489 C 137.063 18.709 145.815 19.018 154.176 18.11 C 155.079 18.012 155.246 17.754 154.341 17.328 C 150.668 15.602 146.349 14.527 142.365 13.66 C 116.129 7.952 88.69 6.852 61.846 8.522 C 51.806 9.147 41.521 9.994 31.67 12.003 C 30.52 12.237 29.373 12.489 28.225 12.732 C 27.041 12.983 30.555 13.421 31.764 13.539 C 53.179 15.633 74.907 16.573 96.436 16.388 C 111.175 16.26 126.484 15.837 140.918 12.783 C 141.774 12.602 153.008 10.961 149.263 9.275 C 145.349 7.513 140.837 6.913 136.581 6.316 C 122.725 4.371 108.716 3.075 94.713 2.501 C 76.459 1.751 58.502 3.05 40.339 4.484 C 36.723 4.77 32.594 5.779 29.019 5.469"
              fill="transparent"
              strokeWidth="3.52"
              stroke="#FE4B01"
              strokeLinecap="round"
              strokeMiterlimit="10"
            />
          </symbol>
        </defs>
      </svg>

      <div className="content-wrap px-4 md:px-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeIn}
          className="mx-auto flex max-w-[900px] flex-col items-center text-center"
          style={{ gap: '24px' }}
          data-name="hero-heading-content"
        >
          <div
            className="inline-flex items-center justify-center overflow-hidden rounded-[100px]"
            style={{
              backgroundColor: '#f1f1f1',
              padding: '3px 12px',
              gap: '10px',
            }}
            data-name="hero-greeting-pill"
          >
            <p
              className="m-0 font-semibold"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                lineHeight: '24px',
                color: 'rgb(48, 48, 48)',
              }}
            >
              👋 Hello, I&apos;m Abdullah Ahmad, your partner in design!
            </p>
          </div>

          <div className="flex w-full flex-col items-center" style={{ gap: '4px' }} data-name="hero-headlines">
            <h1
              className="m-0 font-semibold"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.25px',
                lineHeight: '1.04',
                color: 'rgb(117, 117, 117)',
              }}
            >
              Every good idea starts with
            </h1>

            <div className="relative inline-block" data-name="hero-main-heading-wrap">
              <h2
                className="m-0 font-semibold text-black"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: 600,
                  letterSpacing: '-0.25px',
                  lineHeight: '1.04',
                }}
              >
                great design.
              </h2>
              <svg
                viewBox="0 0 157 21"
                className="pointer-events-none absolute left-1/2 -bottom-2 h-[18px] w-[min(235px,72%)] -translate-x-1/2 md:-bottom-3 md:h-[22px]"
                aria-hidden="true"
              >
                <use href={`#${UNDERLINE_SYMBOL}`} xlinkHref={`#${UNDERLINE_SYMBOL}`} />
              </svg>
            </div>
          </div>

          <p
            className="m-0 max-w-[470px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: '1.55',
              color: 'rgba(0, 0, 0, 0.6)',
            }}
            data-name="hero-subcopy"
          >
            I help businesses{' '}
            <strong className="font-semibold text-black">define, design, and deliver</strong> the right
            product for the customer.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3" data-name="hero-heading-cta-row">
            <a
              href="#contact"
              className="hero-cta-primary inline-flex items-center justify-center rounded-[100px] bg-black px-8 py-3.5 text-[18px] font-semibold text-white transition-colors duration-300 hover:bg-[#fe4b01]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Let&apos;s talk
            </a>
            <a
              href="#contact"
              className="hero-cta-chat inline-flex items-center gap-2.5 rounded-[100px] px-5 py-3 text-[18px] font-semibold text-black transition-opacity hover:opacity-90"
              style={{
                fontFamily: 'var(--font-display)',
                backgroundColor: 'rgb(235, 235, 235)',
              }}
            >
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#229ED9]"
                style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}
              >
                <TelegramIcon className="h-5 w-5" />
              </span>
              Chat
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
