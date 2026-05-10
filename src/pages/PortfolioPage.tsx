import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/portfolio/Navbar';
import { AISummarySection } from '../components/portfolio/sections/AISummarySection';
import { CVSection } from '../components/portfolio/sections/CVSection';
import { ProfileSection } from '../components/portfolio/sections/ProfileSection';
import { ProjectsSection } from '../components/portfolio/sections/ProjectsSection';
import { TechnologiesSection } from '../components/portfolio/sections/TechnologiesSection';
import { useWheelSnap } from '../hooks/useWheelSnap';

const SECTION_IDS = ['profile', 'ai-summary', 'projects', 'technologies', 'cv'] as const;

export function PortfolioPage() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useWheelSnap(mainRef, SECTION_IDS);

  useEffect(() => {
    const section = (location.state as { section?: string } | null)?.section;
    const root = mainRef.current;
    if (!section || !root) {
      window.history.replaceState(null, '');
      return;
    }
    const el = document.getElementById(section);
    if (!el) {
      window.history.replaceState(null, '');
      return;
    }

    const cTop = root.getBoundingClientRect().top;
    const targetTop = el.getBoundingClientRect().top - cTop + root.scrollTop;
    const prevSnap = root.style.scrollSnapType;
    root.style.scrollSnapType = 'none';
    root.scrollTo({ top: targetTop, behavior: 'smooth' });

    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      root.style.scrollSnapType = prevSnap;
      root.removeEventListener('scrollend', restore);
      window.clearTimeout(timeout);
      window.history.replaceState(null, '');
    };
    const timeout = window.setTimeout(restore, 1200);
    root.addEventListener('scrollend', restore, { once: true });

    return () => {
      restore();
    };
  }, [location.state]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <main ref={mainRef} className="flex-1 snap-y snap-mandatory overflow-y-scroll">
        <ProfileSection />
        <AISummarySection />
        <ProjectsSection />
        <TechnologiesSection />
        <CVSection />
      </main>
    </div>
  );
}
