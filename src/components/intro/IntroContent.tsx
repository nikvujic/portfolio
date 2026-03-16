import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import githubIcon from '../../assets/icons/github.svg';
import linkedinIcon from '../../assets/icons/linkedin.png';
import profileImage from '../../assets/images/profile.jpeg';
import { IntroDescriptionSequence } from './IntroDescriptionSequence';

const heroTransition = {
  duration: 0.6,
  ease: 'easeOut' as const,
};

const imageLayoutTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

const IMAGE_REVEAL_DURATION_S = 1.05;
const POST_SUMMARY_IMAGE_DELAY_MS = 1000;
const SOCIAL_REVEAL_DELAY_MS = IMAGE_REVEAL_DURATION_S * 1000 + 250;
const CONTROL_REVEAL_DELAY_MS = 450;

const introNavItems = [
  { label: 'Projects', targetId: 'projects' },
  { label: 'AI Summary', targetId: 'ai-summary' },
  { label: 'Technologies', targetId: 'technologies' },
] as const;

const introLinkItems = [
  {
    label: 'GitHub',
    href: 'https://github.com/nikvujic',
    icon: githubIcon,
    className: 'border-transparent bg-transparent text-(--text-h)',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nikvujic/',
    icon: linkedinIcon,
    className: 'border-transparent bg-transparent text-(--text-h)',
  },
  {
    label: 'CV',
    href: '/cv.pdf',
    className: 'border-(--accent-border) bg-white text-(--text-h) hover:bg-white',
    isTextBadge: true,
  },
] as const;

type IntroContentProps = {
  onComplete: () => void;
  skipAnimation?: boolean;
};

export function IntroContent({
  onComplete,
  skipAnimation = false,
}: IntroContentProps) {
  const [summaryComplete, setSummaryComplete] = useState(skipAnimation);
  const [showImage, setShowImage] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const linksVisible = showImage && showLinks;
  const controlsVisible = showImage && showControls;

  const handleComplete = () => {
    setSummaryComplete(true);
    onComplete();
  };

  useEffect(() => {
    if (!summaryComplete) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowImage(true);
    }, POST_SUMMARY_IMAGE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [summaryComplete]);

  useEffect(() => {
    if (!showImage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowLinks(true);
    }, SOCIAL_REVEAL_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [showImage]);

  useEffect(() => {
    if (!showLinks) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowControls(true);
    }, CONTROL_REVEAL_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [showLinks]);

  const scrollToSection = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="min-h-svh px-4 pt-10 pb-6 sm:px-5 sm:pt-16 sm:pb-8 md:px-12 md:pt-24 md:pb-10">
      <motion.div
        layout
        transition={imageLayoutTransition}
        className="mx-auto grid max-w-6xl items-start gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16"
      >
        <motion.div
          layout="position"
          className="order-2 max-w-3xl transform-gpu will-change-transform lg:order-1"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroTransition, layout: imageLayoutTransition }}
        >
          <motion.h1
            className="-ml-[0.05em] mb-2 text-5xl leading-none tracking-[-0.07em] md:text-7xl lg:text-[5.5rem] transform-gpu will-change-transform"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.08 }}
          >
            Nikola Vujic
          </motion.h1>

          <motion.p
            className="mb-4 text-base font-medium text-(--accent) md:text-lg transform-gpu will-change-transform"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.16 }}
          >
            Full-Stack Engineer (Frontend-Focused)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.24 }}
          >
            <IntroDescriptionSequence
              skipAnimation={skipAnimation}
              onComplete={handleComplete}
            />
          </motion.div>
        </motion.div>

        <AnimatePresence initial={false}>
          {showImage && (
            <motion.div
              layout="position"
              className="order-1 flex items-center justify-start gap-4 transform-gpu will-change-[transform,opacity] lg:order-2 lg:flex-col lg:items-center lg:justify-start" initial={{ opacity: 0, scale: 0.985, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{
                opacity: { duration: 0.5, ease: 'easeOut' },
                scale: { duration: 0.5, ease: 'easeOut' },
                y: { duration: 0.5, ease: 'easeOut' },
                layout: imageLayoutTransition,
              }}
            >
              <motion.img
                src={profileImage}
                alt=""
                className="h-48 w-48 max-[380px]:h-36 max-[380px]:w-36 rounded-full border-2 border-(--accent-border) object-cover shadow-[var(--shadow)] md:h-56 md:w-56 lg:h-64 lg:w-64"
              />

              <AnimatePresence initial={false}>
                {linksVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-3 lg:mt-4 lg:flex-row"
                  >
                    {introLinkItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className={[
                          'flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-200 hover:-translate-y-0.5',
                          item.className,
                        ].join(' ')}
                      >
                        {'icon' in item ? (
                          <img
                            src={item.icon}
                            alt=""
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          <span className="text-sm font-bold tracking-[0.08em]">CV</span>
                        )}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence initial={false}>
        {controlsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex justify-center sm:mt-10"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {introNavItems.map((item) => (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={() => scrollToSection(item.targetId)}
                  className="cursor-pointer rounded-full border border-(--accent-border) bg-(--accent-bg) px-4 py-2.5 text-xs font-medium text-(--text-h) transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
