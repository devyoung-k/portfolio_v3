# CLAUDE.md

## Project Overview

Portfolio v3 is a personal portfolio website built with React 19, TypeScript, and Vite. It features interactive animations, dark mode support, project showcasing, and a responsive design.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7 with `@tailwindcss/vite` plugin
- **Styling**: Tailwind CSS 4 + CSS custom properties for theming
- **Animation**: Motion 12 (Framer Motion compatible)
- **Routing**: React Router 7
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Type check + production build
pnpm lint       # Run ESLint
pnpm preview    # Preview production build
```

## Project Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Route-level page components
├── data/         # Static data (profile.ts, projects.ts)
├── styles/       # Global CSS (fonts, tailwind, theme)
├── App.tsx       # Router setup + dark mode logic
└── main.tsx      # Entry point
```

## Architecture & Key Patterns

### Data Management

All content is centralized in `src/data/`:

- `profile.ts` — Personal info, social links
- `projects.ts` — Project array with metadata (`Project` interface)

To add a new project, add an entry to the `projects` array in `projects.ts`.

### Routing

Routes are defined in `App.tsx` using React Router `BrowserRouter`. Each page in `src/pages/` maps to a route.

### Dark Mode

- Toggled by adding/removing the `dark` class on `document.documentElement`
- Persisted to `localStorage`
- System preference used as fallback on first load
- Colors defined as CSS variables in `src/styles/theme.css`

### Theming (CSS Variables)

Semantic color variables in `theme.css`:

```
--background, --foreground
--card, --card-foreground
--accent, --muted, --border
--primary, --secondary
```

Light and dark values are defined separately under `:root` and `.dark`.

### Animations

Uses the Motion library. Common patterns:

- `whileInView` for scroll-triggered reveals
- `whileHover` / `whileTap` for interaction
- Spring physics (`stiffness`, `damping`) for natural motion
- Staggered animations via incremental `transition.delay`

### Path Alias

`@` resolves to `./src` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Component Conventions

- Functional components only
- Props typed via explicit interfaces
- `useRef` for DOM and animation refs; `useCallback` for event handlers
- Clean up `useEffect` subscriptions/listeners on unmount
- PascalCase filenames for components, camelCase for data/utilities

## Styling Conventions

- Tailwind-first; custom utilities in `theme.css` for non-standard effects
- Avoid inline styles except for dynamic gradient values
- Responsive via Tailwind prefixes (`md:`, `lg:`)
- Typography uses Pretendard Variable (Korean support) + Fira Code for monospace
