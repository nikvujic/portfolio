import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
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

// ─── Image carousel ───────────────────────────────────────────────────────────

function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent]     = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragging, setDragging]   = useState(false);

  return (
    <div
      className="relative mt-5 aspect-video overflow-hidden rounded-xl bg-(--border)/30"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="flex h-full"
        animate={{ x: `${-current * 100}%` }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        onPointerDown={(e) => {
          setDragStart(e.clientX);
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={(e) => {
          if (dragStart === null) return;
          const delta = e.clientX - dragStart;
          if (delta < -50 && current < images.length - 1) setCurrent((c) => c + 1);
          else if (delta > 50 && current > 0) setCurrent((c) => c - 1);
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
            className="h-full w-full shrink-0 select-none object-cover object-top"
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
  const { title, description, status, type, technologies, detailedOverview, images } = project;

  const statusStyle = statusConfig[status] ?? statusConfig['planned'];

  const groupedTech = categoryOrder
    .map((cat) => ({ cat, items: technologies.filter((t) => t.category === cat) }))
    .filter(({ items }) => items.length > 0);

  return (
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
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-(--text-h) md:text-3xl">
        {title}
      </h3>
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
            {images && images.length > 0 && <ImageCarousel images={images} />}

            {/* Notes */}
            {detailedOverview && (
              <div className="mt-5 rounded-lg border-2 border-(--border) bg-(--bg) px-4 py-3">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-(--text) opacity-40">
                  Comment
                </span>
                <p className="text-xs text-(--text) md:text-sm">{detailedOverview}</p>
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
  );
}
