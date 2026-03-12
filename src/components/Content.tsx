import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col"
    >
      <SkillsChaos />
      <AIBioGenerator />
      <ProjectsSection />
      <TechStackSection />
    </motion.div>
  );
}