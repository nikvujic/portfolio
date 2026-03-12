import { SectionTitle } from './SectionTitle';
import { skills } from '../data/skills';

export function SkillsChaos() {
  return (
    <section
      id="about"
      className="border-(--border) px-5 py-16 md:px-12 md:py-24"
    >
      <SectionTitle
        eyebrow="Skills"
        title="The chaos section"
        subtitle="This will become the animated skills-to-AI-summary transition."
      />

      <div className="rounded-4xl border border-(--border) p-6 md:p-8">
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-sm text-(--text-h)"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}