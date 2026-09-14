/**
 * Solana integration utilities
 */

import { Connection, PublicKey } from '@solana/web3.js';
import { TokenListProvider, type TokenInfo } from '@solana/spl-token-registry';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

let tokenListPromise: Promise<TokenInfo[]> | null = null;

async function getTokenList(): Promise<TokenInfo[]> {
  tokenListPromise ??= new TokenListProvider()
    .resolve()
    .then((container) => container.filterByChainId(101).getList());
  return tokenListPromise;
}

export async function getTokenBySymbol(symbol: string): Promise<TokenInfo | undefined> {
  const normalized = symbol.toLowerCase();
  return (await getTokenList()).find((token) => token.symbol.toLowerCase() === normalized);
}

export async function getTokenByMint(mint: string): Promise<TokenInfo | undefined> {
  return (await getTokenList()).find((token) => token.address === mint);
}

export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  `https://api.${SOLANA_NETWORK}.solana.com`;

export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

/**
 * Get token balance for a wallet
 */
export async function getTokenBalance(
  walletAddress: string,
  tokenMint: string,
): Promise<number> {
  try {
    const wallet = new PublicKey(walletAddress);
    const mint = new PublicKey(tokenMint);

    const tokenAccounts = await connection.getTokenAccountsByOwner(wallet, {
      mint,
    });

    if (tokenAccounts.value.length === 0) {
      return 0;
    }

    const tokenAccount = tokenAccounts.value[0];
    const balance = await connection.getTokenAccountBalance(tokenAccount.pubkey);

    return balance.value.uiAmount || 0;
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error('Failed to fetch token balance');
  }
}

/**
 * Verify wallet ownership
 */
export async function verifyWalletSignature(
  message: string,
  signature: string,
  publicKey: string,
): Promise<boolean> {
  try {
    // Implementation would use actual Solana signature verification
    // This is a placeholder for production integration
    return true;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Format SOL amount
 */
export function formatSol(lamports: number): string {
  return (lamports / 1e9).toFixed(2);
}

/**
 * Parse SOL amount
 */
export function parseSol(sol: number): number {
  return Math.floor(sol * 1e9);
}

/**
 * Check if address is valid Solana address
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}
