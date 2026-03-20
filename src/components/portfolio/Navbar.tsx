import { motion } from 'framer-motion';
import { Github, Layers, Linkedin, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/useTheme';
import profileImage from '../../assets/images/profile.jpeg';

const INTRO_SEEN_KEY = 'intro-animation-seen';

const navItems = [
  { label: 'Profile',      id: 'profile'      },
  { label: 'AI Summary',   id: 'ai-summary'   },
  { label: 'Projects',     id: 'projects'     },
  { label: 'Technologies', id: 'technologies' },
  { label: 'CV',           id: 'cv'           },
] as const;

export function Navbar() {
  const navigate = useNavigate();
  const { theme, bgVariant, cycleBgVariant } = useTheme();
  const [activeId, setActiveId] = useState<string>(navItems[0].id);

  useEffect(() => {
    const root = document.querySelector('main');
    if (!root) return;

    const update = () => {
      const scrollTop = root.scrollTop;
      let bestId = navItems[0].id;
      let bestDist = Infinity;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (!el) continue;
        const dist = Math.abs(el.offsetTop - scrollTop);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }
      setActiveId(bestId);
    };

    update();
    root.addEventListener('scroll', update, { passive: true });
    return () => root.removeEventListener('scroll', update);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const replayIntro = () => {
    localStorage.removeItem(INTRO_SEEN_KEY);
    navigate('/');
  };

  return (
    <header data-theme="dark" className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-5 py-3 md:px-12">
        {/* Left: profile + name */}
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold tracking-tight text-(--text-h)">
            Nikola Vujic
          </span>
          <div className="flex items-center gap-2 ml-2">
            <a
              href="https://github.com/nikvujic"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-(--accent-border) bg-(--accent-bg)/75 text-(--text-h) transform-gpu transition-[transform,border-color,background-color] duration-200 hover:transform-[translateY(-2px)] hover:border-(--accent) hover:bg-(--accent-bg)"
            >
              <Github className="h-3.5 w-3.5 translate-x-px translate-y-[0.5px]" strokeWidth={1.9} />
            </a>
            <a
              href="https://linkedin.com/in/nikola-vujić-aa9687152"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-(--accent-border) bg-(--accent-bg)/75 text-(--text-h) transform-gpu transition-[transform,border-color,background-color] duration-200 hover:transform-[translateY(-2px)] hover:border-(--accent) hover:bg-(--accent-bg)"
            >
              <Linkedin className="h-3.5 w-3.5 translate-x-px" strokeWidth={1.9} />
            </a>
          </div>
        </div>

        {/* Right: nav links - desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {theme === 'dark' && (
            <li>
              <button
                type="button"
                onClick={cycleBgVariant}
                aria-label="Cycle background"
                className={`flex cursor-pointer items-center transition-opacity duration-150 hover:opacity-100 ${bgVariant === 'none' ? 'text-(--text) opacity-40' : 'text-(--accent) opacity-70'}`}
              >
                <Layers className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </li>
          )}
          <li aria-hidden="true" className="h-4 w-[1.5px] self-center bg-(--border)" />
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`cursor-pointer text-sm transition-colors duration-150 ${
                  activeId === item.id
                    ? 'text-(--text-h)'
                    : 'text-(--text) hover:text-(--text-h)'
                }`}
              >
                {item.label}
              </button>
              {activeId === item.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-(--accent)"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </li>
          ))}
          <li aria-hidden="true" className="h-4 w-[1.5px] self-center bg-(--border)" />
          <li>
            <button
              type="button"
              onClick={replayIntro}
              className="cursor-pointer text-xs text-(--text) opacity-40 transition-opacity duration-150 hover:opacity-100"
            >
              Replay intro
            </button>
          </li>
        </ul>

        {/* Mobile: hamburger placeholder */}
        <button
          type="button"
          aria-label="Open menu"
          className="cursor-pointer text-(--text-h) md:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </nav>
    </header>
  );
}
