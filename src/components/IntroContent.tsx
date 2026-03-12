import { motion } from 'framer-motion';
import profileImage from '../assets/images/profile.jpeg';
import { IntroDescriptionSequence } from './IntroDescriptionSequence';

const heroTransition = {
  duration: 0.6,
  ease: 'easeOut' as const,
};

type IntroContentProps = {
  onComplete: () => void;
};

export function IntroContent({ onComplete }: IntroContentProps) {
  return (
    <section className="min-h-svh px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <motion.div
          className="max-w-3xl transform-gpu will-change-transform"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
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
            <IntroDescriptionSequence onComplete={onComplete} />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end transform-gpu will-change-transform"
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
        >
          <motion.img
            src={profileImage}
            alt="Nikola Vujic"
            className="h-48 w-48 rounded-full border-2 border-(--accent-border) object-cover shadow-[var(--shadow)] md:h-56 md:w-56 lg:h-64 lg:w-64"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>
      </div>
    </section>
  );
}