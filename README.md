# Nikola Vujic - Portfolio

Personal portfolio SPA built from scratch. Animated intro, snap-scroll sections, theme system, and a coming AI chat interface trained on my CV.

**Live at:** (coming soon...)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Routing | React Router DOM v7 |

---

## Structure

```
/                   Animated intro (shown once, gated by localStorage)
/portfolio          Main content - sticky navbar + snap-scrolled sections
*                   Redirect to /
```

Sections: **Profile** - **AI Summary** - **Projects** - **Technologies** - **CV**

---

## Features

- Multi-phase animated intro sequence with staged text reveals
- Snap-scroll navigation with a sliding active indicator in the navbar
- Dark/light theme via CSS design tokens (`--text`, `--bg`, `--accent`, ...) + View Transition API
- Animated SVG backgrounds with 5 variants (waves, flow, radial, circles)
- Project cards with expandable detail, tech tags, and swipeable image carousel
- Responsive layout with hamburger menu below 900px
- AI Summary section (coming soon) - Claude trained on CV

---

## Dev

```bash
npm run dev       # start dev server
npm run build     # tsc + vite build
npm run lint      # eslint
npm run preview   # preview prod build
```

No test runner configured.
