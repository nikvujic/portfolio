import { AnimatePresence, motion } from 'framer-motion';
import { Github, Layers, Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const replayIntro = () => {
    localStorage.removeItem(INTRO_SEEN_KEY);
    navigate('/');
  };

  return (
    <header ref={headerRef} data-theme="dark" className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/90 backdrop-blur-sm">
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
        <ul className="hidden items-center gap-6 min-[900px]:flex">
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

        {/* Mobile: hamburger toggle */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
          className="cursor-pointer text-(--text-h) min-[900px]:hidden"
        >
          {menuOpen
            ? <X className="h-5 w-5" strokeWidth={1.75} />
            : <Menu className="h-5 w-5" strokeWidth={1.75} />
          }
        </button>
      </nav>

      {/* Mobile: slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full border-t border-(--border) bg-(--bg)/95 backdrop-blur-sm px-5 pb-4 pt-3 min-[900px]:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={`w-full cursor-pointer py-2.5 text-left text-sm transition-colors duration-150 ${
                      activeId === item.id
                        ? 'text-(--text-h)'
                        : 'text-(--text) hover:text-(--text-h)'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-4 border-t border-(--border) pt-3">
              {theme === 'dark' && (
                <button
                  type="button"
                  onClick={cycleBgVariant}
                  aria-label="Cycle background"
                  className={`flex cursor-pointer items-center transition-opacity duration-150 hover:opacity-100 ${bgVariant === 'none' ? 'text-(--text) opacity-40' : 'text-(--accent) opacity-70'}`}
                >
                  <Layers className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              )}
              <button
                type="button"
                onClick={() => { setMenuOpen(false); replayIntro(); }}
                className="cursor-pointer text-xs text-(--text) opacity-40 transition-opacity duration-150 hover:opacity-100"
              >
                Replay intro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
