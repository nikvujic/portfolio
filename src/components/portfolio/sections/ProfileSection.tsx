import profileImage from '../../../assets/images/profile.jpeg';

const facts = [
  { label: 'Based in',   value: 'Serbia' },
  { label: 'Experience', value: 'Building software since 2020' },
  { label: 'Main stack', value: 'TypeScript, Angular' },
  { label: 'Focus now', value: 'DevOps and AI engineering' },
  { label: 'Studied',    value: 'Information Systems, FON Belgrade' },
  { label: 'Languages',  value: 'Serbian, English' },
] as const;

export function ProfileSection() {
  return (
    <section
      id="profile"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-6 md:py-10"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
          Profile
        </p>
        <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
          Hi, I'm Nikola.
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Photo + quick facts */}
          <aside className="flex shrink-0 flex-col gap-5 md:w-64">
            <img
              src={profileImage}
              alt="Nikola Vujić"
              className="aspect-square w-40 rounded-2xl border border-(--border) object-cover md:w-full"
            />
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-(--border) bg-(--code-bg) p-5 md:grid-cols-1">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-(--accent)">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-(--text-h)">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* About */}
          <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-(--text) md:text-base">
            <p>
              I'm a software engineer from Serbia. Most of my work so far has been on the
              frontend. Since 2022 I've been working on a large Angular SaaS platform at SquidFlow:
              support ticketing, real-time chat, a query editor, a file manager, admin and
              permission flows, and the less visible work of keeping it up to date across several
              major Angular versions. I also prototyped, released and led its companion mobile app
              in Flutter.
            </p>
            <p>
              Before that I was at Delux, writing software for connected devices - a mobile app for
              monitoring a system remotely, and the tablet app for an automated beer-tap cleaning
              system. I got into programming through electronics and telecommunications, so I
              still like knowing what happens underneath the screen.
            </p>
            <p>
              Lately I've been working my way down the stack: APIs with Node and Postgres, Docker,
              CI/CD, and actually deploying and running the things I build. I use AI tools every
              day. The next step is building AI features into products, not only using AI to write
              code.
            </p>
            <p>
              What I care about in my work: finishing things rather than starting new ones, writing code the
              next person (or agent) can read, and testing my own work before I call it done.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[80vh] shrink-0" />
    </section>
  );
}
