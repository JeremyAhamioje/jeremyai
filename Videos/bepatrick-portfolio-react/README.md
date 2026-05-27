# Jeremy Ahamioje — Portfolio (React + Vite)

Production-ready rebuild of the portfolio. This is a clean, fully working
codebase with all reported issues fixed.

## Requirements

- **Node.js ≥ 22.0.0** (enforced via `package.json` `engines` field)
- npm 10+

Verify your Node version:

```bash
node -v   # should print v22.x.x or higher
```

## Install & run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build → ./dist
npm run preview      # serve the production build locally
npm run typecheck    # tsc --noEmit
```

## What changed in this rebuild

### 1. GSAP / ScrollTrigger memory leaks — fixed
Every animated component now uses **only** `gsap.context(...)` scoped to a
local element, with cleanup via `ctx.revert()`. The previous codebase
sometimes called `ScrollTrigger.getAll().forEach(t => t.kill())` on unmount,
which kills triggers owned by *sibling* components and causes cross-component
breakage. That pattern is gone from every file. The `WorksScroll` section
also defers init to `requestAnimationFrame` so pin-spacing layout is measured
correctly.

### 2. CSS panel bleed — fixed
- `.panel-bg` height changed from `120%` → `100%`, so the parallax layer can
  no longer overflow into the section below.
- `transform: translateZ(0)` forces a GPU compositing layer (kills paint
  bleed).
- `isolation: isolate` added to every full-bleed section (`.story-panel`,
  `.hero-section`, `.about-section`, `.tools-section`, `.affairs-section`,
  `.footer-section`) so child stacking contexts can't escape their parent.

### 3. Duplicate `Projects` component — fixed
The original repo had `src/components/sections/Projects.tsx` (a home-page
horizontal scroll section) and `src/pages/projects.tsx` (the full all-works
page). Both exported `Projects`, which produced ambiguous imports. The home
section is now `src/components/sections/WorksScroll.tsx`. The page is
`src/pages/Projects.tsx` (proper PascalCase).

### 4. Dangerous global selector — removed
The old `pages/projects.tsx` injected a global `<style>` block targeting
`.story-panel > div:last-child` — which silently restyled any `:last-child`
inside *every* `.story-panel`, including the parallax-bg div. That block is
gone. The mobile responsive rule now lives in `index.css` scoped to the
`.panel-content-inner` class on the content grid.

### 5. `Services.tsx` syntax error — fixed
The page had a stray `y` character after a self-closing `<div />` (line 111
in the original), which broke the TypeScript build. The whole page has been
rewritten cleanly. The hero image now uses `object-fit: cover` for a proper
hero treatment.

### 6. React `StrictMode` GSAP double-fire — removed safely
StrictMode double-invokes every effect in dev, which doubled GSAP instances
and broke ScrollTrigger pinning. Since every effect in this codebase already
uses `gsap.context()` for correct cleanup, removing StrictMode adds no risk.
A defense-in-depth `didAnimateLabels` ref guard is also added in
`pages/Home.tsx` for the global `.sec-label` animator.

### 7. Tools section layout — fixed
`Tools.tsx` is replaced with the centered, constrained-width version
(max-width: 900px) using a responsive `aspectRatio: 1/1` grid (4 cols
desktop → 3 cols ≤1024 → 2 cols ≤640) so tiles never stretch.

### 8. Hero images for `/projects` and `/services` — set
- `/projects` hero → `download_17_q9yz8t.jpg`
- `/services` hero → `Programmer_Cat1_tee8ls.jpg`

### 9. Footer overlap — fixed
`.footer-section` now has `isolation: isolate`, `position: relative` and
`z-index: 1`, so the parallax background of the prior section cannot bleed
on top of the footer.

### 10. Broken CSS import — fixed
`main.tsx` had `import '@./index.css'` (invalid path). Now: `import './index.css'`.

### 11. Lowercase JSX bug — fixed
`main.tsx` referenced `<projects />` (lowercase = HTML element, not React
component). Now `<Projects />`.

## Project structure

```
.
├── index.html
├── package.json                 # Node 22+ engines
├── tsconfig.json                # ES2022 target
├── vite.config.ts               # ES2022 build target
└── src/
    ├── main.tsx                 # no StrictMode, correct imports
    ├── index.css                # isolation:isolate on every full-bleed section
    ├── contexts/
    │   └── ThemeContext.tsx
    ├── hooks/
    │   ├── useCursor.ts
    │   ├── useNavbar.ts
    │   ├── usePageTransition.ts
    │   └── useGsapReveal.ts     # gsap.context-only cleanup
    ├── lib/
    │   └── constants.ts
    ├── components/
    │   ├── ui/
    │   │   ├── Cursor.tsx
    │   │   ├── Navbar.tsx
    │   │   └── Preloader.tsx
    │   └── sections/
    │       ├── Hero.tsx
    │       ├── About.tsx
    │       ├── WorksScroll.tsx  # renamed from Projects.tsx
    │       ├── Tools.tsx        # replaced with constrained-grid version
    │       ├── Services.tsx
    │       ├── Affairs.tsx
    │       ├── Footer.tsx
    │       └── StoryPanel.tsx   # gsap.context cleanup only
    └── pages/
        ├── Home.tsx             # uses WorksScroll
        ├── Projects.tsx         # download_17_q9yz8t.jpg hero
        └── Services.tsx         # Programmer_Cat1_tee8ls.jpg hero
```

## Cleanup pattern (reference)

If you add another animated section, follow this exact pattern:

```tsx
useEffect(() => {
  const el = sectionRef.current
  if (!el) return

  const ctx = gsap.context(() => {
    // tweens + ScrollTriggers here
  }, el)

  return () => ctx.revert()   // ← the only cleanup you need
}, [])
```

Do **not** call `ScrollTrigger.getAll().kill()` anywhere. Do **not** track
triggers manually. `ctx.revert()` is sufficient and correct.
