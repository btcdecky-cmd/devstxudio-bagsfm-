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
    accent: "from-violet-500 to-fuchsia-500",
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
    accent: "from-emerald-500 to-teal-500",
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
    accent: "from-amber-500 to-orange-500",
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
    accent: "from-sky-500 to-indigo-500",
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
    accent: "from-pink-500 to-rose-500",
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
    accent: "from-teal-500 to-cyan-500",
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
