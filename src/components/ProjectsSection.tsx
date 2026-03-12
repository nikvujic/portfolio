import { SectionTitle } from './SectionTitle';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="border-(--border) px-5 py-16 md:px-12 md:py-24"
    >
      <SectionTitle
        eyebrow="Projects"
        title="Selected work"
        subtitle="A mix of portfolio pieces, product-minded builds, and frontend-focused case studies."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}