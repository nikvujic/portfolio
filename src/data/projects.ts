import type { Project } from '../types/project';
import portfolio1 from '../assets/images/portfolio1.webp';
import portfolio2 from '../assets/images/portfolio2.webp';
import simpleKanban2 from '../assets/images/simple-kanban2.webp';
import theApp1 from '../assets/images/the-app1.webp';
import theApp2 from '../assets/images/the-app2.webp';
import theApp3 from '../assets/images/the-app3.webp';
import theApp4 from '../assets/images/the-app4.webp';
import theApp5 from '../assets/images/the-app5.webp';
import theApp6 from '../assets/images/the-app6.webp';
import tokenTracker1 from '../assets/images/token-tracker1.webp';
import tokenTracker2 from '../assets/images/token-tracker2.webp';
import tokenTracker3 from '../assets/images/token-tracker3.webp';

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'An interactive personal portfolio with an animated intro sequence, snap-scrolled sections, and a light and dark theme.',
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
      'Built from scratch as a showcase of frontend craft - featuring a multi-phase animated intro, a theme system with CSS design tokens, snap-scroll section navigation with an active indicator. A planned next step is an AI chat that answers questions about my CV.\n\nDeployed to AWS Amplify with a custom domain (portfolio.nv-platform.com) via Route 53 and managed TLS. CI/CD runs on GitHub Actions - lint and build gate every push to main, then trigger an Amplify deployment via webhook.',
    images: [portfolio1, portfolio2],
    link: 'https://github.com/nikvujic/portfolio',
  },
  {
    id: 'simple-kanban',
    title: 'Simple Kanban',
    description:
      'A minimal personal kanban for tracking projects and ideas - boards, lists, cards, and drag and drop. Works fully offline as a guest, or signed-in with backend persistence.',
    status: 'in-progress',
    type: 'productivity',
    technologies: [
      { name: 'React',           category: 'frontend' },
      { name: 'TypeScript',      category: 'frontend' },
      { name: 'Redux Toolkit',   category: 'frontend' },
      { name: 'React Router',    category: 'frontend' },
      { name: '@hello-pangea/dnd', category: 'frontend' },
      { name: 'Node.js',         category: 'backend'  },
      { name: 'Express',         category: 'backend'  },
      { name: 'Prisma',          category: 'backend'  },
      { name: 'PostgreSQL',      category: 'backend'  },
      { name: 'JWT',             category: 'backend'  },
      { name: 'Vite',            category: 'devops'   },
      { name: 'Docker',          category: 'devops'   },
      { name: 'AWS Amplify',     category: 'devops'   },
    ],
    detailedOverview:
      'A clean, focused kanban for managing my own project pipeline - organized into boards, lists, and cards with smooth drag-and-drop reordering. Guest mode keeps everything in localStorage with JSON import/export, so the app is fully usable without an account. Signed-in mode persists everything via a REST API with JWT auth.\n\nFrontend is React + Redux Toolkit, deployed to AWS Amplify. Backend is Express + Prisma on PostgreSQL, packaged with Docker Compose for local dev and deployment.',
    images: [simpleKanban2],
    link: 'https://github.com/nikvujic/simple-kanban',
    liveUrl: 'https://simple-kanban.nv-platform.com',
  },
  {
    id: 'schuldencheck',
    title: 'Schuldencheck',
    description:
      'An app for people in Germany who are in debt - it reads collection and reminder emails, pulls out creditors, amounts and deadlines, and turns them into a clear overview to take to debt counseling.',
    status: 'in-progress',
    type: 'production',
    technologies: [
      { name: 'TypeScript',  category: 'frontend' },
      { name: 'TBD',         category: 'frontend' },
      { name: 'Zod',         category: 'backend'  },
      { name: 'TBD',         category: 'backend'  },
      { name: 'pnpm',        category: 'devops'   },
      { name: 'Turborepo',   category: 'devops'   },
      { name: 'TBD',         category: 'devops'   },
    ],
    detailedOverview:
      'Debt letters are confusing: the same debt gets sold on from the original creditor to a collection agency and then to a debt buyer, each with its own file number and deadlines. The app groups all of that into cases and sorts them by urgency. It is always on the debtor\'s side and gives no legal advice.\n\nVery early stage (working title). So far: product and architecture docs with decision records, a TypeScript monorepo (pnpm + Turborepo), Zod domain schemas, and the skeleton of a rules-based extraction engine with an evaluation CLI to measure how well it reads real letters. Next up is an Expo (React Native) app with a web demo.',
  },
  {
    id: 'the-app',
    title: 'The App',
    description:
      'A private, offline Android app I use every day - notes, a shopping list, a planner, a medicine tracker and more in one place, replacing several store apps full of ads and sign-ups.',
    status: 'in-progress',
    type: 'productivity',
    technologies: [
      { name: 'Flutter',          category: 'frontend' },
      { name: 'Dart',             category: 'frontend' },
      { name: 'Riverpod',         category: 'frontend' },
      { name: 'GitHub Actions',   category: 'devops'   },
      { name: 'Kotlin',           category: 'other'    },
      { name: 'Android',          category: 'other'    },
      { name: 'Argon2id',         category: 'other'    },
      { name: 'AES-256-GCM',      category: 'other'    },
    ],
    detailedOverview:
      'Built for my own phone around three rules: few taps, never lose data, keep it private. Notes, a shopping list and a day planner, plus a Hub of smaller tools - medicine reminders, recipes, a food tracker, subscriptions, packing lists and more. Pip, a small pixel robot, lives in the side menu and reacts to the time of day, the seasons and the weather.\n\nEverything stays on the phone, with optional master-password locking (Argon2id + AES-256-GCM) and plain or encrypted backups. An architecture test enforces the layered structure, and frozen samples of every past file format keep old backups readable - 2,280 tests in total. GitHub Actions runs CI on every push and publishes signed APK releases, about 99 of them since October 2026.',
    images: [theApp1, theApp2, theApp3, theApp4, theApp5, theApp6],
    imageFit: 'contain',
    imagesPerView: 3,
    link: 'https://github.com/nikvujic/mob-util-app',
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
    showAllOnly: true,
  },

];
