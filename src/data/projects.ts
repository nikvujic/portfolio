import type { Project } from '../types/project';
import portfolio1 from '../assets/images/portfolio1.png';
import portfolio2 from '../assets/images/portfolio2.png';
import tokenTracker1 from '../assets/images/token-tracker1.png';
import tokenTracker2 from '../assets/images/token-tracker2.png';
import tokenTracker3 from '../assets/images/token-tracker3.png';

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'An interactive personal portfolio with an animated intro sequence, AI-powered summary interface, and polished recruiter-facing presentation.',
    status: 'in-progress',
    type: 'production',
    technologies: [
      { name: 'React',          category: 'frontend' },
      { name: 'TypeScript',     category: 'frontend' },
      { name: 'Tailwind CSS',   category: 'frontend' },
      { name: 'Framer Motion',  category: 'frontend' },
      { name: 'React Router',   category: 'frontend' },
      { name: 'Vite',            category: 'devops'   },
      { name: 'GitHub Actions',  category: 'devops'   },
      { name: 'AWS Amplify',     category: 'devops'   },
      { name: 'Route 53',        category: 'devops'   },
    ],
    detailedOverview:
      'Built from scratch as a showcase of frontend craft - featuring a multi-phase animated intro, a theme system with CSS design tokens, snap-scroll section navigation with an active indicator, and a coming AI chat interface trained on my CV.\n\nDeployed to AWS Amplify with a custom domain (portfolio.nv-platform.com) via Route 53 and managed TLS. CI/CD runs on GitHub Actions - lint and build gate every push to main, then trigger an Amplify deployment via webhook.',
    images: [portfolio1, portfolio2],
    link: 'https://github.com/nikvujic/portfolio',
    defaultExpanded: true,
  },
  {
    id: 'taskgrid',
    title: 'Taskgrid',
    description:
      'A simple personal kanban board for tracking projects and ideas - with guest-mode local storage and import/export so anyone can use it without an account.',
    status: 'in-progress',
    type: 'productivity',
    technologies: [
      { name: 'React',        category: 'frontend' },
      { name: 'TypeScript',   category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Node.js',      category: 'backend'  },
      { name: 'PostgreSQL',   category: 'backend'  },
      { name: 'AWS',          category: 'devops'   },
    ],
    detailedOverview:
      'A clean, focused kanban for managing my own project pipeline - organized into boards, lists, and cards. Guest users get full functionality via localStorage with import/export support, so no account is needed to use it. Backed by Node.js and PostgreSQL, deployed to AWS.',
  },
  {
    id: 'ai-chat-sandbox',
    title: 'AI Chat Sandbox',
    description:
      'A minimal chat interface for experimenting with AI models and prompt patterns.',
    status: 'planned',
    type: 'sandbox',
    technologies: [
      { name: 'React',        category: 'frontend' },
      { name: 'TypeScript',   category: 'frontend' },
      { name: 'Claude API',   category: 'backend'  },
    ],
    detailedOverview:
      'A throwaway sandbox for testing Claude API integrations, prompt structures, and simple UI patterns around chat. No fixed scope - just a place to try things.',
  },
  {
    id: 'claude-token-tracker',
    title: 'Claude Token Tracker',
    description:
      'A VS Code extension that monitors daily Claude Code token usage in real time - filling the gap of having no built-in visibility until hitting the limit.',
    status: 'completed',
    type: 'productivity',
    technologies: [
      { name: 'VS Code API',  category: 'other'   },
      { name: 'JavaScript',   category: 'backend'  },
      { name: 'Node.js',      category: 'backend'  },
      { name: 'WebSocket',    category: 'backend'  },
    ],
    detailedOverview:
      'Solves the frustrating lack of token usage visibility in Claude Code subscriptions. The extension injects a live side panel showing output tokens consumed today with a color-coded progress bar, per-session input/output/cache metrics, per-request logs, and a day-by-day history. Built on a local WebSocket + HTTP layer that reads from Claude\'s log files, with auto-detected cap management on first overage.\n\nPlanned to expand into a broader Claude Code toolkit - including usage diagrams and other developer insights.',
    images: [tokenTracker1, tokenTracker2, tokenTracker3],
    imageFit: 'contain',
    link: 'https://github.com/nikvujic/simple-claude-token-tracker',
    defaultExpanded: true,
  },

];
