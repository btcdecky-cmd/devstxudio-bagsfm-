"use client";

import { useState } from "react";
import { appTemplates, appBuilderFeatures } from "@/lib/data";

const examples = [
  "A meme generator for my coin",
  "A trading dashboard with live charts",
  "An on-chain tipping game",
  "A community airdrop claim page",
];

export function AppBuilderDemo() {
  const [prompt, setPrompt] = useState("");
  const [building, setBuilding] = useState<number | null>(null);
  const [done, setDone] = useState<typeof appTemplates[number] | null>(null);

  function generate() {
    if (!prompt.trim()) return;
    setDone(null);
    setBuilding(0);
    const timer = setInterval(() => {
      setBuilding((b) => {
        const next = (b ?? 0) + 1;
        if (next >= 100) {
          clearInterval(timer);
          const match =
            appTemplates.find((t) =>
              prompt.toLowerCase().includes(t.prompt.split(" ")[1]?.toLowerCase() ?? "")
            ) ?? appTemplates[0];
          setDone(match);
          return null;
        }
        return next;
      });
    }, 30);
  }

  return (
    <div className="rounded-2xl border border-line bg-ink-900/60 p-6">
      <label className="text-sm font-medium text-white">Describe your app</label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="e.g. a meme generator for my coin"
          className="w-full rounded-lg border border-line bg-ink-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500"
        />
        <button
          onClick={generate}
          disabled={building !== null}
          className="btn-gold shrink-0 disabled:opacity-60"
        >
          {building !== null ? "Generating…" : "Generate & deploy"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => setPrompt(ex)}
            className="rounded-full border border-line px-3 py-1 text-xs text-neutral-400 transition-colors hover:border-brand-500 hover:text-white"
          >
            {ex}
          </button>
        ))}
      </div>

      {building !== null && (
        <div className="mt-6">
          <p className="text-sm text-neutral-300">
            Compiling {prompt}… deploying to dev.fun
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
              style={{ width: `${building}%` }}
            />
          </div>
        </div>
      )}

      {done && (
        <div className="mt-6 flex items-center gap-4 rounded-xl border border-brand-500/40 bg-brand-500/10 p-4">
          <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${done.accent} text-lg`}>
            ◆
          </span>
          <div className="flex-1">
            <p className="font-medium text-white">{done.name} is live</p>
            <p className="text-xs text-neutral-400">
              {done.category} · built in {done.buildSeconds}s
              {done.linkedToken ? ` · linked to ${done.linkedToken}` : ""}
            </p>
          </div>
          <span className="text-xs text-accent-400">Published ✓</span>
        </div>
      )}
    </div>
  );
}
