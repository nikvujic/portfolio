import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

// Page-by-page sections, the way fullPage.js does it: the page itself never scrolls. Sections are stacked,
// one screen tall each, and the stack is moved with a transform. A section taller than the screen scrolls
// inside first. At its edge, a new gesture "pulls", like pull-to-refresh: the stack follows, revealing the
// gap to the next page, and stops once the pull is full. Letting go when full turns the page; letting go
// earlier (or backing off) springs it back.

export const PAGE_TRANSITION_MS = 700;
// Space between pages; the pull reveals it, so it's bigger than any full pull
export const PAGE_GAP_PX = 260;
// How far a full pull goes - it's about the input more than the screen: a mouse/trackpad, or a finger
const PULL_DISTANCE_PX = { wheel: 200, touch: 140 } as const;
// Pulling moves the stack this much per pixel scrolled/dragged
const PULL_RESISTANCE = 0.6;
// Wheel events closer together than this belong to one gesture (incl. trackpad inertia)
const WHEEL_GESTURE_GAP_MS = 220;
// The wheel has no "let go" - a full pull counts as released once wheel input stops for this long
const WHEEL_RELEASE_MS = 300;
// A pull that isn't full yet waits longer before springing back, so it can still be finished
const WHEEL_PARTIAL_RELEASE_MS = 900;
const RELEASE_MS = 350;

const atTop = (el: HTMLElement) => el.scrollTop <= 1;
const atBottom = (el: HTMLElement) => el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
const isLocked = () => document.body.dataset.pagerLocked === 'true';

// page: turning a page; pull: wheel pull (eased, so notches glide); drag: follows a finger; release: springs back
export type PagerMotion = 'page' | 'pull' | 'drag' | 'release';
// `target`: the page this pull leads to, fixed when the pull starts (so it can't change while fading out)
// `max`: how far this pull goes when full (depends on the input that started it)
// `fading`: the pull has ended - the indicator keeps this progress (instead of draining) while it fades out
export type PullState = {
  direction: -1 | 0 | 1;
  target: number;
  distance: number;
  max: number;
  full: boolean;
  fading?: number;
};

const NO_PULL: PullState = { direction: 0, target: -1, distance: 0, max: 0, full: false };

