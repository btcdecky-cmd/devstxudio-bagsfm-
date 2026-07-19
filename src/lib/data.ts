export type Builder = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tagline: string;
  followers: number;
  projects: number;
  stack: string[];
  location: string;
};

export type UpdateKind = "milestone" | "feature" | "fix" | "note" | "launch";

export type Update = {
  id: string;
  title: string;
  body: string;
  kind: UpdateKind;
  date: string; // ISO
  reactions: number;
  comments: number;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "idea" | "building" | "beta" | "launched";
  category: string;
  tags: string[];
  progress: number; // 0-100
  stars: number;
  followers: number;
  ownerId: string;
  updatedAt: string; // ISO
  accent: string; // tailwind gradient classes
  updates: Update[];
};

export const builders: Builder[] = [
  {
    id: "b1",
    name: "Maya Chen",
    handle: "mayabuilds",
    avatar: "MC",
    tagline: "Indie hacker shipping AI tools",
    followers: 4820,
    projects: 6,
    stack: ["TypeScript", "Next.js", "Postgres"],
    location: "Singapore",
  },
  {
    id: "b2",
    name: "Leo Martins",
    handle: "leohacks",
    avatar: "LM",
    tagline: "Designing delightful developer tools",
    followers: 3110,
    projects: 4,
    stack: ["Rust", "WASM", "React"],
    location: "Lisbon",
  },
  {
    id: "b3",
    name: "Aisha Khan",
    handle: "aishacodes",
    avatar: "AK",
    tagline: "Open-source infra & observability",
    followers: 7290,
    projects: 9,
    stack: ["Go", "Kubernetes", "React"],
    location: "Berlin",
  },
  {
    id: "b4",
    name: "Tomás Rivera",
    handle: "tomasr",
    avatar: "TR",
    tagline: "Realtime apps & game engines",
    followers: 1980,
    projects: 3,
    stack: ["C++", "WebGL", "Node"],
    location: "Mexico City",
  },
  {
    id: "b5",
    name: "Priya Nair",
    handle: "priyadev",
    avatar: "PN",
    tagline: "ML research turned products",
    followers: 5640,
    projects: 5,
    stack: ["Python", "PyTorch", "FastAPI"],
    location: "Bangalore",
  },
  {
    id: "b6",
    name: "Jonas Berg",
    handle: "jonasb",
    avatar: "JB",
    tagline: "Bootstrapping SaaS from the cabin",
    followers: 2430,
    projects: 7,
    stack: ["TypeScript", "Supabase", "Vue"],
    location: "Oslo",
  },
];

function u(
  id: string,
  title: string,
  body: string,
  kind: UpdateKind,
  date: string,
  reactions: number,
  comments: number
): Update {
  return { id, title, body, kind, date, reactions, comments };
}

