"use client";

import { useEffect, useRef, useState } from "react";
import {
  FeedEvent,
  feedKinds,
  formatCount,
  nextLiveEvent,
  seedFeed,
  timeAgo,
} from "@/lib/data";

export function LiveFeed({ initial }: { initial: FeedEvent[] }) {
  const [events, setEvents] = useState<FeedEvent[]>(initial);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState<"fast" | "normal" | "slow">("normal");
  const pausedRef = useRef(paused);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const delays = { fast: 1400, normal: 2600, slow: 4500 };
    function tick() {
      if (pausedRef.current) return;
      setEvents((prev) => [nextLiveEvent(), ...prev].slice(0, 40));
    }
    intervalRef.current = setInterval(tick, delays[rate]);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [rate]);

  const totalStars = 8420;
  const perHour = 312;

  return (
    <div className="rounded-2xl border border-line bg-ink-900/60">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
        <div className="flex items-center gap-2">
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-brand-500" />
          <span className="text-sm font-medium text-white">Live build feed</span>
          <span className="text-xs text-neutral-500">
            {paused ? "paused" : "streaming"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-md border border-line px-2.5 py-1 text-neutral-300 transition-colors hover:border-brand-500 hover:text-white"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          {(["fast", "normal", "slow"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={`rounded-md border px-2.5 py-1 capitalize transition-colors ${
                rate === r
                  ? "border-brand-500 bg-brand-500/15 text-brand-400"
                  : "border-line text-neutral-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 border-b border-line px-4 py-3 text-center text-xs">
        <div className="flex-1">
          <p className="font-semibold text-white">★ {formatCount(totalStars)}</p>
          <p className="text-neutral-500">stars today</p>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">{perHour}</p>
          <p className="text-neutral-500">events / hr</p>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">{events.length}</p>
          <p className="text-neutral-500">in view</p>
        </div>
      </div>

      <ul className="max-h-[560px] divide-y divide-line/60 overflow-y-auto">
        {events.map((e) => {
          const meta = feedKinds[e.kind];
          return (
            <li
              key={e.id}
              className="flex items-start gap-3 px-4 py-3 animate-[fadeIn_0.4s_ease]"
            >
              <span
                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs ring-1 ring-inset ${meta.color}`}
              >
                {meta.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-neutral-300">
                  <span className="font-medium text-brand-400">@{e.actor}</span>{" "}
                  <span className="font-medium text-white">{e.project}</span> · {e.message}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">{meta.label} · {timeAgo(e.at)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
