import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { ALLOCATIONS, AllocationKey, TOKEN } from "./config.js";

export type Recipients = Record<AllocationKey, PublicKey>;

/** Base-unit amount for each allocation. Sums exactly to the total supply. */
export function allocationAmounts(
  totalSupply: bigint = TOKEN.totalSupply,
  decimals: number = TOKEN.decimals,
): Record<AllocationKey, bigint> {
  const total = totalSupply * 10n ** BigInt(decimals);
  const out = {} as Record<AllocationKey, bigint>;
  let assigned = 0n;
  ALLOCATIONS.forEach((a, i) => {
    const amount =
      i === ALLOCATIONS.length - 1
        ? total - assigned // last one absorbs any rounding
        : (total * BigInt(a.bps)) / 10_000n;
    out[a.key] = amount;
    assigned += amount;
  });
  return out;
}

/**
 * Step 1: create the mint account.
 * The freeze authority is never set (null), so no one can ever freeze holders' tokens.
 */
export function createMintInstructions(params: {
  payer: PublicKey;
  mint: PublicKey;
  rentLamports: number | bigint;
  decimals?: number;
}): TransactionInstruction[] {
  const { payer, mint, rentLamports, decimals = TOKEN.decimals } = params;
  return [
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint,
      lamports: Number(rentLamports),
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMint2Instruction(mint, decimals, payer, null),
  ];
}

/** Step 3: mint each allocation to its recipient's associated token account. */
export function distributeInstructions(params: {
  payer: PublicKey;
  mint: PublicKey;
  recipients: Recipients;
  amounts?: Record<AllocationKey, bigint>;
}): TransactionInstruction[] {
  const { payer, mint, recipients, amounts = allocationAmounts() } = params;
  const ixs: TransactionInstruction[] = [];
  for (const a of ALLOCATIONS) {
    const owner = recipients[a.key];
    if (!owner) throw new Error(`Missing recipient for "${a.key}"`);
    const ata = getAssociatedTokenAddressSync(mint, owner, true);
    ixs.push(
      createAssociatedTokenAccountIdempotentInstruction(payer, ata, owner, mint),
      createMintToInstruction(mint, ata, payer, amounts[a.key]),
    );
  }
  return ixs;
}

/** Step 4: permanently revoke the mint authority. Supply is fixed forever after this. */
export function revokeMintAuthorityInstruction(params: {
  mint: PublicKey;
  currentAuthority: PublicKey;
}): TransactionInstruction {
  return createSetAuthorityInstruction(
    params.mint,
    params.currentAuthority,
    AuthorityType.MintTokens,
    null,
  );
}
