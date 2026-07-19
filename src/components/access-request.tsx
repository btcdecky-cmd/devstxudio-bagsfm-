"use client";

import { useEffect, useState } from "react";
import { isValidSolanaAddress, shortenAddress } from "@/lib/solana";

type TokenAccount = {
  mint: string;
  uiAmount: number;
};

const RPC_ENDPOINTS = [
  "https://solana-rpc.publicnode.com",
  "https://api.mainnet-beta.solana.com",
  "https://rpc.solana.com",
];

async function tryGetTokenAccounts(address: string): Promise<TokenAccount[]> {
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      const { Connection, PublicKey } = await import("@solana/web3.js");
      const connection = new Connection(endpoint);
      const owner = new PublicKey(address);
      const programId = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

      const accounts = await connection.getTokenAccountsByOwner(owner, { programId });

      const found: TokenAccount[] = accounts.value
        .map((acc: any) => {
          const data = acc.account.data;
          if (typeof data === "object" && data.parsed) {
            const parsed = data.parsed;
            return {
              mint: parsed.info.mint,
              uiAmount: parsed.info.tokenAmount?.uiAmount || 0,
            };
          }
          return null;
        })
        .filter((t: TokenAccount | null): t is TokenAccount => t !== null && t.uiAmount > 0);

      if (found.length > 0) return found.slice(0, 8);
    } catch {
      // try next endpoint
    }
  }
  return [];
}

export function AccessRequest() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tokens, setTokens] = useState<TokenAccount[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function verify() {
    setLoading(true);
    setError(null);
    setVerified(false);
    setTokens([]);

    const trimmed = address.trim();
    if (!isValidSolanaAddress(trimmed)) {
      setError("Please enter a valid Solana wallet address.");
      setLoading(false);
      return;
    }

    const accounts = await tryGetTokenAccounts(trimmed);

    if (accounts.length === 0) {
      setError(
        "No token holdings found for this wallet. You must create or own a token on pump.fun (bagsfm)."
      );
    } else {
      setTokens(accounts);
      setVerified(true);
    }

    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-line bg-ink-900/60 p-6">
      <h3 className="text-lg font-semibold text-white">Developer access</h3>
      <p className="mt-2 text-sm text-neutral-400">
        Access is restricted to developers who create or own a token on pump.fun (bagsfm).
        Enter your wallet address to verify your token profile.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Solana wallet address"
          className="w-full rounded-lg border border-line bg-ink-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500"
        />
        <button
          onClick={verify}
          disabled={loading}
          className="btn-gold shrink-0 disabled:opacity-60"
        >
          {loading ? "Verifying…" : "Verify wallet"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}

      {verified && (
        <div className="mt-5 rounded-xl border border-brand-500/40 bg-brand-500/10 p-5">
          <p className="text-sm font-medium text-white">
            ✓ Token profile verified — {tokens.length} token{tokens.length !== 1 ? "s" : ""} found
          </p>
          <div className="mt-3 space-y-2">
            {tokens.map((t) => (
              <div
                key={t.mint}
                className="flex items-center justify-between text-sm text-neutral-300"
              >
                <span className="font-mono text-xs text-neutral-400">
                  {shortenAddress(t.mint)}
                </span>
                <span className="text-xs text-neutral-500">
                  {t.uiAmount.toLocaleString()} tokens
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert("Access request submitted. Welcome to Dev Studio.")}
            className="btn-gold mt-4"
          >
            Request access
          </button>
        </div>
      )}
    </div>
  );
}
