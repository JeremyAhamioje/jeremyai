# Pagani

A Next.js 15 (App Router) website built with React 18, TypeScript,
Tailwind CSS, Radix UI and GSAP.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:9002

## Scripts

- `npm run dev`       — start the dev server (Turbopack) on port 9002
- `npm run build`     — production build
- `npm run start`     — serve the production build
- `npm run lint`      — run Next.js lint
- `npm run typecheck` — run the TypeScript compiler with no emit

## Project structure

```
src/
  app/         App Router pages and layout
  components/  UI and section components
  hooks/       custom React hooks
  lib/         data and utilities
```

## Notes

Exported from Firebase Studio. The Firebase Studio / Project IDX scaffolding
has been removed, along with the unused Genkit AI and Firebase SDK code, so
the project installs and runs as a plain Next.js app.
