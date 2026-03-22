import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Project, TechCategory } from '../../types/project';

// ─── Config ───────────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; className: string }> = {
  'in-progress': {
    label: 'In Progress',
    className: 'text-(--accent) border-(--accent-border) bg-(--accent-bg)',
  },
  'planned': {
    label: 'Planned',
    className: 'text-(--text) border-(--border) bg-(--border)/50',
  },
  'completed': {
    label: 'Completed',
    className: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10',
  },
};

const typeLabel: Record<string, string> = {
  production:   'Production',
  sandbox:      'Sandbox',
  productivity: 'Productivity',
};

const categoryOrder: TechCategory[] = ['frontend', 'backend', 'devops', 'other'];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ images, initial, fit, onClose }: {
  images: string[];
  initial: number;
  fit?: 'cover' | 'contain';
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initial);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent((c) => Math.min(c + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X size={16} />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt=""
          className={`max-h-[90vh] max-w-[90vw] rounded-xl ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />

        {images.length > 1 && (
          <>
            {current > 0 && (
              <button
                type="button"
                onClick={() => setCurrent((c) => c - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {current < images.length - 1 && (
              <button
                type="button"
                onClick={() => setCurrent((c) => c + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              >
                <ChevronRight size={18} />
              </button>
            )}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Image carousel ───────────────────────────────────────────────────────────

function ImageCarousel({ images, fit = 'cover', onImageClick }: {
  images: string[];
  fit?: 'cover' | 'contain';
  onImageClick: (index: number) => void;
}) {
  const [current, setCurrent]     = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragging, setDragging]   = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchOrigin = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      touchOrigin.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchOrigin.current) return;
      const dx = Math.abs(e.touches[0].clientX - touchOrigin.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchOrigin.current.y);
      if (dx > dy) e.preventDefault();
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mt-5 aspect-video overflow-hidden rounded-xl bg-(--border)/30"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="flex h-full"
        animate={{ x: `${-current * 100}%` }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{ cursor: dragging ? 'grabbing' : 'zoom-in' }}
        onPointerDown={(e) => {
          setDragStart(e.clientX);
          setDragging(false);
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (dragStart !== null && Math.abs(e.clientX - dragStart) > 5) setDragging(true);
        }}
        onPointerUp={(e) => {
          if (dragStart === null) return;
          const delta = e.clientX - dragStart;
          if (Math.abs(delta) < 5) {
            onImageClick(current);
          } else if (delta < -50 && current < images.length - 1) {
            setCurrent((c) => c + 1);
          } else if (delta > 50 && current > 0) {
            setCurrent((c) => c - 1);
          }
          setDragStart(null);
          setDragging(false);
        }}
        onPointerCancel={() => { setDragStart(null); setDragging(false); }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className={`h-full w-full shrink-0 select-none ${fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
          />
        ))}
      </motion.div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-4 bg-(--accent)'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { title, description, status, type, technologies, detailedOverview, images, imageFit, link } = project;

  const statusStyle = statusConfig[status] ?? statusConfig['planned'];

  const groupedTech = categoryOrder
    .map((cat) => ({ cat, items: technologies.filter((t) => t.category === cat) }))
    .filter(({ items }) => items.length > 0);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded((e) => !e)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded((v) => !v); }}
        className={`
          group relative rounded-2xl border border-(--border) bg-(--code-bg) p-6
          cursor-pointer select-none
          transition-[padding] duration-200
          ${!expanded && 'hover:pb-8'}
        `}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-(--text) opacity-50">
            {typeLabel[type]}
          </span>
          <div className="flex items-center gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyle.className}`}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Title + description */}
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold tracking-tight text-(--text-h) md:text-3xl">
            {title}
          </h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex shrink-0 items-center gap-1 rounded-full border border-(--accent-border) bg-(--accent-bg) px-2.5 py-1 text-xs text-(--text-h) transition-opacity hover:opacity-80"
            >
              GitHub
              <ExternalLink size={10} strokeWidth={2} />
            </a>
          )}
        </div>
        <p className="text-sm text-(--text) md:text-base">{description}</p>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Technologies */}
              <div className="mt-5 space-y-4">
                {groupedTech.map(({ cat, items }) => (
                  <div key={cat}>
                    <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-(--text) opacity-40">
                      {cat}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((tech) => (
                        <span
                          key={tech.name}
                          className="rounded-full border border-(--accent-border) bg-(--accent-bg) px-2.5 py-1 text-xs text-(--text-h)"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Image carousel */}
              {images && images.length > 0 && (
                <ImageCarousel
                  images={images}
                  fit={imageFit}
                  onImageClick={(i) => setLightboxIndex(i)}
                />
              )}

              {/* Notes */}
              {detailedOverview && (
                <div className="mt-5 rounded-lg border-2 border-(--border) bg-(--bg) px-4 py-3">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-(--text) opacity-40">
                    Comment
                  </span>
                  <p className="whitespace-pre-line text-xs text-(--text) md:text-sm">{detailedOverview}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <span className="absolute bottom-3 right-5 text-xs font-medium text-(--accent) opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            expand
          </span>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && images && (
          <Lightbox
            images={images}
            initial={lightboxIndex}
            fit={imageFit}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
