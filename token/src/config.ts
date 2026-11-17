/**
 * EZTO token configuration.
 * These values must match docs/WHITEPAPER.md.
 */

export const TOKEN = {
  name: "EZTO Coin",
  symbol: "EZTO",
  decimals: 6,
  /** Whole tokens (not base units). */
  totalSupply: 1_000_000_000n,
} as const;

export type AllocationKey =
  | "liquidity"
  | "platform"
  | "marketing"
  | "staking"
  | "team";

export interface Allocation {
  key: AllocationKey;
  label: string;
  /** Share of total supply in basis points (100 bp = 1%). */
  bps: number;
}

export const ALLOCATIONS: readonly Allocation[] = [
  { key: "liquidity", label: "Liquidity (DEX pool)", bps: 4000 },
  { key: "platform", label: "Platform Development", bps: 2000 },
  { key: "marketing", label: "Marketing & Listings", bps: 1500 },
  { key: "staking", label: "Staking & Rewards", bps: 1500 },
  { key: "team", label: "Team", bps: 1000 },
];

const totalBps = ALLOCATIONS.reduce((s, a) => s + a.bps, 0);
if (totalBps !== 10_000) {
  throw new Error(`Allocations must sum to 100% (got ${totalBps / 100}%)`);
}
