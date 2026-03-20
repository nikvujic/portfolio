import { useEffect, useRef, useState } from 'react';
import { ProjectCard } from '../ProjectCard';
import { projects } from '../../../data/projects';

function balancedCols(heights: number[]): [number[], number[]] {
  const colH = [0, 0];
  const cols: [number[], number[]] = [[], []];
  heights.forEach((h, i) => {
    const col = colH[0] <= colH[1] ? 0 : 1;
    cols[col].push(i);
    colH[col] += h;
  });
  return cols;
}

export function ProjectsSection() {
  const [cols, setCols] = useState<[number[], number[]]>([
    projects.map((_, i) => i).filter((_, i) => i % 2 === 0),
    projects.map((_, i) => i).filter((_, i) => i % 2 === 1),
  ]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(projects.length).fill(null));

  useEffect(() => {
    const heights = cardRefs.current.map((el) => el?.offsetHeight ?? 0);
    setCols(balancedCols(heights));
  }, []);

  return (
    <section
      id="projects"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-10 md:py-20"
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Desktop: two independent columns, balanced by initial height */}
        <div className="mt-8 hidden gap-6 lg:flex">
          {cols.map((indices, c) => (
            <div key={c} className="flex flex-1 flex-col gap-6">
              {indices.map((i) => (
                <div key={projects[i].id} ref={(el) => { cardRefs.current[i] = el; }}>
                  <ProjectCard project={projects[i]} />
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
