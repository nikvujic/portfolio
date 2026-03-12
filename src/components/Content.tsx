import { SkillsChaos } from './SkillsChaos';
import { AIBioGenerator } from './AIBioGenerator';
import { ProjectsSection } from './ProjectsSection';
import { TechStackSection } from './TechStackSection';

type ContentProps = {
  visible: boolean;
};

export function Content({ visible }: ContentProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <SkillsChaos />
      <AIBioGenerator />
      <ProjectsSection />
      <TechStackSection />
    </div>
  );
}