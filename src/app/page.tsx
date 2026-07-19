import Link from "next/link";
import { feed, projects, builders, formatCount } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Avatar, Stat } from "@/components/avatar";
import { StatusBadge } from "@/components/status-badge";

const features = [
  {
    title: "Create projects",
    body: "Spin up a project in seconds and give your idea a home. Track status from idea to launch.",
    icon: "◆",
  },
  {
    title: "Share updates",
    body: "Post milestones, features, and fixes as you build. Your followers watch the journey unfold.",
    icon: "▲",
  },
  {
    title: "Track progress",
    body: "A public progress bar and timeline keep you accountable and your community in the loop.",
    icon: "◈",
  },
  {
    title: "Build in public",
    body: "Discover other builders, explore projects early, and grow an audience around your work.",
    icon: "✦",
  },
];

export default function Home() {
  const preview = feed.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/60 px-3 py-1 text-xs text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              The platform for builders who ship in the open
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Build in public with <span className="gradient-text">Dev Studio</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
              Dev Studio is a builder platform for developers who want to build in public.
              Create projects, share updates, and track development progress while your
              community follows the journey from idea to launch.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/projects"
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
              >
                Explore projects
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-line bg-ink-900/60 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-brand-500"
              >
                Start your studio
              </Link>
            </div>

            <div className="mx-auto mt-12 flex max-w-md items-center justify-between rounded-2xl border border-line bg-ink-900/60 p-5">
              <Stat label="Projects" value={projects.length * 142} />
              <span className="h-8 w-px bg-line" />
              <Stat label="Builders" value={builders.length * 318} />
              <span className="h-8 w-px bg-line" />
              <Stat label="Updates" value={projects.reduce((a, p) => a + p.updates.length, 0) * 96} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover rounded-2xl border border-line bg-ink-900/60 p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-lg text-brand-400 ring-1 ring-inset ring-brand-400/20">
                {f.icon}
              </span>
              <h3 className="mt-4 font-medium text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Projects gaining momentum
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Watch applications evolve in real time, from idea to launch.
            </p>
          </div>
          <Link href="/projects" className="text-sm text-brand-400 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Live feed preview */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Latest from the community</h2>
            <p className="mt-1 text-sm text-neutral-400">Real-time updates from builders you can follow.</p>
          </div>
          <Link href="/builders" className="text-sm text-brand-400 hover:underline">
            Meet builders →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {preview.map(({ project, builder, update }) => (
            <Link
              key={update.id}
              href={`/projects/${project.slug}`}
              className="card-hover flex items-start gap-3 rounded-xl border border-line bg-ink-900/60 p-4"
            >
              <Avatar name={builder.name} initials={builder.avatar} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-white">{builder.name}</span>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-1 truncate text-sm text-neutral-400">
                  <span className="font-medium text-brand-400">{update.title}</span> · {project.name}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                  {formatCount(update.reactions)} reactions · {formatCount(update.comments)} comments
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-500/15 via-ink-900/60 to-accent-500/15 p-10 text-center md:p-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Start your build-in-public journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            Create your first project, post your first update, and let your community follow
            every step from idea to launch.
          </p>
          <Link
            href="/dashboard"
            className="mt-7 inline-block rounded-xl bg-white px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Open your studio
          </Link>
        </div>
      </section>
    </main>
  );
}
