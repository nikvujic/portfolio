export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-20"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
          Portfolio
        </p>
        <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
          Projects & Plans
        </h2>
        <p className="mt-4 text-sm text-(--text) md:text-base">Placeholder — content coming soon.</p>
        <p className="pt-3">this app (with comments, techs etc.)</p>
        <ul>
          <li>-pause design, deploy and hosting, CICD, add as project</li>
        </ul>
        <p className="pt-3">mini project tracker</p>
        <ul>
          <p>-change text and summaries</p>
          <p>-add socials on normal</p>
          <p>-mobile layouts and menu</p>
          <p>-white theme improvements</p>
        </ul>
      </div>
    </section>
  );
}
