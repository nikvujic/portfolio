import { motion, type Variants } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import profileImage from '../../../assets/images/profile.jpeg';
import { useHasBeenVisible } from '../../../hooks/useHasBeenVisible';

const facts = [
  { label: 'Based in',   value: 'Serbia' },
  { label: 'Experience', value: 'Building software since 2020' },
  { label: 'Main stack', value: 'TypeScript, Angular' },
  { label: 'Focus now', value: 'DevOps and AI engineering' },
  { label: 'Studied',    value: 'Information Systems, FON Belgrade' },
  { label: 'Languages',  value: 'Serbian, English' },
] as const;

const appear: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ProfileSection() {
  const location = useLocation();
  const visible = useHasBeenVisible();
  // Coming from the intro, the page is already "introduced" - only animate on a direct visit
  const fromIntro = !!(location.state as { section?: string } | null)?.section;

  const reveal = (delay: number) => ({
    variants: appear,
    custom: delay,
    initial: fromIntro ? false : 'hidden',
    animate: visible ? 'shown' : 'hidden',
  } as const);

  return (
    <section
      id="profile"
      className="flex min-h-full snap-start snap-always flex-col justify-start py-6 md:py-10"
    >
      <div className="mx-auto w-full max-w-281.5 px-5 md:px-12">
        <motion.div {...reveal(0)}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-(--accent)">
            Profile
          </p>
          <h2 className="text-5xl tracking-[-0.04em] text-(--text-h) md:text-6xl">
            Hi, I'm Nikola.
          </h2>
        </motion.div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Photo + quick facts */}
          <aside className="flex shrink-0 flex-col gap-5 md:w-64">
            <motion.img
              {...reveal(0.15)}
              src={profileImage}
              alt="Nikola Vujić"
              className="aspect-square w-40 rounded-2xl border border-(--border) object-cover md:w-full"
            />
            <motion.dl
              {...reveal(0.25)}
              className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-(--border) bg-(--code-bg) p-5 md:grid-cols-1">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-(--accent)">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-(--text-h)">{fact.value}</dd>
                </div>
              ))}
            </motion.dl>
          </aside>

          {/* About */}
          <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-(--text) md:text-base">
            <motion.p {...reveal(0.35)}>
              I'm a software engineer from Serbia. Most of my work so far has been on the
              frontend. Since 2022 I've been working on a large Angular SaaS platform at SquidFlow:
              support ticketing, real-time chat, a query editor, a file manager, admin and
              permission flows, and the less visible work of keeping it up to date across several
              major Angular versions. I also prototyped, released and led its companion mobile app
              in Flutter.
            </motion.p>
            <motion.p {...reveal(0.43)}>
              Before that I was at Delux, writing software for connected devices - a mobile app for
              monitoring a system remotely, and the tablet app for an automated beer-tap cleaning
              system. I got into programming through electronics and telecommunications, so I
              still like knowing what happens underneath the screen.
            </motion.p>
            <motion.p {...reveal(0.51)}>
              Lately I've been working my way down the stack: APIs with Node and Postgres, Docker,
              CI/CD, and actually deploying and running the things I build. I use AI tools every
              day. The next step is building AI features into products, not only using AI to write
              code.
            </motion.p>
            <motion.p {...reveal(0.59)}>
              What I care about in my work: finishing things rather than starting new ones, writing code the
              next person (or agent) can read, and testing my own work before I call it done.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="h-[80vh] shrink-0" />
    </section>
  );
}
