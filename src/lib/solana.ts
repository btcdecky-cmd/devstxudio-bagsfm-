import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { PublicKey } from "@solana/web3.js";

let cached: Map<string, TokenInfo> | null = null;

async function getTokenMap(): Promise<Map<string, TokenInfo>> {
  if (cached) return cached;
  const provider = new TokenListProvider();
  const list = await provider.resolve();
  const tokens = list
    .filterByClusterSlug("mainnet-beta")
    .getList();
  cached = new Map(tokens.map((t) => [t.address, t]));
  return cached;
}

export async function getTokenByMint(mint: string): Promise<TokenInfo | undefined> {
  try {
    new PublicKey(mint);
  } catch {
    return undefined;
  }
  const map = await getTokenMap();
  return map.get(mint);
}

export async function getTokenBySymbol(symbol: string): Promise<TokenInfo | undefined> {
  const map = await getTokenMap();
  const upper = symbol.replace(/^\$/, "").toUpperCase();
  return Array.from(map.values()).find(
    (t) => t.symbol.toUpperCase() === upper || t.name.toUpperCase().includes(upper)
  );
}

export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
