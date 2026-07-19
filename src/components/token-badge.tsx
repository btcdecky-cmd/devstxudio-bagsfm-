"use client";

import { useEffect, useState } from "react";
import { getTokenBySymbol } from "@/lib/solana";

export function TokenBadge({ symbol, mint }: { symbol: string; mint?: string }) {
  const [token, setToken] = useState<{ name: string; logoURI?: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let t;
      if (mint) {
        const { getTokenByMint } = await import("@/lib/solana");
        t = await getTokenByMint(mint);
      }
      if (!t) {
        t = await getTokenBySymbol(symbol);
      }
      if (!cancelled) setToken(t ? { name: t.name, logoURI: t.logoURI } : null);
    })();
    return () => { cancelled = true; };
  }, [symbol, mint]);

  if (!token) {
    return (
      <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white">
        {symbol}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white">
      {token.logoURI && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={token.logoURI} alt="" className="h-3.5 w-3.5 rounded-full" />
      )}
      {token.name}
    </span>
  );
}