export const projects: Project[] = [
  {
    id: "p1",
    slug: "orbit-notes",
    name: "Orbit Notes",
    tagline: "A local-first notebook that syncs like magic",
    description:
      "Orbit Notes is a local-first, markdown-native notebook with conflict-free sync, offline support, and a focus mode built for deep work. Built to prove that sync doesn't have to be scary.",
    status: "beta",
    category: "Productivity",
    tags: ["local-first", "sync", "markdown"],
    progress: 78,
    stars: 1240,
    followers: 860,
    ownerId: "b1",
    updatedAt: "2026-07-17T10:00:00Z",
    accent: "from-amber-600 to-yellow-700",
    updates: [
      u("p1u3", "Live collaboration MVP", "Shipped cursor presence and shared editing for up to 5 collaborators. CRDT merge is rock solid under load.", "feature", "2026-07-17T10:00:00Z", 142, 23),
      u("p1u2", "Cross-device sync", "End-to-end encrypted sync now works across macOS, Windows, and Linux with sub-second latency.", "milestone", "2026-07-09T10:00:00Z", 210, 41),
      u("p1u1", "Public beta open", "Opened the beta to the first 1,000 builders. Feedback has been incredible.", "launch", "2026-06-28T10:00:00Z", 318, 64),
    ],
  },
  {
    id: "p2",
    slug: "forge-cli",
    name: "Forge CLI",
    tagline: "Opinionated scaffolding for tiny web services",
    description:
      "Forge is a zero-config CLI that scaffolds type-safe web services in seconds. Pick a database, pick a framework, and get a deployable skeleton with tests.",
    status: "building",
    category: "Developer Tools",
    tags: ["cli", "scaffolding", "typescript"],
    progress: 54,
    stars: 980,
    followers: 540,
    ownerId: "b3",
    updatedAt: "2026-07-15T10:00:00Z",
    accent: "from-amber-500 to-yellow-600",
    updates: [
      u("p2u2", "Plugin system", "Forge now supports community plugins. Three plugins already published in the registry.", "feature", "2026-07-15T10:00:00Z", 88, 12),
      u("p2u1", "Database adapters", "Added Postgres, SQLite, and Turso adapters with generated migrations.", "milestone", "2026-07-02T10:00:00Z", 156, 29),
    ],
  },
  {
    id: "p3",
    slug: "pixel-forge",
    name: "Pixel Forge",
    tagline: "A tiny game engine that compiles to WebGL",
    description:
      "Pixel Forge is a minimal game engine written in C++ with a WebGL target. Build once, run in the browser at 60fps with no plugins.",
    status: "idea",
    category: "Gaming",
    tags: ["engine", "webgl", "c++"],
    progress: 22,
    stars: 410,
    followers: 290,
    ownerId: "b4",
    updatedAt: "2026-07-12T10:00:00Z",
    accent: "from-yellow-600 to-amber-700",
    updates: [
      u("p3u1", "Core renderer", "First triangle on screen! Sprite batching and a scene graph are next.", "note", "2026-07-12T10:00:00Z", 47, 8),
    ],
  },
  {
    id: "p4",
    slug: "signal-lens",
    name: "Signal Lens",
    tagline: "ML observability for tiny teams",
    description:
      "Signal Lens watches your models in production and surfaces drift, data quality issues, and silent failures before your users notice.",
    status: "launched",
    category: "AI / ML",
    tags: ["mlops", "observability", "python"],
    progress: 100,
    stars: 2210,
    followers: 1430,
    ownerId: "b5",
    updatedAt: "2026-07-18T10:00:00Z",
    accent: "from-amber-700 to-yellow-600",
    updates: [
      u("p4u3", "v1.0 is live", "Signal Lens is officially out of beta. Thank you to every builder who tested it.", "launch", "2026-07-18T10:00:00Z", 502, 97),
      u("p4u2", "Drift alerts", "Real-time drift detection with Slack and webhook notifications.", "feature", "2026-07-10T10:00:00Z", 133, 18),
      u("p4u1", "Public launch prep", "Writing docs, recording the demo, and polishing the onboarding flow.", "milestone", "2026-06-30T10:00:00Z", 201, 33),
    ],
  },
  {
    id: "p5",
    slug: "nimbus-ui",
    name: "Nimbus UI",
    tagline: "Accessible React components, copy-paste style",
    description:
      "Nimbus UI is a set of accessible, themeable React components you own. No lock-in, no runtime, just clean code you can tweak.",
    status: "building",
    category: "Developer Tools",
    tags: ["react", "design-system", "a11y"],
    progress: 67,
    stars: 1670,
    followers: 910,
    ownerId: "b2",
    updatedAt: "2026-07-16T10:00:00Z",
    accent: "from-yellow-500 to-amber-600",
    updates: [
      u("p5u2", "Dark mode tokens", "Shipped a token system with automatic dark mode and per-component theming.", "feature", "2026-07-16T10:00:00Z", 119, 15),
      u("p5u1", "Keyboard nav", "Full keyboard navigation and screen-reader support across all 18 components.", "milestone", "2026-07-04T10:00:00Z", 174, 26),
    ],
  },
  {
    id: "p6",
    slug: "cabin-crm",
    name: "Cabin CRM",
    tagline: "A calm CRM for solo founders",
    description:
      "Cabin CRM keeps your customer relationships sane. Lightweight pipelines, email sync, and zero busywork — built for founders who hate CRMs.",
    status: "beta",
    category: "SaaS",
    tags: ["crm", "bootstrap", "supabase"],
    progress: 71,
    stars: 540,
    followers: 380,
    ownerId: "b6",
    updatedAt: "2026-07-14T10:00:00Z",
    accent: "from-amber-600 to-yellow-700",
    updates: [
      u("p6u2", "Email sync", "Two-way email sync with Gmail and Outlook, threaded inside each contact.", "feature", "2026-07-14T10:00:00Z", 63, 9),
      u("p6u1", "Pipeline board", "Drag-and-drop deal pipeline with custom stages.", "milestone", "2026-07-01T10:00:00Z", 91, 14),
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getBuilder(id: string): Builder | undefined {
  return builders.find((b) => b.id === id);
}

export function getBuilderProjects(id: string): Project[] {
  return projects.filter((p) => p.ownerId === id);
}

export const currentUser: Builder = builders[0];

export const feed: {
  project: Project;
  builder: Builder;
  update: Update;
}[] = projects
  .flatMap((project) =>
    project.updates.map((update) => ({
      project,
      builder: getBuilder(project.ownerId)!,
      update,
    }))
  )
  .sort((a, b) => +new Date(b.update.date) - +new Date(a.update.date));

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export const statuses: Project["status"][] = ["idea", "building", "beta", "launched"];

export function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(date: Date): string {
  const secs = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/* ------------------------------------------------------------------ */
/* Live Build Feed (real-time streaming of build events)              */
/* ------------------------------------------------------------------ */

export type FeedEventKind =
  | "deploy"
  | "commit"
  | "star"
  | "launch"
  | "update"
  | "match"
  | "agent"
  | "ipo";

export type FeedEvent = {
  id: string;
  kind: FeedEventKind;
  actor: string; // builder handle
  project: string;
  message: string;
  at: Date;
};

export const feedKinds: Record<FeedEventKind, { label: string; color: string; icon: string }> = {
  deploy: { label: "Deploy", color: "text-brand-400 bg-brand-500/15 ring-brand-400/30", icon: "▲" },
  commit: { label: "Commit", color: "text-gold-400 bg-gold-500/15 ring-gold-400/30", icon: "◆" },
  star: { label: "Star", color: "text-brand-400 bg-brand-500/15 ring-brand-400/30", icon: "★" },
  launch: { label: "Launch", color: "text-accent-400 bg-accent-500/15 ring-accent-400/30", icon: "🚀" },
  update: { label: "Update", color: "text-gold-400 bg-gold-500/15 ring-gold-400/30", icon: "✦" },
  match: { label: "Match", color: "text-brand-400 bg-brand-500/15 ring-brand-400/30", icon: "♠" },
  agent: { label: "Agent", color: "text-gold-400 bg-gold-500/15 ring-gold-400/30", icon: "🤖" },
  ipo: { label: "IPO", color: "text-accent-400 bg-accent-500/15 ring-accent-400/30", icon: "⬡" },
};

const seedEvents: Omit<FeedEvent, "at">[] = [
  { id: "e1", kind: "deploy", actor: "mayabuilds", project: "Orbit Notes", message: "Deployed v0.9.2 to production" },
  { id: "e2", kind: "match", actor: "leohacks", project: "BluffNet", message: "Won HU ladder match +214 BB" },
  { id: "e3", kind: "commit", actor: "aishacodes", project: "Forge CLI", message: "Pushed plugin registry support" },
  { id: "e4", kind: "launch", actor: "priyadev", project: "Signal Lens", message: "v1.0 is live 🎉" },
  { id: "e5", kind: "star", actor: "jonasb", project: "Cabin CRM", message: "Reached 540 stars" },
  { id: "e6", kind: "agent", actor: "aishacodes", project: "DeepStack-X", message: "Self-trained 10k new hands" },
  { id: "e7", kind: "ipo", actor: "mayabuilds", project: "Nebula Labs", message: "IPO raised $420k at TGE" },
  { id: "e8", kind: "update", actor: "leohacks", project: "Nimbus UI", message: "Shipped dark mode tokens" },
];

export const seedFeed: FeedEvent[] = seedEvents.map((e, i) => ({
  ...e,
  at: new Date(Date.now() - (i + 1) * 47_000),
}));

const liveTemplates: Omit<FeedEvent, "id" | "at">[] = [
  { kind: "commit", actor: "priyadev", project: "Signal Lens", message: "Streaming drift alerts to prod" },
  { kind: "match", actor: "leohacks", project: "BluffNet", message: "Climbed to #3 on the ladder" },
  { kind: "deploy", actor: "mayabuilds", project: "Orbit Notes", message: "Rolled out live collaboration" },
  { kind: "star", actor: "jonasb", project: "Cabin CRM", message: "Gained 12 new stars" },
  { kind: "agent", actor: "aishacodes", project: "DeepStack-X", message: "Logged 1,200 decision traces" },
  { kind: "update", actor: "tomasr", project: "Pixel Forge", message: "Added sprite batching" },
  { kind: "ipo", actor: "priyadev", project: "SignalStack", message: "Vesting schedule published" },
  { kind: "launch", actor: "mayabuilds", project: "MemeForge", message: "Generated & published in 38s" },
];

let liveCounter = 1000;
export function nextLiveEvent(): FeedEvent {
  const t = liveTemplates[Math.floor(Math.random() * liveTemplates.length)];
  return { ...t, id: `live-${liveCounter++}`, at: new Date() };
}

/* ------------------------------------------------------------------ */
/* AI Agent Arena (poker focus)                                        */
/* ------------------------------------------------------------------ */

export type PokerFormat = "6-max" | "heads-up" | "tournament";

export type AgentEntry = {
  id: string;
  name: string;
  builderId: string;
  format: PokerFormat;
  handsPlayed: number;
  winRate: number; // BB/100
  rank: number;
  rating: number; // elo
  prizeWon: number; // USD
  accent: string;
};

export type ArenaMatch = {
  id: string;
  title: string;
  format: PokerFormat;
  agentA: string;
  agentB: string;
  hands: number;
  pool: number; // USD
  status: "live" | "open" | "finished";
  result?: string;
};

export const arenaFormats: {
  id: PokerFormat;
  label: string;
  desc: string;
}[] = [
  { id: "6-max", label: "6-Max NLHE", desc: "Six agents, imperfect info, full ring chaos." },
  { id: "heads-up", label: "Heads-Up Ladder", desc: "One-on-one grinds to climb the ranks." },
  { id: "tournament", label: "Tournaments", desc: "Burst prizepools with sponsored buy-ins." },
];

export const arenaAgents: AgentEntry[] = [
  { id: "a1", name: "DeepStack-X", builderId: "b3", format: "6-max", handsPlayed: 184200, winRate: 14.2, rank: 1, rating: 2140, prizeWon: 12840, accent: "from-amber-700 to-yellow-600" },
  { id: "a2", name: "MonadGrinder", builderId: "b5", format: "6-max", handsPlayed: 161900, winRate: 12.8, rank: 2, rating: 2095, prizeWon: 9670, accent: "from-amber-500 to-yellow-600" },
  { id: "a3", name: "BluffNet", builderId: "b2", format: "heads-up", handsPlayed: 94200, winRate: 18.6, rank: 3, rating: 2051, prizeWon: 8120, accent: "from-yellow-500 to-amber-600" },
  { id: "a4", name: "PotOdds-Pro", builderId: "b4", format: "6-max", handsPlayed: 133400, winRate: 9.4, rank: 4, rating: 1988, prizeWon: 5340, accent: "from-yellow-600 to-amber-700" },
  { id: "a5", name: "HoleCard-HL", builderId: "b1", format: "heads-up", handsPlayed: 71500, winRate: 11.1, rank: 5, rating: 1910, prizeWon: 4200, accent: "from-amber-600 to-yellow-700" },
  { id: "a6", name: "AllIn-AI", builderId: "b6", format: "tournament", handsPlayed: 58800, winRate: 7.7, rank: 6, rating: 1844, prizeWon: 3110, accent: "from-amber-600 to-yellow-700" },
];

export const arenaMatches: ArenaMatch[] = [
  { id: "m1", title: "Monad Sponsored Classic", format: "6-max", agentA: "DeepStack-X", agentB: "MonadGrinder", hands: 5000, pool: 10000, status: "live" },
  { id: "m2", title: "HU Ladder Finals", format: "heads-up", agentA: "BluffNet", agentB: "HoleCard-HL", hands: 2000, pool: 2500, status: "live" },
  { id: "m3", title: "Spring Open", format: "tournament", agentA: "PotOdds-Pro", agentB: "AllIn-AI", hands: 12000, pool: 15000, status: "open" },
  { id: "m4", title: "Grinders Cup #42", format: "6-max", agentA: "MonadGrinder", agentB: "PotOdds-Pro", hands: 8000, pool: 6000, status: "finished", result: "MonadGrinder +842 BB" },
];

/* ------------------------------------------------------------------ */
/* AI-Powered App Builder / Launcher                                  */
/* ------------------------------------------------------------------ */

export type AppTemplate = {
  id: string;
  prompt: string;
  name: string;
  category: string;
  linkedToken?: string;
  buildSeconds: number;
  accent: string;
};

export const appTemplates: AppTemplate[] = [
  { id: "t1", prompt: "A meme generator for my coin", name: "MemeForge", category: "Social", linkedToken: "$MEME", buildSeconds: 38, accent: "from-yellow-500 to-amber-600" },
  { id: "t2", prompt: "A trading dashboard with live charts", name: "ChartDeck", category: "DeFi", linkedToken: "$DECK", buildSeconds: 52, accent: "from-amber-700 to-yellow-600" },
  { id: "t3", prompt: "An on-chain tipping game", name: "TipArcade", category: "Game", linkedToken: "$TIP", buildSeconds: 44, accent: "from-amber-500 to-yellow-600" },
  { id: "t4", prompt: "A community airdrop claim page", name: "ClaimDrop", category: "Community", linkedToken: "$DROP", buildSeconds: 29, accent: "from-yellow-600 to-amber-700" },
  { id: "t5", prompt: "A token-gated content vault", name: "GateVault", category: "Tooling", linkedToken: "$VAULT", buildSeconds: 47, accent: "from-amber-600 to-yellow-700" },
];

export const appBuilderFeatures = [
  "Natural language prompts — describe it, we build it",
  "Deploy & publish in under a minute, no code required",
  "Link apps to pump.fun tokens for trading & community",
  "On-chain actions: Solana transactions, wallets, claims",
  "Custom backend logic, viral tools, and mini-games",
  "Rapid prototyping for consumer crypto apps",
];

/* ------------------------------------------------------------------ */
/* Project Incubator & IPO / Launch Tools                             */
/* ------------------------------------------------------------------ */

export type IncubatorProject = {
  id: string;
  name: string;
  coin: string;
  tagline: string;
  apps: number;
  raised: number; // USD
  status: "incubating" | "ipo" | "live";
  vesting: string;
  builderId: string;
  accent: string;
};

export const incubatorProjects: IncubatorProject[] = [
  { id: "i1", name: "Nebula Labs", coin: "$NEB", tagline: "Consumer app suite bundled under one tradable coin", apps: 4, raised: 420000, status: "live", vesting: "12% TGE / 6mo linear", builderId: "b1", accent: "from-amber-600 to-yellow-700" },
  { id: "i2", name: "BlockForge", coin: "$FORGE", tagline: "Incubator-backed builder tooling ecosystem", apps: 3, raised: 180000, status: "ipo", vesting: "15% TGE / 9mo linear", builderId: "b3", accent: "from-amber-500 to-yellow-600" },
  { id: "i3", name: "PixelUnion", coin: "$PXU", tagline: "On-chain games + social apps for one community", apps: 5, raised: 0, status: "incubating", vesting: "TBD", builderId: "b4", accent: "from-yellow-600 to-amber-700" },
  { id: "i4", name: "SignalStack", coin: "$SIG", tagline: "ML tooling wrapped as a tradable asset", apps: 2, raised: 260000, status: "ipo", vesting: "10% TGE / 12mo linear", builderId: "b5", accent: "from-amber-700 to-yellow-600" },
];

export const incubatorSteps = [
  { step: "01", title: "Bundle your apps", body: "Group multiple apps under one brand and coin to form an on-chain business." },
  { step: "02", title: "Incubator support", body: "Get technical help and distribution reach from the studio incubator." },
  { step: "03", title: "Launch your IPO", body: "Run a pump.fun IPO with vesting that aligns creators, users & traders." },
  { step: "04", title: "Go tradable", body: "Your idea becomes a tradable asset in a consumer crypto app ecosystem." },
];
