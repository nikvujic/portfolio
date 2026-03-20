export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-10 md:py-20"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
          Stack
        </p>
        <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
          Technologies
        </h2>
        <p className="mt-4 text-sm text-(--text) md:text-base">
          An overview of the tools and technologies I work with - each with notes on how and why I use them.
        </p>
        <p className="mt-3 text-sm text-(--accent) md:text-base">Coming soon.</p>
      </div>
    </section>
  );
}
