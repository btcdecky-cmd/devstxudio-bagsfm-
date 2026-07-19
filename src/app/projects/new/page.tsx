import { CreateProjectForm } from "@/components/create-project-form";

export const metadata = {
  title: "New project — Dev Studio",
};

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <span className="eyebrow">projects.dev.studio</span>
        <h1 className="serif mt-3 text-3xl font-semibold tracking-tight text-white">
          New project
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Start a new project and share it with the community. Fill in the basics and
          publish your first disclosure when you&apos;re ready.
        </p>
      </div>

      <CreateProjectForm />
    </main>
  );
}
