import { SectionTitle } from '../../shared/SectionTitle';

export function AIBioGenerator() {
  return (
    <section id="ai-summary" className="border-(--border) px-5 py-16 md:px-12 md:py-24">
      <SectionTitle
        eyebrow="AI Summary"
        title="Generated profile description"
        subtitle="We’ll later connect this to your animated gimmick and regenerate button."
      />

      <div className="mx-auto max-w-3xl rounded-[2rem] border border-(--border) p-6 text-left shadow-[var(--shadow)] md:p-8">
        <p className="text-sm leading-7 text-(--text) md:text-base">
          Frontend engineer focused on building clean, scalable, and user-friendly
          interfaces, with experience across modern web apps, reusable component systems,
          and product-driven development.
        </p>

        <button
          type="button"
          className="mt-6 rounded-full border border-(--border) px-5 py-3 text-sm font-medium text-(--text-h) transition-colors duration-200 hover:bg-(--accent-bg)"
        >
          Regenerate
        </button>
      </div>
    </section>
  );
}
