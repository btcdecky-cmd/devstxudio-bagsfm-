# Dev Studio

A private atelier for public builders — a members' platform for developers who build in public. Track projects, share updates, compete in the AI Agent Arena, generate apps with AI, and incubate on-chain businesses.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Bun](https://img.shields.io/badge/Bun-1.x-fbf0df)

## Features

- **Explore** — Discover projects, filter by category and status, follow builders
- **Live Build Feed** — Real-time stream of commits, deploys, launches, and IPOs
- **AI Agent Arena** — Poker-playing agents competing in 6-max NLHE with prizepools and leaderboards
- **AI App Builder** — Describe an app in natural language and have it built in under a minute
- **Incubator & IPO** — Bundle apps into on-chain houses, run pump.fun IPOs with vesting
- **Builders** — Directory of builders ranked by followers, with stack chips and project previews
- **Studio** — Personal dashboard for managing projects, tracking stats, and posting updates
- **GitHub Finder** — Search public GitHub repositories by name, topic, or owner
- **Developer Access** — Verify pump.fun (bagsfm) token ownership to request access

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Package manager | Bun |
| Linting | ESLint |
| Styling | Custom dark + gold theme with glassmorphism |
| Blockchain | Solana, @solana/web3.js, @solana/spl-token-registry |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.1

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun build
bun start
```

### Lint

```bash
bun lint
```

### Typecheck

```bash
bun typecheck
```

## Project Structure

```
src/
  app/
    layout.tsx              Root layout (SiteHeader + children + SiteFooter)
    page.tsx                Home / landing page
    not-found.tsx           404 page
    projects/
      page.tsx              Explore projects
      [slug]/page.tsx       Project detail
    builders/page.tsx       Builders directory
    dashboard/page.tsx      Studio — current user profile
    arena/page.tsx          AI Agent Arena
    builder/page.tsx        AI App Builder
    incubator/page.tsx      Incubator & IPO
    live/page.tsx           Live Build Feed
    github/
      page.tsx              GitHub Repository Finder
    access/
      page.tsx              Developer Access (pump.fun verification)
    globals.css             Tailwind theme tokens, utilities, animations
  components/
    site-header.tsx         Sticky nav
    site-footer.tsx         Footer
    project-card.tsx        Project card
    project-explorer.tsx    Search/filter explorer (client)
    status-badge.tsx        Status pill
    avatar.tsx              Avatar + Stat subcomponents
    update-timeline.tsx     Build-log timeline
    live-feed.tsx           Streaming feed (client)
    app-builder-demo.tsx    Interactive builder demo (client)
    mobile-nav.tsx          Mobile slide-out menu (client)
    mobile-bottom-nav.tsx   Mobile bottom tab bar (client)
    github-repo-finder.tsx  GitHub repository search (client)
    token-badge.tsx         Solana token badge with logo (client)
    access-request.tsx      Developer access verification (client)
  lib/
    data.ts                 Mock data, types, and helpers
    solana.ts               Solana token registry + web3.js utilities
```

## Design System

- **Palette**: Near-black surfaces (`ink-*`), gold/amber accents (`brand-*`, `gold-*`, `accent-*`)
- **Typography**: Serif headings (`--font-serif`: Iowan / Palatino / Georgia), sans-serif body
- **Effects**: Glassmorphism header/footer, radial gold gradients, hairline borders
- **Animations**: `pulse-dot`, `spin-slow`, `fadeIn`
- **Utilities**: `.glass`, `.gradient-text`, `.eyebrow`, `.rule`, `.card-hover`, `.btn-gold`, `.btn-ghost`

### Mobile UX

- Slide-out navigation menu from the right edge
- Fixed bottom tab bar for primary destinations
- Arena leaderboard switches to horizontal scroll on narrow viewports
- Two-column layouts collapse to single column with stacked sidebars
- All interactive targets meet 44px minimum touch size
- Safe area insets handled via `pb-safe` utility

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Run production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript compiler (no emit) |

## CI/CD

GitHub Actions runs on every push and pull request to `main`:

- **Lint** — `bun lint`
- **Typecheck** — `bun typecheck`
- **Build** — `npx next build`

On pull requests, a preview deployment is published. On pushes to `main`, a production deployment is published.

Workflow file: `.github/workflows/ci.yml`

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `bun typecheck` and `bun lint` pass locally
4. Ensure the GitHub Actions CI checks pass on your PR
5. Commit with a descriptive message
6. Push and open a pull request

## License

Private — all rights reserved.
