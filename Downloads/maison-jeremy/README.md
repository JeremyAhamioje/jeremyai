# Maison Jeremy — Website

Ultra-luxury architectural watch brand website. Built with Vite + React + TypeScript + Tailwind CSS + Framer Motion.

## Stack

- **Vite** — build tool
- **React 18** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations & scroll effects
- **React Router** — client-side routing

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with Hero, Product Showcase, Exploded View, Brand Story, Gallery, Configurator |
| `/collection` | Full product collection |
| `/product/:id` | Individual product detail |
| `/story` | Brand story & philosophy |
| `/configure` | Interactive configurator |
| `/atelier` | Workshop gallery & appointments |

## Design System

| Token | Value |
|-------|-------|
| Obsidian Black | `#0A0A0A` |
| Titanium Grey | `#8A8F99` |
| Surgical Orange | `#FF4D00` |
| Architectural White | `#F0EDE8` |

**Fonts:** Cormorant Garamond (display) · JetBrains Mono (technical) · Instrument Sans (body)

## Cloudinary Images

All watch images are served from Cloudinary. To swap images, update the `images` object in `src/data/products.ts`.

## Adding Products

Edit `src/data/products.ts` — add a new entry to the `products` array following the `Product` interface.
