import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/portfolio/Navbar';
import { PullIndicator } from '../components/portfolio/PullIndicator';
import { SideNav } from '../components/portfolio/SideNav';
import { CVSection } from '../components/portfolio/sections/CVSection';
import { ProfileSection } from '../components/portfolio/sections/ProfileSection';
import { ProjectsSection } from '../components/portfolio/sections/ProjectsSection';
import { TechnologiesSection } from '../components/portfolio/sections/TechnologiesSection';
import { SECTION_IDS, SECTION_LABELS, type SectionId } from '../data/sections';
import { PAGE_GAP_PX, PAGE_TRANSITION_MS, useSectionPager, type PagerMotion } from '../hooks/useSectionPager';

const stackTransition: Record<PagerMotion, string> = {
  page: `transform ${PAGE_TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
  // Wheel pulls glide between notches, a finger is followed directly; letting go springs back
  pull: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
  drag: 'transform 40ms linear',
  release: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
};

export function PortfolioPage() {
  const location = useLocation();
  const viewportRef = useRef<HTMLDivElement>(null);

  // Arriving from the intro with a section picked: start there
  const [initialSection] = useState(() => {
    const section = (location.state as { section?: string } | null)?.section;
    window.history.replaceState(null, '');
    return (SECTION_IDS as readonly string[]).includes(section ?? '') ? (section as SectionId) : undefined;
  });

  const { activeId, index, pull, motion, scrollToSection } = useSectionPager(viewportRef, SECTION_IDS, initialSection);
  const pullTarget = pull.direction !== 0 ? SECTION_IDS[pull.target] : undefined;
  const pullOffset = -pull.direction * pull.distance;

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar activeId={activeId} onNavigate={scrollToSection} />
      <div ref={viewportRef} className="relative flex-1 overflow-hidden">
        <SideNav activeId={activeId} onNavigate={scrollToSection} />
        <PullIndicator
          pull={pull}
          label={pullTarget && SECTION_LABELS[pullTarget]}
          transition={stackTransition[motion]}
        />
        {/* Each section is one screen tall and scrolls its own content; the stack moves a screen per page */}
        <main
          className="flex h-full flex-col will-change-transform motion-reduce:transition-none [&>section]:h-full [&>section]:shrink-0 [&>section]:overflow-y-auto [&>section]:overscroll-contain [&>section]:[scrollbar-width:none] [&>section::-webkit-scrollbar]:hidden"
          style={{
            gap: PAGE_GAP_PX,
            transform: `translate3d(0, calc(${-index} * (100% + ${PAGE_GAP_PX}px) + ${pullOffset}px), 0)`,
            transition: stackTransition[motion],
          }}
        >
          <ProfileSection />
          <ProjectsSection />
          <TechnologiesSection />
          <CVSection />
        </main>
      </div>
    </div>
  );
}
