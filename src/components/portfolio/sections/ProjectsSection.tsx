import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectCard } from '../ProjectCard';
import { projects } from '../../../data/projects';

const mainProjects = projects.filter((p) => !p.showAllOnly);
const extraCount = projects.length - mainProjects.length;

export function ProjectsSection() {
  const location = useLocation();
  const hasSectionTarget = !!(location.state as { section?: string } | null)?.section;
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : mainProjects;
  const cols: [number[], number[]] = [
    visible.map((_, i) => i).filter((i) => i % 2 === 0),
    visible.map((_, i) => i).filter((i) => i % 2 === 1),
  ];

  return (
    <section
      id="projects"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-6 md:py-10"
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
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              openAfterLayout={!!project.defaultExpanded}
              instantOpen={hasSectionTarget && !!project.defaultExpanded}
            />
          ))}
        </div>

        {/* Desktop: two independent columns, balanced by initial height */}
        <div className="mt-8 hidden gap-6 lg:flex">
          {cols.map((indices, c) => (
            <div key={c} className="flex flex-1 flex-col gap-6">
              {indices.map((i) => (
                <div key={visible[i].id}>
                  <ProjectCard
                    project={visible[i]}
                    openAfterLayout={!!visible[i].defaultExpanded}
                    instantOpen={hasSectionTarget && !!visible[i].defaultExpanded}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {extraCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-(--accent-border) bg-(--accent-bg) px-4 py-1.5 text-sm text-(--text-h) transition-opacity hover:opacity-80"
            >
              {showAll ? 'Show fewer' : `Show all projects (+${extraCount})`}
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
      <div className="h-[80vh] shrink-0" />
    </section>
  );
}
