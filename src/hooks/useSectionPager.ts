import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

// Page-by-page sections, the way fullPage.js does it: the page itself never scrolls. Sections are stacked,
// one screen tall each, and the stack is moved with a transform. A section taller than the screen scrolls
// inside first; only a gesture that starts at its edge moves to the next/previous section.

export const PAGE_TRANSITION_MS = 700;
// Wheel events closer together than this belong to one gesture (incl. trackpad inertia)
const WHEEL_GESTURE_GAP_MS = 220;
// Finger travel needed to turn a page
const TOUCH_SENSITIVITY_PX = 50;

const atTop = (el: HTMLElement) => el.scrollTop <= 1;
const atBottom = (el: HTMLElement) => el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
const isLocked = () => document.body.dataset.pagerLocked === 'true';

export function useSectionPager<T extends string>(
  viewportRef: RefObject<HTMLElement | null>,
  sectionIds: readonly T[],
  initialSection?: T,
) {
  const [index, setIndex] = useState(() => Math.max(0, initialSection ? sectionIds.indexOf(initialSection) : 0));
  const indexRef = useRef(index);
  const animatingRef = useRef(false);
  const animationTimerRef = useRef<number | null>(null);

  const sectionAt = useCallback((i: number) => document.getElementById(sectionIds[i]), [sectionIds]);

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animatingRef.current = true;
    if (animationTimerRef.current !== null) window.clearTimeout(animationTimerRef.current);
    animationTimerRef.current = window.setTimeout(() => { animatingRef.current = false; }, PAGE_TRANSITION_MS);
  }, [sectionIds, sectionAt]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let lastWheelAt = 0;
    let gestureMayTurn = true;
    // The rest of a gesture that turned the page (e.g. trackpad inertia) is ignored entirely
    let gestureTurned = false;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      const now = performance.now();
      // A pause starts a new gesture; only a new gesture may turn the page
      if (now - lastWheelAt > WHEEL_GESTURE_GAP_MS) {
        gestureMayTurn = true;
        gestureTurned = false;
      }
      lastWheelAt = now;
      if (gestureTurned) {
        e.preventDefault();
        return;
      }

      const el = sectionAt(indexRef.current);
      if (!el) return;
      if (animatingRef.current) {
        e.preventDefault();
        gestureMayTurn = false;
        return;
      }
      const down = e.deltaY > 0;
      if (down ? !atBottom(el) : !atTop(el)) {
        // Still content to scroll in this section: scroll it natively, and don't let this gesture turn
        gestureMayTurn = false;
        return;
      }
      e.preventDefault();
      if (!gestureMayTurn) return;
      gestureMayTurn = false;
      gestureTurned = true;
      goTo(indexRef.current + (down ? 1 : -1));
    };

    let touchStartY = 0;
    let touchFromTop = false;
    let touchFromBottom = false;
    let touchTurned = false;

    const onTouchStart = (e: TouchEvent) => {
      const el = sectionAt(indexRef.current);
      touchStartY = e.touches[0].clientY;
      touchFromTop = !!el && atTop(el);
      touchFromBottom = !!el && atBottom(el);
      touchTurned = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (animatingRef.current || touchTurned) {
        e.preventDefault();
        return;
      }
      const el = sectionAt(indexRef.current);
      if (!el) return;
      const travel = touchStartY - e.touches[0].clientY;
      // Only a swipe that started at the section's edge turns the page; momentum inside it never does
      if (travel > TOUCH_SENSITIVITY_PX && touchFromBottom && atBottom(el)) {
        e.preventDefault();
        touchTurned = true;
        goTo(indexRef.current + 1);
      } else if (travel < -TOUCH_SENSITIVITY_PX && touchFromTop && atTop(el)) {
        e.preventDefault();
        touchTurned = true;
        goTo(indexRef.current - 1);
      }
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
    window.addEventListener('keydown', onKeyDown);
    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [viewportRef, sectionIds, sectionAt, goTo]);

  const scrollToSection = useCallback((id: T) => {
    const target = sectionIds.indexOf(id);
    if (target === -1) return;
    // From the navbar, always land on the section's top
    const el = sectionAt(target);
    goTo(target, true);
    if (el) el.scrollTop = 0;
  }, [sectionIds, sectionAt, goTo]);

  return { activeId: sectionIds[index], index, scrollToSection };
}
