import { techGroups } from '../../../data/technologies';
import type { TechLevel } from '../../../types/technology';

const levelConfig: Record<TechLevel, { label: string; className: string }> = {
  work: {
    label: 'Professionally',
    className: 'text-(--accent) border-(--accent-border) bg-(--accent-bg)',
  },
  projects: {
    label: 'In my projects',
    className: 'text-(--text-h) border-(--border) bg-(--border)/50',
  },
  learning: {
    label: 'Learning',
    className: 'text-(--text) border-dashed border-(--border)',
  },
};

const levelOrder: TechLevel[] = ['work', 'projects', 'learning'];

// Two independent columns like Projects, so a card's height doesn't depend on its neighbour
const columns = [
  techGroups.filter((_, i) => i % 2 === 0),
  techGroups.filter((_, i) => i % 2 === 1),
];

export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-6 md:py-10"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
          Stack
        </p>
        <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
          Technologies
        </h2>
        <p className="mt-4 text-sm text-(--text) md:text-base">
          What I work with, and where I've actually used it.
        </p>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-2">
          {levelOrder.map((level) => (
            <span
              key={level}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelConfig[level].className}`}
            >
              {levelConfig[level].label}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {columns.map((groups, c) => (
            <div key={c} className="flex flex-1 flex-col gap-6">
              {groups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-(--border) bg-(--code-bg) p-6"
                >
                  <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-(--text) opacity-50">
                    {group.title}
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <span className="text-base font-medium text-(--text-h)">{item.name}</span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${levelConfig[item.level].className}`}
                          >
                            {levelConfig[item.level].label}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-(--text)">{item.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[80vh] shrink-0" />
    </section>
  );
}
