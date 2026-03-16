import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { introFragments } from '../../data/introFragments';

type IntroDescriptionSequenceProps = {
  onComplete: () => void;
  skipAnimation?: boolean;
};

type SequencePhase =
  | 'lines'
  | 'collapse'
  | 'promptPause'
  | 'prompt'
  | 'promptClearPause'
  | 'summary'
  | 'done';

const INITIAL_LIST_PAUSE_MS = 3000;
const NORMAL_LIST_DELAY_MS = 580;
const SHORT_LIST_PAUSE_MS = 2500;
const MEDIUM_LIST_PAUSE_MS = 1200;
const MEDIUM_LIST_DELAY_MS = 280;
const QUICK_LIST_DELAY_MS = 210;
const FAST_LIST_DELAY_MS = 120;
const VERY_FAST_LIST_DELAY_MS = 20;
const PRE_PROMPT_PAUSE_MS = 3000;
const POST_PROMPT_PAUSE_MS = 4500;
const POST_CLEAR_PAUSE_MS = 1500;
const PROMPT_TYPING_DELAY_MS = 18;
const SUMMARY_TYPING_DELAY_MS = 12;
const COLLAPSE_LAYOUT_DURATION_MS = 0.8;
const CHIP_DISAPPEAR_DURATION_MS = 0.22;
const TEXT_AREA_LAYOUT_DURATION_MS = 0.28;

const promptText =
  'Write a concise summary of Nikola Vujic based on skills and experience.';
const summaryText =
  'Frontend-focused engineer building scalable web apps, polished interfaces, and product-minded experiences with Angular and TypeScript, while exploring React, Node.js, full-stack development, and AI-powered features.';

