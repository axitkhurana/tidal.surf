# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js static site generator project configured for GitHub Pages deployment. The project uses TypeScript, Tailwind CSS v4, and is built for static export.

## Package Manager

Use `pnpm` for all package management operations. The project is configured with pnpm and the GitHub Actions workflow expects it.

## Common Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build static site (outputs to `./out` directory)  
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server (not typically used for static sites)

## Architecture

### Static Site Generation
- Configured with `output: 'export'` in `next.config.ts`
- Images are unoptimized (`unoptimized: true`) for static hosting compatibility
- Trailing slashes enabled for GitHub Pages
- Build output goes to `./out` directory

### File Structure
- `src/app/` - Next.js App Router pages and components
- `src/app/page.tsx` - Homepage component
- `src/app/layout.tsx` - Root layout
- `src/app/globals.css` - Global styles with Tailwind directives

### Styling
- Tailwind CSS v4 with PostCSS integration
- Dark mode support configured in components
- Responsive design patterns used throughout

### Deployment
- Automated GitHub Actions workflow in `.github/workflows/deploy.yml`
- Deploys on push to `main` branch
- Uses pnpm for dependency management in CI
- Requires GitHub Pages to be enabled with "GitHub Actions" as source
- `.nojekyll` file prevents Jekyll processing

## Important Configuration Notes

- TypeScript strict mode enabled
- ESLint with Next.js configuration
- No test framework currently configured
- React 19 and Next.js 15 used