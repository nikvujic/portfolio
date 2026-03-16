import { motion } from 'framer-motion';

import { AIBioGenerator } from './ai_generator/AIBioGenerator';
import { ProjectsSection } from './projects_section/ProjectsSection';
import { TechStackSection } from './tech_stack/TechStackSection';

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
      <ProjectsSection />
      <AIBioGenerator />
      <TechStackSection />
    </motion.div>
  );
}