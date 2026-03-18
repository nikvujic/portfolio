import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/images/profile.jpeg';

const INTRO_SEEN_KEY = 'intro-animation-seen';

const navItems = [
  { label: 'Profile',     id: 'profile'     },
  { label: 'AI Summary',  id: 'ai-summary'  },
  { label: 'Projects',    id: 'projects'    },
  { label: 'Technologies', id: 'technologies' },
  { label: 'CV',          id: 'cv'          },
] as const;

export function Navbar() {
  const navigate = useNavigate();

  const replayIntro = () => {
    localStorage.removeItem(INTRO_SEEN_KEY);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/90 backdrop-blur-sm">
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
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-(--text) transition-colors duration-150 hover:text-(--text-h)"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li aria-hidden="true" className="h-4 w-[1.5px] self-center translate-y-0.5 bg-(--border)" />
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
