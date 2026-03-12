import profileImage from '../assets/images/profile.jpeg';

export function Hero() {
  return (
    <section className="border-(--border) px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="max-w-3xl">
          <h1 className="-ml-[0.05em] mb-2 text-5xl leading-none tracking-[-0.07em] md:text-7xl lg:text-[5.5rem]">
            Nikola Vujic
          </h1>

          <p className="mb-4 text-base font-medium text-(--accent) md:text-lg">
            Fullstack Engineer (Frontend-Focused)
          </p>

          <p className="max-w-2xl text-base text-(--text) md:text-lg">
            Frontend-focused engineer building scalable web apps with React, TypeScript, and product-minded UI, while expanding into full-stack development and AI-powered features.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full border border-(--accent-border) bg-(--accent) px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Projects
            </a>

            <a
              href="#about"
              className="rounded-full border border-(--border) px-5 py-3 text-sm font-medium text-(--text-h) transition-colors duration-200 hover:bg-(--accent-bg)"
            >
              About Me
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={profileImage}
            alt="Nikola Vujic"
            className="h-48 w-48 rounded-full border-2 border-(--accent-border) object-cover shadow-[var(--shadow)] md:h-56 md:w-56 lg:h-64 lg:w-64"
          />
        </div>
      </div>
    </section>
  );
}
