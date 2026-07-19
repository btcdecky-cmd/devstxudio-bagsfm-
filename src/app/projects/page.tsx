import { projects } from "@/lib/data";
import { ProjectExplorer } from "@/components/project-explorer";

export const metadata = {
  title: "Explore projects — Dev Studio",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Explore projects</h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Discover new builders, explore projects early, and watch applications evolve in real
          time. Filter by category or status to find what&apos;s being built right now.
        </p>
      </div>
      <ProjectExplorer projects={projects} />
    </main>
  );
}
