export function Hero() {
  return (
    <section className="border-(--border) px-5 py-16 text-center md:px-12 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="mb-6 h-24 w-24 rounded-full border border-(--accent-border) bg-(--accent-bg) md:h-28 md:w-28" />

        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-(--accent)">
          Frontend Engineer
        </p>

        <h1 className="text-4xl tracking-[-0.05em] md:text-7xl">Nikola Vujic</h1>

        <p className="mt-6 max-w-2xl text-sm text-(--text) md:text-lg">
          I build polished frontend experiences, scalable product interfaces, and
          interactive web apps with a strong focus on usability, structure, and clean UI.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="rounded-full border border-(--accent-border) bg-(--accent) px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            View Projects
          </a>

          <a
            href="#about"
            className="rounded-full border border-(--border) px-5 py-3 text-sm font-medium text-(--text-h) transition-colors duration-200 hover:bg-[var(--accent-bg)]"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
}