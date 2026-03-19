import { motion } from 'framer-motion';
import { Layers, Menu, Moon, Sun } from 'lucide-react';
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
  const { theme, toggleTheme, bgVariant, cycleBgVariant } = useTheme();
  const [activeId, setActiveId] = useState<string>(navItems[0].id);

  useEffect(() => {
    const root = document.querySelector('main');
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { root, threshold: 0.5 },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
            alt="Nikola Vujic"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold tracking-tight text-(--text-h)">
            Nikola Vujic
          </span>
        </div>

        {/* Right: nav links — desktop */}
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
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex cursor-pointer items-center text-(--text) opacity-40 transition-opacity duration-150 hover:opacity-100"
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
              ) : (
                <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
              )}
            </button>
          </li>
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
