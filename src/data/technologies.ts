import type { TechGroup } from '../types/technology';

export const techGroups: TechGroup[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'Angular',              level: 'work',     note: 'My main framework since 2022 - a large enterprise SaaS, Angular Material, and migrations across several major versions.' },
      { name: 'TypeScript',           level: 'work',     note: 'The default for everything I write on the web, at work and in my own projects.' },
      { name: 'HTML, CSS, SCSS',      level: 'work',     note: 'Responsive layouts, reusable components and design-system patterns.' },
      { name: 'React',                level: 'projects', note: 'This portfolio and Simple Kanban (Redux Toolkit, React Router).' },
      { name: 'Tailwind CSS',         level: 'projects', note: 'This portfolio - v4, with theme colours as CSS variables.' },
      { name: 'Framer Motion',        level: 'projects', note: 'The intro sequence and transitions on this site.' },
    ],
  },
  {
    title: 'Backend & data',
    items: [
      { name: 'REST APIs, WebSockets', level: 'work',     note: 'Built the WebSocket notification service used by SquidFlow\'s web and mobile apps; integrating secured REST APIs with the backend team.' },
      { name: 'Node.js, Express',      level: 'projects', note: 'The Simple Kanban API - routes, JWT auth middleware, a clean MVC structure.' },
      { name: 'PostgreSQL, Prisma',    level: 'projects', note: 'Simple Kanban - schema, migrations and seeding.' },
      { name: 'Spring Boot, Java',     level: 'work',     note: 'My bachelor\'s thesis - a device-monitoring platform with Spring Security, JPA/Hibernate and MySQL, plus Angular and Flutter clients. Smaller pieces at work.' },
    ],
  },
  {
    title: 'Mobile',
    items: [
      { name: 'Flutter, Dart',  level: 'work',     note: 'Prototyped, released and led SquidFlow\'s companion mobile app. At Delux, a tablet control unit talking to the hardware over Bluetooth. In my own time, The App.' },
      { name: 'Ionic, Cordova', level: 'work',     note: 'At Delux - a mobile app for monitoring connected devices remotely.' },
    ],
  },
  {
    title: 'DevOps & cloud',
    items: [
      { name: 'GitHub Actions',        level: 'work',     note: 'CI/CD at SquidFlow with testing stages and multi-brand builds; lint and build gates and APK releases in my projects.' },
      { name: 'Git',                   level: 'work',     note: 'Every day, over 3,500 contributions on GitHub since 2022.' },
      { name: 'Docker, Docker Compose', level: 'projects', note: 'The Simple Kanban API and database in one compose file. Next: the whole system on its own server.' },
      { name: 'AWS',                   level: 'projects', note: 'Amplify hosting and Route 53 domains for this portfolio and Simple Kanban.' },
      { name: 'Firebase',              level: 'work',     note: 'Push notifications (Cloud Messaging) and App Distribution for SquidFlow\'s mobile app; Firestore in a small freelance app.' },
    ],
  },
  {
    title: 'AI',
    items: [
      { name: 'Claude Code',          level: 'work',     note: 'My daily development tool. I built a VS Code extension to track its token usage.' },
      { name: 'LLM APIs, RAG, MCP',   level: 'learning', note: 'Next on my plan: an MCP server for my kanban and a chat on this site that answers questions about my CV.' },
    ],
  },
  {
    title: 'Other',
    items: [
      { name: 'Python',             level: 'work', note: 'Scripts that automated file handling at Microsoft Development Center Serbia, saving hours every week.' },
      { name: 'C, Arduino, NodeMCU', level: 'work', note: 'Electronics and IoT at Delux - getting connected devices to talk to each other.' },
    ],
  },
];
