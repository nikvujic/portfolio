type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <header className="mb-10 text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-(--accent)">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-2xl tracking-[-0.02em] md:text-4xl">{title}</h2>

      {subtitle ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-(--text) md:text-base">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}