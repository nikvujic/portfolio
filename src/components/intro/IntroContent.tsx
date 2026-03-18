import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Github, Linkedin, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import profileImage from '../../assets/images/profile.jpeg';
import { IntroDescriptionSequence } from './IntroDescriptionSequence';

// ─── Timing constants ─────────────────────────────────────────────────────────

const IMAGE_REVEAL_DURATION_S = 1.05;
const POST_SUMMARY_IMAGE_DELAY_MS = 1000;
const SOCIAL_REVEAL_DELAY_MS = IMAGE_REVEAL_DURATION_S * 1000 + 250;
const CONTROL_REVEAL_DELAY_MS = 450;

// ─── Transition presets ───────────────────────────────────────────────────────

const EASE_SPRING = [0.22, 1, 0.36, 1] as const;

const heroTransition = {
  duration: 0.6,
  ease: 'easeOut' as const,
};

const imageLayoutTransition = {
  duration: 0.9,
  ease: EASE_SPRING,
};

const revealTransition = {
  duration: 0.45,
  ease: EASE_SPRING,
};

// ─── Nav / link data ──────────────────────────────────────────────────────────

const introNavItems = [
  { label: 'Projects', targetId: 'projects' },
  { label: 'AI Summary', targetId: 'ai-summary' },
  { label: 'Technologies', targetId: 'technologies' },
] as const;

const introLinkItems = [
  { label: 'GitHub',   href: 'https://github.com/nikvujic',             icon: Github   },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikvujic/',   icon: Linkedin },
  { label: 'CV',       href: '/cv.pdf',                                 icon: FileText },
] as const satisfies ReadonlyArray<{ label: string; href: string; icon: LucideIcon }>;

// ─── Types ────────────────────────────────────────────────────────────────────

type IntroContentProps = {
  onComplete: () => void;
  skipAnimation?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function IntroContent({ onComplete, skipAnimation = false }: IntroContentProps) {
  const [summaryComplete, setSummaryComplete] = useState(skipAnimation);
  const [showImage,    setShowImage]    = useState(false);
  const [showLinks,    setShowLinks]    = useState(false);
  const [showControls, setShowControls] = useState(false);

  const linksVisible    = showImage && showLinks;
  const controlsVisible = showImage && showControls;

  // Reveal image after the text sequence finishes
  useEffect(() => {
    if (!summaryComplete) return;
    const id = window.setTimeout(() => setShowImage(true), POST_SUMMARY_IMAGE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [summaryComplete]);

  // Reveal social links shortly after image appears
  useEffect(() => {
    if (!showImage) return;
    const id = window.setTimeout(() => setShowLinks(true), SOCIAL_REVEAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [showImage]);

  // Reveal nav controls after links
  useEffect(() => {
    if (!showLinks) return;
    const id = window.setTimeout(() => setShowControls(true), CONTROL_REVEAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [showLinks]);

  const handleComplete = () => {
    setSummaryComplete(true);
    onComplete();
  };

  const scrollToSection = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-svh px-4 pt-10 pb-6 sm:px-5 sm:pt-16 sm:pb-8 md:px-12 md:pt-24 md:pb-10">
      <motion.div
        layout
        transition={imageLayoutTransition}
        className="mx-auto grid max-w-6xl items-start gap-6 transform-gpu will-change-transform sm:gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16"
      >
        {/* ── Left: text content ── */}
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
            className="mb-4 ml-px text-base font-medium text-(--accent) md:text-lg transform-gpu will-change-transform"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: 0.16 }}
          >
            Frontend Engineer expanding into Full-Stack development and AI-powered features
          </motion.p>

          <motion.div
            className="transform-gpu will-change-transform"
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

        {/* ── Right: profile image + social links ── */}
        <AnimatePresence initial={false}>
          {showImage && (
            <motion.div
              layout="position"
              className="order-1 flex items-center justify-start gap-6 transform-gpu will-change-transform lg:order-2 lg:flex-col lg:items-center lg:justify-start lg:gap-4"
              initial={{ opacity: 0, scale: 0.985, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{
                opacity: { duration: 0.5, ease: 'easeOut' },
                scale:   { duration: 0.5, ease: 'easeOut' },
                y:       { duration: 0.5, ease: 'easeOut' },
                layout:  imageLayoutTransition,
              }}
            >
              <motion.img
                src={profileImage}
                alt="Nikola Vujic"
                className="h-48 w-48 max-[380px]:h-36 max-[380px]:w-36 rounded-full border-2 border-(--accent-border) object-cover shadow-[var(--shadow)] transform-gpu will-change-transform md:h-56 md:w-56 lg:h-64 lg:w-64"
              />

              <AnimatePresence initial={false}>
                {linksVisible && (
                  <motion.div
                    className="flex flex-col gap-4 transform-gpu will-change-transform lg:mt-4 lg:flex-row lg:gap-5"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={revealTransition}
                  >
                    {introLinkItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--accent-border) bg-(--accent-bg)/75 text-(--text-h) shadow-[var(--shadow)] transform-gpu will-change-transform transition-[transform,border-color,background-color] duration-200 hover:[transform:translateY(-2px)] hover:border-(--accent) hover:bg-(--accent-bg)"
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.9} />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Bottom: nav buttons ── */}
      <AnimatePresence initial={false}>
        {controlsVisible && (
          <motion.div
            className="mt-12 flex justify-center transform-gpu will-change-transform sm:mt-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SPRING }}
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {introNavItems.map((item) => (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={() => scrollToSection(item.targetId)}
                  className="cursor-pointer rounded-full border border-(--accent-border) bg-(--accent-bg) px-4 py-2.5 text-xs font-medium text-(--text-h) transform-gpu will-change-transform transition-[transform,border-color] duration-200 hover:[transform:translateY(-2px)] hover:border-(--accent) sm:px-5 sm:py-3 sm:text-sm"
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
