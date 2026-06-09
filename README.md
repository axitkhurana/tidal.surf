# The Tidal Surf Collective

Sunburnt romantics of silicon. Surfers of the synthetic tide. Code cowboys in pastel polos.

We are [tidal.surf](https://tidal.surf), a collective of wanderers, weirdos, and wireheads who build AI for no reason other than we can—and because it feels like magic every time.

## Development

This is a Next.js project built for static site generation and deployed to GitHub Pages.

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

Build the static site:

```bash
pnpm build
```

The static files will be output to the `./out` directory.

## Blog

The blog is generated statically from `src/lib/blog.ts`.

- `/blog` lists all posts
- `/blog/[slug]` is generated at build time with `generateStaticParams`
- Add a post by adding a new object to the `blogPosts` array

## Deploy

The site is automatically deployed to [tidal.surf](https://tidal.surf) via GitHub Actions when changes are pushed to the `main` branch.

---

*No deadlines. No roadmaps. No pitch decks. Just vibes, breakthroughs, and browser tabs.*
