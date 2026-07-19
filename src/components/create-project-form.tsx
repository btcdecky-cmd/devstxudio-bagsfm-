"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateProjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Developer Tools");
  const [status, setStatus] = useState<"idea" | "building" | "beta" | "launched">("idea");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    alert(`Project "${name}" created (demo). In production this would persist to a database.`);
    setSubmitting(false);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-white">Project name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1.5 w-full rounded-lg border border-line bg-ink-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500"
          placeholder="My awesome project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Tagline</label>
        <input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          required
          className="mt-1.5 w-full rounded-lg border border-line bg-ink-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500"
          placeholder="One-line description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-line bg-ink-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500"
          placeholder="Tell builders what you're building…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-white">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line bg-ink-950 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-500"
          >
            <option>Developer Tools</option>
            <option>Productivity</option>
            <option>SaaS</option>
            <option>AI / ML</option>
            <option>Gaming</option>
            <option>Social</option>
            <option>DeFi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="mt-1.5 w-full rounded-lg border border-line bg-ink-950 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-500"
          >
            <option value="idea">Idea</option>
            <option value="building">Building</option>
            <option value="beta">Beta</option>
            <option value="launched">Launched</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-60">
          {submitting ? "Creating…" : "Create project"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
