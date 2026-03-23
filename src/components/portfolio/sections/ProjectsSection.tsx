import { ProjectCard } from '../ProjectCard';
import { projects } from '../../../data/projects';

const fixedCols: [number[], number[]] = [
  projects.map((_, i) => i).filter((_, i) => i % 2 === 0),
  projects.map((_, i) => i).filter((_, i) => i % 2 === 1),
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
          Portfolio
        </p>
        <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
          Projects & Plans
        </h2>
        <p className="mt-4 text-sm text-(--text) md:text-base">
          A collection of shipped work, projects currently in progress, ideas in the pipeline, and smaller experiments built to explore or test something specific.
        </p>

        {/* Mobile: single column */}
        <div className="mt-8 flex flex-col gap-6 lg:hidden">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} openAfterLayout={!!project.defaultExpanded} />
          ))}
        </div>

        {/* Desktop: two independent columns, balanced by initial height */}
        <div className="mt-8 hidden gap-6 lg:flex">
          {fixedCols.map((indices, c) => (
            <div key={c} className="flex flex-1 flex-col gap-6">
              {indices.map((i) => (
                <div key={projects[i].id}>
                  <ProjectCard project={projects[i]} openAfterLayout={!!projects[i].defaultExpanded} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[80vh] shrink-0" />
    </section>
  );
}
