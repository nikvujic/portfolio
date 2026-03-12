import type { Project } from '../types/project';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[2rem] border border-(--border) p-6 text-left transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-(--accent)">
            {project.category}
          </p>

          <h3 className="text-xl tracking-[-0.02em] text-(--text-h)">
            {project.title}
          </h3>
        </div>

        {project.status ? (
          <span className="rounded-full border border-(--border) px-3 py-1 text-xs text-(--text)">
            {project.status}
          </span>
        ) : null}
      </div>

      <p className="text-sm leading-7 text-(--text) md:text-base">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full bg-(--code-bg) px-3 py-1.5 text-xs text-(--text-h)"
          >
            {item}
          </span>
        ))}
      </div>

      {project.link ? (
        <a
          href={project.link}
          className="mt-6 inline-flex text-sm font-medium text-(--accent)"
        >
          View project →
        </a>
      ) : null}
    </article>
  );
}