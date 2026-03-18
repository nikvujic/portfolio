import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/portfolio/Navbar';
import { AISummarySection } from '../components/portfolio/sections/AISummarySection';
import { CVSection } from '../components/portfolio/sections/CVSection';
import { ProfileSection } from '../components/portfolio/sections/ProfileSection';
import { ProjectsSection } from '../components/portfolio/sections/ProjectsSection';
import { TechnologiesSection } from '../components/portfolio/sections/TechnologiesSection';

export function PortfolioPage() {
  const location = useLocation();

  useEffect(() => {
    const section = (location.state as { section?: string } | null)?.section;
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 snap-y snap-mandatory overflow-y-scroll">
        <ProfileSection />
        <AISummarySection />
        <ProjectsSection />
        <TechnologiesSection />
        <CVSection />
      </main>
    </div>
  );
}
