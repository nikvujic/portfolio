import type { Project } from '../types/project';
import portfolio1 from '../assets/images/portfolio1.png';
import portfolio2 from '../assets/images/portfolio2.png';

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
      { name: 'Vite',           category: 'devops'   },
      { name: 'GitHub',         category: 'devops'   },
    ],
    detailedOverview:
      'Built from scratch as a showcase of frontend craft - featuring a multi-phase animated intro, a theme system with CSS design tokens, snap-scroll section navigation with an active indicator, and a coming AI chat interface trained on my CV. Deployed as a static SPA.',
    images: [portfolio1, portfolio2],
  },
  {
    id: 'project-tracker',
    title: 'Project Tracker',
    description:
      'A lightweight personal kanban board for tracking projects, ideas, and ongoing tasks across different stages.',
    status: 'planned',
    type: 'productivity',
    technologies: [
      { name: 'React',        category: 'frontend' },
      { name: 'TypeScript',   category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Node.js',      category: 'backend'  },
    ],
    detailedOverview:
      'A simple but well-designed tool to manage my own project pipeline - with columns for backlog, in progress, and done. Focused on fast capture and clean UX. Likely synced via a lightweight backend or local-first storage.',
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

];
