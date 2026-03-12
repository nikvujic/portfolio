import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'AI Portfolio Generator',
    category: 'Portfolio App',
    description:
      'An interactive personal website concept with animated skills, AI-generated profile summaries, and polished recruiter-facing presentation.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    status: 'In Progress',
  },
  {
    title: 'Real-Time Notification Center',
    category: 'Frontend Concept',
    description:
      'A product-style dashboard concept focused on event streams, real-time updates, filtering, and clean interaction patterns.',
    tech: ['React', 'TypeScript', 'WebSockets'],
    status: 'Planned',
  },
  {
    title: 'White-Label Admin UI',
    category: 'Case Study',
    description:
      'A scalable admin interface concept showing reusable layouts, customizable branding, and modular component structure.',
    tech: ['Angular', 'TypeScript', 'SCSS'],
  },
  {
    title: 'Mobile Companion Experience',
    category: 'Case Study',
    description:
      'A cross-platform product presentation page focused on feature communication, clean UI hierarchy, and app-style interactions.',
    tech: ['Ionic', 'Angular', 'Firebase'],
  },
];