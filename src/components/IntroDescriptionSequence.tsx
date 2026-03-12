import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type IntroDescriptionSequenceProps = {
  onComplete: () => void;
};

type SequencePhase = 'lines' | 'collapse' | 'prompt' | 'summary' | 'done';

const introFragments = [
  'Angular',
  'React',
  'TypeScript',
  'Scalable UI',
  'Web Apps',
  'Mobile Apps',
  'Product UI',
  'Component Architecture',
  'Firebase',
  'WebSockets',
  'CI/CD',
  'Animations',
  'Responsive Design',
  'Frontend Systems',
  'APIs',
  'Performance',
  'React',
  'TypeScript',
  'Scalable UI',
  'Web Apps',
  'Mobile Apps',
  'Product UI',
  'Component Architecture',
  'Firebase',
  'WebSockets',
  'CI/CD',
  'Animations',
  'Responsive Design',
  'Frontend Systems',
  'APIs',
  'Performance',
  'React',
  'TypeScript',
  'Scalable UI',
  'Web Apps',
  'Mobile Apps',
  'Product UI',
  'Component Architecture',
  'Firebase',
  'WebSockets',
  'CI/CD',
  'Animations',
  'Responsive Design',
  'Frontend Systems',
  'APIs',
  'Performance',
  'React',
  'TypeScript',
  'Scalable UI',
  'Web Apps',
  'Mobile Apps',
  'Product UI',
  'Component Architecture',
  'Firebase',
  'WebSockets',
  'CI/CD',
  'Animations',
  'Responsive Design',
  'Frontend Systems',
  'APIs',
  'Performance',
  'React',
  'TypeScript',
  'Scalable UI',
  'Web Apps',
  'Mobile Apps',
  'Product UI',
  'Component Architecture',
  'Firebase',
  'WebSockets',
  'CI/CD',
  'Animations',
  'Responsive Design',
  'Frontend Systems',
  'APIs',
  'Performance',
];

const promptText =
  'Write a concise summary of Nikola Vujic based on skills and experience.';

const summaryText =
  'Frontend-focused engineer building scalable web apps, polished interfaces, and product-minded experiences with React, TypeScript, and modern frontend architecture.';

export function IntroDescriptionSequence({
  onComplete,
}: IntroDescriptionSequenceProps) {
  const [phase, setPhase] = useState<SequencePhase>('lines');
  const [visibleCount, setVisibleCount] = useState(1);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [typedSummary, setTypedSummary] = useState('');

  useEffect(() => {
    if (phase !== 'lines') {
      return;
    }

    if (visibleCount >= introFragments.length) {
      const timeoutId = window.setTimeout(() => {
        setPhase('collapse');
      }, 250);

      return () => window.clearTimeout(timeoutId);
    }

    const progress = visibleCount / introFragments.length;
    const delay = Math.max(45, 360 - progress * 300);

    const timeoutId = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [phase, visibleCount]);

  useEffect(() => {
    if (phase !== 'collapse') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTypedPrompt('');
      setPhase('prompt');
    }, 550);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'prompt') {
      return;
    }

    if (typedPrompt === promptText) {
      const timeoutId = window.setTimeout(() => {
        setTypedSummary('');
        setPhase('summary');
      }, 450);

      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      const nextCharacter = promptText[typedPrompt.length];
      setTypedPrompt((current) => current + nextCharacter);
    }, 14);

    return () => window.clearTimeout(timeoutId);
  }, [phase, typedPrompt]);

  useEffect(() => {
    if (phase !== 'summary') {
      return;
    }

    if (typedSummary === summaryText) {
      const timeoutId = window.setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 350);

      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      const nextCharacter = summaryText[typedSummary.length];
      setTypedSummary((current) => current + nextCharacter);
    }, 12);

    return () => window.clearTimeout(timeoutId);
  }, [phase, typedSummary, onComplete]);

  const isLinesPhase = phase === 'lines';
  const showAiShell =
    phase === 'collapse' || phase === 'prompt' || phase === 'summary' || phase === 'done';

  const contentMinHeight = isLinesPhase ? '10rem' : '12rem';

  return (
    <div className="max-w-2xl">
      <motion.div
        layout
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'overflow-hidden rounded-[2rem] p-5',
          isLinesPhase
            ? 'border border-(--border)'
            : 'border border-(--accent-border) bg-(--accent-bg)/40',
        ].join(' ')}
      >
        <motion.div
          layout
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: contentMinHeight }}
          className="flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            {isLinesPhase && (
              <motion.div
                key="lines"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-wrap items-start gap-3"
              >
                {introFragments.slice(0, visibleCount).map((fragment, index) => (
                  <motion.span
                    key={`${fragment}-${index}`}
                    initial={{ opacity: 0, y: 8, scale: 0.92, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="h-fit rounded-full border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-sm text-(--text-h)"
                  >
                    {fragment}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {showAiShell && (
              <motion.div
                key="ai-shell"
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col"
              >
                <motion.div
                  layout
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="mb-4 flex items-center gap-2 text-sm text-(--accent)"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-(--accent-border) bg-(--accent-bg) text-xs font-semibold">
                    AI
                  </div>
                  <span className="font-medium">Summary Generator</span>
                </motion.div>

                <motion.div
                  layout
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.25rem] border border-(--border) bg-(--bg) p-4 md:p-5"
                >
                  {phase === 'collapse' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="min-h-[5.5rem] text-left text-sm text-(--text) md:text-base"
                    >
                      Waiting for prompt...
                    </motion.p>
                  )}

                  {phase === 'prompt' && (
                    <p className="min-h-[5.5rem] whitespace-pre-wrap text-left text-sm leading-7 text-(--text-h) md:text-base">
                      {typedPrompt}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.9 }}
                        className="ml-0.5 inline-block text-(--accent)"
                      >
                        |
                      </motion.span>
                    </p>
                  )}

                  {(phase === 'summary' || phase === 'done') && (
                    <p className="min-h-[5.5rem] whitespace-pre-wrap text-left text-sm leading-7 text-(--text-h) md:text-base">
                      {typedSummary}
                      {phase !== 'done' && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 0.9 }}
                          className="ml-0.5 inline-block text-(--accent)"
                        >
                          |
                        </motion.span>
                      )}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}