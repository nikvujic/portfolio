import './index.css';
import { Hero } from './components/Hero';
import { SkillsChaos } from './components/SkillsChaos';
import { AIBioGenerator } from './components/AIBioGenerator';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';

function App() {
  return (
    <main>
      <Hero />
      <SkillsChaos />
      <AIBioGenerator />
      <ProjectsSection />
      <TechStackSection />
    </main>
  );
}

export default App;