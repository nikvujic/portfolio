import { SectionTitle } from '../../shared/SectionTitle';
import { technologies } from '../../../data/technologies';

export function TechStackSection() {
  return (
    <section id="technologies" className="px-5 py-16 md:px-12 md:py-24">
      <SectionTitle
        eyebrow="Tech"
        title="Technologies I use"
        subtitle="Tools I've worked with in production and the stack I'm building with now."
      />

      <div className="flex flex-wrap justify-center gap-3">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-(--border) px-4 py-2 text-sm text-(--text-h)"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
