import { useEffect, type RefObject } from 'react';

const LOCK_FALLBACK_MS = 800;
const EDGE_TOLERANCE_PX = 4;

export function useWheelSnap(
  containerRef: RefObject<HTMLElement | null>,
  sectionIds: readonly string[],
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let locked = false;
    let timer: number | null = null;

    const settle = () => {
      locked = false;
      container.style.scrollSnapType = '';
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      container.removeEventListener('scrollend', settle);
    };

    const lock = () => {
      locked = true;
      container.style.scrollSnapType = 'none';
      container.addEventListener('scrollend', settle, { once: true });
      timer = window.setTimeout(settle, LOCK_FALLBACK_MS);
    };

    const findCurrentIdx = (): number => {
      const cTop = container.getBoundingClientRect().top;
      const scrollTop = container.scrollTop;
      let bestIdx = 0;
      let bestTop = -Infinity;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top - cTop + scrollTop;
        if (top <= scrollTop + EDGE_TOLERANCE_PX && top > bestTop) {
          bestTop = top;
          bestIdx = i;
        }
      });
      return bestIdx;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (e.deltaY === 0) return;

      if (locked) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const viewportH = container.clientHeight;
      const scrollTop = container.scrollTop;

      const idx = findCurrentIdx();
      const currentEl = document.getElementById(sectionIds[idx]);
      if (!currentEl) return;

      const cTop = container.getBoundingClientRect().top;
      const elTop = currentEl.getBoundingClientRect().top - cTop + scrollTop;
      const elBottom = elTop + currentEl.offsetHeight;
      const isTall = currentEl.offsetHeight > viewportH + EDGE_TOLERANCE_PX;

      if (isTall) {
        if (direction > 0 && scrollTop + viewportH < elBottom - EDGE_TOLERANCE_PX) return;
        if (direction < 0 && scrollTop > elTop + EDGE_TOLERANCE_PX) return;
      }

      e.preventDefault();
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= sectionIds.length) return;
      const targetEl = document.getElementById(sectionIds[targetIdx]);
      if (!targetEl) return;
      const targetTop = targetEl.getBoundingClientRect().top - cTop + scrollTop;
      container.scrollTo({ top: targetTop, behavior: 'smooth' });
      lock();
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
      settle();
    };
  }, [containerRef, sectionIds]);
}
