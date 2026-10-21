import { motion } from 'framer-motion';
import { Cpu, FileText, FolderKanban, User, type LucideIcon } from 'lucide-react';
import { SECTION_IDS, SECTION_LABELS, type SectionId } from '../../data/sections';

const icons: Record<SectionId, LucideIcon> = {
  profile: User,
  projects: FolderKanban,
  technologies: Cpu,
  cv: FileText,
};

type SideNavProps = {
  activeId: SectionId;
  onNavigate: (id: SectionId) => void;
};

// Quick page menu on the left edge - icons only, the current page lit up, its name on hover
export function SideNav({ activeId, onNavigate }: SideNavProps) {
  return (
    <nav
      aria-label="Pages"
      className="absolute left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-full border border-(--border) bg-(--bg)/70 p-1.5 backdrop-blur-sm min-[1280px]:flex"
    >
      {SECTION_IDS.map((id) => {
        const Icon = icons[id];
        const active = id === activeId;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            aria-label={SECTION_LABELS[id]}
            aria-current={active ? 'page' : undefined}
            className={`group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
              active ? 'text-(--accent)' : 'text-(--text) hover:text-(--text-h)'
            }`}
          >
            {active && (
              <motion.span
                layoutId="side-nav-indicator"
                className="absolute inset-0 rounded-full border border-(--accent-border) bg-(--accent-bg)"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <Icon className="relative h-4 w-4" strokeWidth={1.9} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-full border border-(--border) bg-(--bg) px-2.5 py-1 text-xs text-(--text-h) opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {SECTION_LABELS[id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
