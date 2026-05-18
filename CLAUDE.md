# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then produce a production build via Vite
- `npm run lint` — run ESLint across the repo
- `npm run preview` — preview the production build locally

There is no test runner configured.

## Architecture

This is a minimal Vite + React 19 + TypeScript starter (the default `@vitejs/plugin-react` template). All app code lives in `src/`:

- `src/main.tsx` — entry point, mounts `<App />` into `#root` from `index.html`
- `src/App.tsx` — single-page component containing the entire UI (hero, counter, and "next steps" links)
- `src/App.css`, `src/index.css` — component and global styles
- `public/` — static assets served at the site root (e.g. `/icons.svg` referenced via SVG `<use>` in `App.tsx`)

TypeScript uses project references: `tsconfig.json` composes `tsconfig.app.json` (app sources) and `tsconfig.node.json` (Vite config). Both must compile for `npm run build` to succeed.

ESLint is configured in flat-config form (`eslint.config.js`) with `typescript-eslint`, `react-hooks`, and `react-refresh` plugins. The README documents how to opt into type-aware lint rules and React-specific plugins if needed.