export function IntroDescriptionSequence({
  onComplete,
  skipAnimation = false,
}: IntroDescriptionSequenceProps) {
  const [phase, setPhase] = useState<SequencePhase>(skipAnimation ? 'done' : 'lines');
  const [visibleCount, setVisibleCount] = useState(
    skipAnimation ? introFragments.length : 0,
  );
  const [typedPrompt, setTypedPrompt] = useState('');
  const [typedSummary, setTypedSummary] = useState(skipAnimation ? summaryText : '');

  const getListDelay = (count: number) => {
    if (count === 0) {
      return INITIAL_LIST_PAUSE_MS;
    }

    if (count === 4) {
      return SHORT_LIST_PAUSE_MS;
    }

    if (count === 5) {
      return SHORT_LIST_PAUSE_MS;
    }

    if (count >= 6 && count < 12) {
      return MEDIUM_LIST_DELAY_MS;
    }

    if (count === 12) {
      return MEDIUM_LIST_PAUSE_MS;
    }

    if (count > 12 && count < 28) {
      return QUICK_LIST_DELAY_MS;
    }

    if (count >= 28 && count < 46) {
      return FAST_LIST_DELAY_MS;
    }

    if (count >= 46) {
      return VERY_FAST_LIST_DELAY_MS;
    }

    return NORMAL_LIST_DELAY_MS;
  };

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

    const delay = getListDelay(visibleCount);

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
      setPhase('promptPause');
    }, 550);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'promptPause') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase('prompt');
    }, PRE_PROMPT_PAUSE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'prompt') {
      return;
    }

    if (typedPrompt === promptText) {
      const timeoutId = window.setTimeout(() => {
        setTypedPrompt('');
        setPhase('promptClearPause');
      }, POST_PROMPT_PAUSE_MS);

      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      const nextCharacter = promptText[typedPrompt.length];
      setTypedPrompt((current) => current + nextCharacter);
    }, PROMPT_TYPING_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase, typedPrompt]);

  useEffect(() => {
    if (phase !== 'promptClearPause') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTypedSummary('');
      setPhase('summary');
    }, POST_CLEAR_PAUSE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'summary') {
      return;
    }

    if (typedSummary === summaryText) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const nextCharacter = summaryText[typedSummary.length];
      const nextSummary = typedSummary + nextCharacter;
      setTypedSummary(nextSummary);

      if (nextSummary === summaryText) {
        setPhase('done');
        onComplete();
      }
    }, SUMMARY_TYPING_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [onComplete, phase, typedSummary]);

  const isLinesPhase = phase === 'lines';
  const isCollapsePhase = phase === 'collapse';
  const showLines = phase === 'lines' || phase === 'collapse';
  const showAiShell =
    phase === 'collapse' ||
    phase === 'promptPause' ||
    phase === 'prompt' ||
    phase === 'promptClearPause' ||
    phase === 'summary' ||
    phase === 'done';

  return (
    <div className="max-w-2xl">
      <motion.div
        layout={!isLinesPhase}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'rounded-[0.5rem]',
          isLinesPhase ? 'overflow-visible py-5 pr-0 pl-0' : 'overflow-hidden p-5',
          isLinesPhase
            ? 'border border-transparent'
            : 'border border-(--accent-border) bg-(--accent-bg)/40',
        ].join(' ')}
      >
        <motion.div
          layout={!isLinesPhase}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={
            isLinesPhase ? '' : isCollapsePhase ? 'grid items-start' : 'flex flex-col'
          }
        >
          {showLines && (
            <motion.div
              layout={phase === 'collapse'}
              initial={false}
              animate={{
                gridTemplateRows: phase === 'collapse' ? '0fr' : '1fr',
                opacity: phase === 'collapse' ? 0 : 1,
                marginBottom: phase === 'collapse' ? 0 : 0,
              }}
              transition={{
                duration: COLLAPSE_LAYOUT_DURATION_MS,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: 'grid',
                overflow: phase === 'collapse' ? 'hidden' : 'visible',
              }}
              className={isCollapsePhase ? 'col-start-1 row-start-1' : ''}
            >
              <motion.div
                animate={{
                  opacity: phase === 'collapse' ? 0 : 1,
                  scale: phase === 'collapse' ? 0.985 : 1,
                  filter: phase === 'collapse' ? 'blur(4px)' : 'blur(0px)',
                }}
                transition={{ duration: CHIP_DISAPPEAR_DURATION_MS, ease: 'easeOut' }}
                className="min-h-0"
              >
                <div className="flex flex-wrap items-start gap-3">
                  {introFragments.slice(0, visibleCount).map((fragment, index) => (
                    <motion.span
                      key={`${fragment}-${index}`}
                      initial={{ opacity: 0, y: 8, scale: 0.92, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="h-fit rounded-full border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-sm text-(--text-h)"
                    >
                      {fragment}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {showAiShell && (
            <motion.div
              layout={isCollapsePhase}
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={[
                'flex flex-col',
                isCollapsePhase ? 'col-start-1 row-start-1 h-full self-stretch' : '',
              ].join(' ')}
            >
              <motion.div
                layout={isCollapsePhase ? 'size' : false}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 0 }}
                className={[
                  'relative rounded-[1.25rem] border border-(--border) bg-(--bg) p-2 md:p-5',
                  isCollapsePhase ? 'flex h-full min-h-full flex-col' : '',
                ].join(' ')}
              >
                {phase === 'promptClearPause' && (
                  <motion.svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="absolute top-4 right-4 h-5 w-5 text-(--accent)"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                  >
                    <line x1="12" y1="3" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
                    <line x1="3" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
                    <line x1="17" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                    <line x1="5.6" y1="5.6" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
                    <line x1="15.5" y1="15.5" x2="18.4" y2="18.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                    <line x1="18.4" y1="5.6" x2="15.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
                    <line x1="8.5" y1="15.5" x2="5.6" y2="18.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                  </motion.svg>
                )}

                {phase === 'collapse' && (
                  <motion.p
                    layout="size"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: TEXT_AREA_LAYOUT_DURATION_MS, ease: 'easeOut' }}
                    className="h-full min-h-[5.5rem] flex-1 text-left text-sm text-(--text) md:text-base"
                  >
                  </motion.p>
                )}

                {phase === 'promptPause' && (
                  <motion.p
                    layout={false}
                    transition={{ duration: TEXT_AREA_LAYOUT_DURATION_MS, ease: 'easeOut' }}
                    className="min-h-[5.5rem] whitespace-pre-wrap text-left text-sm leading-7 text-(--text-h) md:text-base"
                  >
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.9 }}
                      className="inline-block text-(--accent)"
                    >
                      |
                    </motion.span>
                  </motion.p>
                )}

                {(phase === 'prompt' || phase === 'promptClearPause') && (
                  <motion.p
                    layout={false}
                    transition={{ duration: TEXT_AREA_LAYOUT_DURATION_MS, ease: 'easeOut' }}
                    className="min-h-[5.5rem] whitespace-pre-wrap text-left text-sm leading-7 text-(--text-h) md:text-base"
                  >
                    {typedPrompt}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.9 }}
                      className="ml-0.5 inline-block text-(--accent)"
                    >
                      |
                    </motion.span>
                  </motion.p>
                )}

                {(phase === 'summary' || phase === 'done') && (
                  <motion.p
                    layout={false}
                    transition={{ duration: TEXT_AREA_LAYOUT_DURATION_MS, ease: 'easeOut' }}
                    className="min-h-[5.5rem] whitespace-pre-wrap text-left text-sm leading-7 text-(--text-h) md:text-base"
                  >
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
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
