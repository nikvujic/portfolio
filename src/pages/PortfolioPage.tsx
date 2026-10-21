import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/portfolio/Navbar';
import { SideNav } from '../components/portfolio/SideNav';
import { CVSection } from '../components/portfolio/sections/CVSection';
import { ProfileSection } from '../components/portfolio/sections/ProfileSection';
import { ProjectsSection } from '../components/portfolio/sections/ProjectsSection';
import { TechnologiesSection } from '../components/portfolio/sections/TechnologiesSection';
import { SECTION_IDS, type SectionId } from '../data/sections';
import { PAGE_TRANSITION_MS, useSectionPager } from '../hooks/useSectionPager';

export function PortfolioPage() {
  const location = useLocation();
  const viewportRef = useRef<HTMLDivElement>(null);

  // Arriving from the intro with a section picked: start there
  const [initialSection] = useState(() => {
    const section = (location.state as { section?: string } | null)?.section;
    window.history.replaceState(null, '');
    return (SECTION_IDS as readonly string[]).includes(section ?? '') ? (section as SectionId) : undefined;
  });

  const { activeId, index, scrollToSection } = useSectionPager(viewportRef, SECTION_IDS, initialSection);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar activeId={activeId} onNavigate={scrollToSection} />
      <div ref={viewportRef} className="relative flex-1 overflow-hidden">
        <SideNav activeId={activeId} onNavigate={scrollToSection} />
        {/* Each section is one screen tall and scrolls its own content; the stack moves a screen per page */}
        <main
          className="h-full will-change-transform motion-reduce:transition-none [&>section]:h-full [&>section]:overflow-y-auto [&>section]:overscroll-contain [&>section]:[scrollbar-width:none] [&>section::-webkit-scrollbar]:hidden"
          style={{
            transform: `translate3d(0, ${-index * 100}%, 0)`,
            transition: `transform ${PAGE_TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
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