export function useSectionPager<T extends string>(
  viewportRef: RefObject<HTMLElement | null>,
  sectionIds: readonly T[],
  initialSection?: T,
) {
  const [index, setIndex] = useState(() => Math.max(0, initialSection ? sectionIds.indexOf(initialSection) : 0));
  const [pull, setPullState] = useState<PullState>(NO_PULL);
  const [motion, setMotion] = useState<PagerMotion>('page');
  const indexRef = useRef(index);
  const pullRef = useRef<PullState>(NO_PULL);
  const animatingRef = useRef(false);
  const animationTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  const sectionAt = useCallback((i: number) => document.getElementById(sectionIds[i]), [sectionIds]);

  const setPull = useCallback((next: PullState, nextMotion: PagerMotion) => {
    if (clearTimerRef.current !== null) window.clearTimeout(clearTimerRef.current);
    pullRef.current = next;
    setPullState(next);
    setMotion(nextMotion);
  }, []);

  // Collapses the pull to nothing, keeping its direction until the animation is over so the strip can shrink
  const collapsePull = useCallback((nextMotion: PagerMotion, duration: number) => {
    const { direction, target, distance, max, full } = pullRef.current;
    if (direction === 0) return;
    const progress = max > 0 ? Math.min(1, distance / max) : 0;
    setPull({ direction, target, distance: 0, max, full, fading: progress }, nextMotion);
    clearTimerRef.current = window.setTimeout(() => {
      pullRef.current = NO_PULL;
      setPullState(NO_PULL);
    }, duration);
  }, [setPull]);

  // `interrupt`: a click may redirect a page change that's still animating (scroll input may not)
  const goTo = useCallback((target: number, interrupt = false) => {
    const next = Math.max(0, Math.min(sectionIds.length - 1, target));
    const current = indexRef.current;
    if (next === current || (animatingRef.current && !interrupt)) return;

    // Going down you arrive at a section's top, going up at its bottom - like turning pages
    const el = sectionAt(next);
    if (el) el.scrollTop = next > current ? 0 : el.scrollHeight;

    indexRef.current = next;
    setIndex(next);
    if (pullRef.current.direction !== 0) collapsePull('page', PAGE_TRANSITION_MS);
    else setMotion('page');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animatingRef.current = true;
    if (animationTimerRef.current !== null) window.clearTimeout(animationTimerRef.current);
    animationTimerRef.current = window.setTimeout(() => { animatingRef.current = false; }, PAGE_TRANSITION_MS);
  }, [sectionIds, sectionAt, collapsePull]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const canTurn = (direction: number) => {
      const target = indexRef.current + direction;
      return target >= 0 && target < sectionIds.length;
    };

    // Sets the pull to `distance` (clamped: it stops once full)
    const pullTo = (direction: -1 | 1, distance: number, nextMotion: PagerMotion) => {
      const max = PULL_DISTANCE_PX[nextMotion === 'drag' ? 'touch' : 'wheel'];
      const clamped = Math.max(0, Math.min(max, distance));
      if (clamped === 0) {
        if (pullRef.current.direction !== 0) setPull(NO_PULL, nextMotion);
        return;
      }
      setPull({ direction, target: indexRef.current + direction, distance: clamped, max, full: clamped >= max - 1 }, nextMotion);
    };

    // Letting go: a full pull turns the page, anything less springs back
    const release = () => {
      const { direction, target, full } = pullRef.current;
      if (direction === 0) return;
      if (full) goTo(target);
      else collapsePull('release', RELEASE_MS);
    };

    let lastWheelAt = 0;
    let gestureMayPull = true;
    let wheelReleaseTimer: number | null = null;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      const now = performance.now();
      // A pause starts a new gesture; only a new gesture may start a pull
      if (now - lastWheelAt > WHEEL_GESTURE_GAP_MS) gestureMayPull = true;
      lastWheelAt = now;
      if (animatingRef.current) {
        e.preventDefault();
        gestureMayPull = false;
        return;
      }

      const el = sectionAt(indexRef.current);
      if (!el) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1;
      const amount = Math.abs(e.deltaY) * unit * PULL_RESISTANCE;

      const pulling = pullRef.current.direction;
      const pullingNow = pulling !== 0 && pullRef.current.distance > 0;
      if (!pullingNow) {
        if (direction > 0 ? !atBottom(el) : !atTop(el)) {
          // Still content to scroll in this section: scroll it natively, and don't let this gesture pull
          gestureMayPull = false;
          return;
        }
        e.preventDefault();
        if (!gestureMayPull || !canTurn(direction)) return;
        pullTo(direction, amount, 'pull');
      } else {
        // Already pulling: more input in its direction grows it (up to full), the other way shrinks it
        e.preventDefault();
        const distance = pullRef.current.distance + (direction === pulling ? amount : -amount);
        pullTo(pulling as -1 | 1, distance, 'pull');
      }

      if (wheelReleaseTimer !== null) window.clearTimeout(wheelReleaseTimer);
      wheelReleaseTimer = window.setTimeout(release, pullRef.current.full ? WHEEL_RELEASE_MS : WHEEL_PARTIAL_RELEASE_MS);
    };

    let touchStartY = 0;
    let touchFromTop = false;
    let touchFromBottom = false;

    const onTouchStart = (e: TouchEvent) => {
      const el = sectionAt(indexRef.current);
      touchStartY = e.touches[0].clientY;
      touchFromTop = !!el && atTop(el);
      touchFromBottom = !!el && atBottom(el);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (animatingRef.current) {
        e.preventDefault();
        return;
      }
      const el = sectionAt(indexRef.current);
      if (!el) return;
      const travel = touchStartY - e.touches[0].clientY;
      // Only a swipe that started at the section's edge pulls; momentum inside it never does
      const direction = travel > 0 && touchFromBottom && atBottom(el) ? 1
        : travel < 0 && touchFromTop && atTop(el) ? -1
        : 0;
      if (direction === 0 || !canTurn(direction)) {
        if (pullRef.current.direction !== 0) setPull(NO_PULL, 'drag');
        return;
      }
      e.preventDefault();
      pullTo(direction, Math.abs(travel) * PULL_RESISTANCE, 'drag');
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isLocked() || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const el = sectionAt(indexRef.current);
      if (!el) return;

      const page = el.clientHeight * 0.85;
      const steps: Record<string, number> = {
        ArrowDown: 80, ArrowUp: -80, PageDown: page, PageUp: -page, ' ': e.shiftKey ? -page : page,
      };
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        goTo(e.key === 'Home' ? 0 : sectionIds.length - 1);
        return;
      }
      const step = steps[e.key];
      if (step === undefined) return;
      e.preventDefault();
      if (step > 0 ? atBottom(el) : atTop(el)) goTo(indexRef.current + (step > 0 ? 1 : -1));
      else el.scrollBy({ top: step, behavior: 'smooth' });
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', release);
    viewport.addEventListener('touchcancel', release);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', release);
      viewport.removeEventListener('touchcancel', release);
      window.removeEventListener('keydown', onKeyDown);
      if (wheelReleaseTimer !== null) window.clearTimeout(wheelReleaseTimer);
    };
  }, [viewportRef, sectionIds, sectionAt, goTo, setPull, collapsePull]);

  const scrollToSection = useCallback((id: T) => {
    const target = sectionIds.indexOf(id);
    if (target === -1) return;
    // From the navbar, always land on the section's top
    const el = sectionAt(target);
    goTo(target, true);
    if (el) el.scrollTop = 0;
  }, [sectionIds, sectionAt, goTo]);

  return { activeId: sectionIds[index], index, pull, motion, scrollToSection };
}
