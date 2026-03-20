export function AISummarySection() {
  return (
    <section
      id="ai-summary"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-20"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
          AI-generated
        </p>
        <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
          AI Summary
        </h2>
        <p className="mt-4 text-sm text-(--text) md:text-base">
          Ask anything - this is an AI trained on my CV and biography, here to answer questions from recruiters and collaborators.
        </p>
        <p className="mt-3 text-sm text-(--accent) md:text-base">Coming soon.</p>
      </div>
    </section>
  );
}
