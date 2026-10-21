import { ArrowDown, ArrowUp } from 'lucide-react';
import type { PullState } from '../../hooks/useSectionPager';

const RING_RADIUS = 15;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

type PullIndicatorProps = {
  pull: PullState;
  label?: string;
  // Same timing as the page stack, so the strip grows and shrinks with it
  transition: string;
};

// The strip revealed while pulling past a page's edge: a ring that fills up around an arrow, and where it leads.
// Full, it lights up - letting go then turns the page.
export function PullIndicator({ pull, label, transition }: PullIndicatorProps) {
  if (pull.direction === 0 || !label || pull.max === 0) return null;

  const fading = pull.fading !== undefined;
  const progress = pull.fading ?? Math.min(1, pull.distance / pull.max);
  const Arrow = pull.direction > 0 ? ArrowDown : ArrowUp;
  const timing = transition.replace(/^transform /, '');

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-30 flex items-center justify-center gap-3 overflow-hidden ${
        pull.direction > 0 ? 'bottom-0' : 'top-0'
      }`}
      style={{
        height: pull.distance,
        // Ending: fade out quickly on its own, rather than with the shrinking strip
        opacity: fading ? 0 : Math.min(1, progress * 1.6),
        transition: fading ? `height ${timing}, opacity 180ms ease-out` : `height ${timing}, opacity ${timing}`,
      }}
    >
      <span
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
          pull.full ? 'bg-(--accent) text-(--bg)' : 'text-(--accent)'
        }`}
      >
        <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
          <circle cx="18" cy="18" r={RING_RADIUS} fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle
            cx="18"
            cy="18"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - progress)}
            style={{ transition: fading ? 'none' : `stroke-dashoffset ${timing}` }}
          />
        </svg>
        <Arrow className="relative h-4 w-4" strokeWidth={2} />
      </span>
      <span className={`text-sm transition-colors duration-200 ${pull.full ? 'text-(--accent)' : 'text-(--text-h)'}`}>
        {label}
      </span>
    </div>
  );
}
