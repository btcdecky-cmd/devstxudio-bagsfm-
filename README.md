# Dev Studio

> **Build in public. Create projects, share updates, and track development progress while your community follows the journey from idea to launch.**

Dev Studio is a modern platform for developers who want to build transparently and connect with a thriving community. Create projects, share real-time updates, compete in AI poker tournaments, generate apps with AI, and launch tokenized projects on Solana.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Solana](https://img.shields.io/badge/Solana-Web3-14F195?logo=solana)](https://solana.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

## ✨ Features

### 🚀 Core Platform
- **Explore Projects** — Discover what developers are building with filtering by category, status, and search
- **Build in Public** — Share your journey with real-time updates, milestones, and progress tracking
- **Live Feed** — See commits, deployments, launches, and milestones as they happen across the community
- **Builder Directory** — Connect with talented developers ranked by followers and engagement
- **Studio Dashboard** — Manage your projects, track statistics, and post updates

### 🤖 AI-Powered Features
- **AI Agent Arena** — Build poker-playing AI agents and compete in 6-max No Limit Hold'em tournaments
  - Real prize pools in SOL
  - ELO rating system
  - Live tournament streaming
  - Agent training & optimization
- **AI App Builder** — Generate full-stack applications from natural language descriptions
  - Integrated with Vercel AI SDK
  - Deploy in minutes
  - Automatic code generation

### 💰 Tokenomics & Web3
- **Incubator & IPO** — Bundle projects into houses and launch token offerings
  - On-chain deployment to Solana
  - Vesting schedules
  - Pump.fun integration
- **Token-Gated Access** — Verify bagsfm token ownership for exclusive features
- **Solana Integration** — Native Web3 capabilities with @solana/web3.js

### 📊 Community
- **GitHub Integration** — Search and sync public repositories
- **Social Features** — Follow builders, projects, and updates
- **Leaderboards** — Rank by followers, projects, and earnings

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + Next.js 16 (App Router) |
| **Language** | TypeScript 5.9 (strict mode) |
| **Styling** | Tailwind CSS 4 + Custom CSS |
| **UI Framework** | Headless components with Radix primitives |
| **Package Manager** | Bun |
| **Linting** | ESLint 9 |
| **Backend** | Next.js API Routes |
| **Database** | Mock in-memory (ready for integration) |
| **Authentication** | JWT via Auth0/Supabase (TODO) |
| **Blockchain** | Solana Web3.js, SPL Token Registry |
| **Hosting** | Vercel |

### Project Structure

```
dev-studio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with Header/Footer
│   │   ├── page.tsx                  # Home / landing page
│   │   ├── not-found.tsx             # 404 page
│   │   ├── globals.css               # Tailwind + custom theme
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects explorer
│   │   │   └── [slug]/page.tsx       # Project detail view
│   │   ├── builders/page.tsx         # Builders leaderboard
│   │   ├── dashboard/page.tsx        # User dashboard (Studio)
│   │   ├── arena/page.tsx            # AI Agent Arena
│   │   ├── builder/page.tsx          # AI App Builder
│   │   ├── incubator/page.tsx        # Incubator & IPO
│   │   ├── live/page.tsx             # Live build feed
│   │   ├── github/page.tsx           # GitHub finder (TODO)
│   │   ├── access/page.tsx           # Token gating
│   │   └── api/
│   │       ├── projects/             # Project endpoints
│   │       ├── users/                # User endpoints
│   │       ├── updates/              # Update endpoints
│   │       ├── feed/                 # Feed endpoints
│   │       ├── agents/               # Agent endpoints
│   │       ├── houses/               # House endpoints
│   │       └── access/               # Access verification
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── button.tsx            # Button with variants
│   │   │   ├── card.tsx              # Card containers
│   │   │   └── badge.tsx             # Status badges
│   │   ├── site-header.tsx           # Navigation header
│   │   ├── site-footer.tsx           # Footer
│   │   ├── project-card.tsx          # Project card
│   │   ├── status-badge.tsx          # Status display
│   │   └── avatar.tsx                # User avatar + stats
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces
│       ├── constants.ts              # App constants
│       ├── errors.ts                 # Error classes
│       ├── utils.ts                  # Utility functions
│       ├── validators.ts             # Input validation
│       ├── solana.ts                 # Solana utilities
│       ├── api-client.ts             # API client
│       ├── api-middleware.ts         # API middleware
│       ├── db.ts                     # Mock database
│       └── hooks/
│           ├── use-projects.ts       # Projects hook
│           ├── use-user.ts           # User hook
│           └── use-feed.ts           # Feed hook
├── middleware.ts                     # Next.js middleware
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint config
├── postcss.config.mjs                # PostCSS config
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Dark ink (`#0f0f0f` - `#404040`)
- **Accent**: Gold (`#d4af37`) with variants
- **Success**: Green (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Error**: Red (`#ef4444`)
- **Info**: Blue (`#3b82f6`)

### Typography
- **Headings**: Serif (Georgia, Iowan Old Style)
- **Body**: System sans-serif (-apple-system, Segoe UI, Roboto)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Components
- **Glassmorphism** — Frosted glass effect with backdrop blur
- **Gradient Text** — Gold-to-accent gradient for emphasis
- **Smooth Animations** — Fade-in, pulse, and spin-slow
- **Status Badges** — Idea, Building, Beta, Launched, IPO states

### Responsive Design
- Mobile-first approach
- Touch-friendly targets (44px minimum)
- Bottom safe area for mobile notches
- Adaptive layouts for tablet/desktop

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.1+
- **Solana Wallet** (for testing token verification)
- **Git** 2.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/btcdecky-cmd/devstxudio-bagsfm-
   cd devstxudio-bagsfm-
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the following variables:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_BAGSFM_MINT=<token-mint-address>
   ```

4. **Start development server**
   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Commands

```bash
# Start development server with hot reload
bun dev

# Build for production
bun build

# Start production server
bun start

# Run linter
bun lint

# Type check
bun typecheck

# Format code (if prettier configured)
bun format
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://devstudio.bagsfm.com/api`

### Authentication
All authenticated endpoints require:
```
Authorization: Bearer <jwt-token>
X-User-ID: <user-id>
```

### Endpoints

#### Projects
- `GET /api/projects` — List all projects (paginated)
- `POST /api/projects` — Create a new project (auth required)
- `GET /api/projects?status=building&category=finance` — Filter projects
- `GET /api/projects/[slug]` — Get project details
- `PATCH /api/projects/[slug]` — Update project (auth required)

#### Users
- `GET /api/users` — List all users
- `GET /api/users/me` — Get current user (auth required)
- `GET /api/users?search=john` — Search users

#### Updates
- `GET /api/updates?projectId=proj_1` — Get project updates
- `POST /api/updates` — Create update (auth required)

#### Feed
- `GET /api/feed?limit=50` — Get live feed events

#### AI Agents
- `GET /api/agents` — List all agents
- `POST /api/agents` — Create new agent (auth required)

#### Houses
- `GET /api/houses` — List all houses
- `POST /api/houses` — Create new house (auth required)

#### Access
- `POST /api/access` — Verify token ownership

### Response Format

**Success (200)**
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

**Paginated Success (200)**
```json
{
  "success": true,
  "data": [ /* items */ ],
  "total": 100,
  "page": 1,
  "page_size": 20,
  "total_pages": 5
}
```

**Error (400/401/404/500)**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🔐 Security

- **Strict TypeScript** — No `any` types, full type safety
- **Input Validation** — All inputs validated before processing
- **CORS** — Configured for production domain
- **Helmet** — Security headers (TODO: implement)
- **Rate Limiting** — Implemented per endpoint (TODO: complete)
- **Solana Integration** — Secure wallet verification

## 📊 Analytics & Monitoring

- **Error Tracking** — Sentry integration (TODO)
- **Performance Monitoring** — Web Vitals tracking
- **User Analytics** — PostHog (TODO)
- **Logs** — Winston + Datadog (TODO)

## 🧪 Testing

```bash
# Unit tests (TODO)
bun test

# E2E tests (TODO)
bun test:e2e

# Coverage
bun test:coverage
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables (Production)

Set these in Vercel dashboard:

```
NEXT_PUBLIC_SITE_URL=https://devstudio.bagsfm.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_BAGSFM_MINT=<production-mint>
DATABASE_URL=<database-connection>
JWT_SECRET=<secret-key>
Auth0_SECRET=<auth0-secret>
```

## 🤝 Contributing

We welcome contributions from the community! 

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Commit** with descriptive messages (`git commit -m 'feat: add amazing feature'`)
5. **Push** to your fork (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Development Workflow

```bash
# Create feature branch
git checkout -b feat/user-authentication

# Make changes and test
bun dev
bun lint
bun typecheck

# Commit
git commit -m "feat: add user authentication with JWT"

# Push and create PR
git push origin feat/user-authentication
```

### Code Standards

- **TypeScript**: Strict mode, no `any` types
- **ESLint**: All rules must pass
- **Formatting**: Consistent with Prettier (if configured)
- **Components**: Functional with hooks
- **Naming**: camelCase for functions/variables, PascalCase for components
- **Comments**: JSDoc for public functions
- **Git Commits**: Use Conventional Commits

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Tailwind styles not loading
```bash
# Rebuild Tailwind
bun run build

# Clear cache
rm -rf .next
bun dev
```

### Solana connection issues
- Check RPC endpoint is accessible
- Verify network (devnet vs mainnet)
- Test with `curl https://api.devnet.solana.com`

### TypeScript errors
```bash
# Type check
bun typecheck

# Type check in watch mode
bun typecheck --watch
```

## 📖 Documentation

- [API Documentation](./docs/API.md) (TODO)
- [Component Guide](./docs/COMPONENTS.md) (TODO)
- [Deployment Guide](./docs/DEPLOYMENT.md) (TODO)
- [Contributing Guide](./CONTRIBUTING.md) (TODO)
- [Architecture Decision Records](./docs/adr/) (TODO)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform MVP
- ✅ Project explorer
- ✅ Builder directory
- ✅ Design system
- ⏳ Mock API endpoints

### Phase 2 (Q3 2026)
- 🔄 Real database (PostgreSQL + Prisma)
- 🔄 Authentication (Auth0/Supabase)
- 🔄 Solana wallet integration
- 🔄 AI Agent Arena backend

### Phase 3 (Q4 2026)
- 🔄 AI App Builder integration (Vercel AI)
- 🔄 Incubator & IPO (pump.fun)
- 🔄 GitHub sync
- 🔄 Real-time updates (WebSocket)

### Phase 4 (2027)
- 🔄 Mobile app
- 🔄 Advanced analytics
- 🔄 Community moderation
- 🔄 Revenue sharing model

## 💡 Inspiration & References

Built with architectural patterns from:
- [Vercel AI](https://github.com/vercel/ai) — AI integration patterns
- [Agent Browser](https://github.com/vercel-labs/agent-browser) — Agent architecture
- [Shadcn/ui](https://github.com/shadcn-ui/ui) — Component design
- [Solana dApps](https://solana.com) — Web3 integration

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the bagsfm community
- Inspired by builders and creators
- Powered by Solana ecosystem
- Designed with ❤️ and ☕

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/btcdecky-cmd/devstxudio-bagsfm-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/btcdecky-cmd/devstxudio-bagsfm-/discussions)
- **Twitter**: [@bagsfm](https://twitter.com/bagsfm)
- **Discord**: [Join Community](https://discord.gg/bagsfm)

---

**Made by builders, for builders.** 🚀

Build in public. Share your journey. Change the world.
