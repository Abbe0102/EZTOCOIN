import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { start } from "solana-bankrun";
import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  unpackAccount,
  unpackMint,
} from "@solana/spl-token";
import { ALLOCATIONS, TOKEN } from "../src/config.js";
import {
  Recipients,
  allocationAmounts,
  createMintInstructions,
  distributeInstructions,
  revokeMintAuthorityInstruction,
} from "../src/launch.js";
import { createMetadataInstruction, lockMetadataInstruction } from "../src/metadata.js";

const TOTAL_BASE_UNITS = TOKEN.totalSupply * 10n ** BigInt(TOKEN.decimals);
const METADATA_PROGRAM = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";

/** Fresh local Solana bank per test: no network, no real funds. */
async function setup() {
  const bank = await start([], []);
  const client = bank.banksClient;
  const payer = bank.payer;
  const mint = Keypair.generate();
  const recipients = Object.fromEntries(
    ALLOCATIONS.map((a) => [a.key, Keypair.generate().publicKey]),
  ) as Recipients;

  /** Sends a transaction; returns null on success or the error message. */
  const send = async (ixs: TransactionInstruction[], signers: Keypair[] = []) => {
    const tx = new Transaction();
    tx.recentBlockhash = (await client.getLatestBlockhash())![0];
    tx.feePayer = payer.publicKey;
    tx.add(...ixs);
    tx.sign(payer, ...signers);
    const res = await client.tryProcessTransaction(tx);
    return res.result;
  };
  const readMint = async () => {
    const acc = (await client.getAccount(mint.publicKey))!;
    return unpackMint(mint.publicKey, { ...acc, data: Buffer.from(acc.data) });
  };
  const balanceOf = async (owner: PublicKey) => {
    const ata = getAssociatedTokenAddressSync(mint.publicKey, owner, true);
    const acc = (await client.getAccount(ata))!;
    return unpackAccount(ata, { ...acc, data: Buffer.from(acc.data) }).amount;
  };
  const launch = async () => {
    const rent = (await client.getRent()).minimumBalance(BigInt(MINT_SIZE));
    const steps: [TransactionInstruction[], Keypair[]][] = [
      [createMintInstructions({ payer: payer.publicKey, mint: mint.publicKey, rentLamports: rent }), [mint]],
      [distributeInstructions({ payer: payer.publicKey, mint: mint.publicKey, recipients }), []],
      [[revokeMintAuthorityInstruction({ mint: mint.publicKey, currentAuthority: payer.publicKey })], []],
    ];
    for (const [ixs, signers] of steps) {
      const err = await send(ixs, signers);
      if (err) throw new Error(`launch step failed: ${err}`);
    }
  };
  return { payer, mint, recipients, send, readMint, balanceOf, launch };
}

describe("allocationAmounts", () => {
  it("sums exactly to the total supply", () => {
    const amounts = allocationAmounts();
    const sum = Object.values(amounts).reduce((s, v) => s + v, 0n);
    assert.equal(sum, TOTAL_BASE_UNITS);
  });

  it("matches the whitepaper percentages", () => {
    const m = 10n ** BigInt(TOKEN.decimals);
    assert.deepEqual(allocationAmounts(), {
      liquidity: 400_000_000n * m,
      platform: 200_000_000n * m,
      marketing: 150_000_000n * m,
      staking: 150_000_000n * m,
      team: 100_000_000n * m,
    });
  });
});

describe("token launch (local Solana VM)", () => {
  it("creates a clean token: fixed supply, no mint or freeze authority", async () => {
    const ctx = await setup();
    await ctx.launch();
    const mint = await ctx.readMint();
    assert.equal(mint.supply, TOTAL_BASE_UNITS);
    assert.equal(mint.decimals, 6);
    assert.equal(mint.mintAuthority, null);
    assert.equal(mint.freezeAuthority, null);
  });

  it("sends every allocation to the right wallet", async () => {
    const ctx = await setup();
    await ctx.launch();
    const expected = allocationAmounts();
    for (const a of ALLOCATIONS) {
      assert.equal(await ctx.balanceOf(ctx.recipients[a.key]), expected[a.key]);
    }
  });

  it("cannot mint more tokens after launch", async () => {
    const ctx = await setup();
    await ctx.launch();
    const ata = getAssociatedTokenAddressSync(ctx.mint.publicKey, ctx.recipients.team, true);
    const err = await ctx.send([createMintToInstruction(ctx.mint.publicKey, ata, ctx.payer.publicKey, 1n)]);
    assert.notEqual(err, null);
    assert.equal((await ctx.readMint()).supply, TOTAL_BASE_UNITS);
  });

  it("rejects a missing recipient", async () => {
    const { payer, mint, recipients } = await setup();
    const partial = { ...recipients, team: undefined } as unknown as Recipients;
    assert.throws(
      () => distributeInstructions({ payer: payer.publicKey, mint: mint.publicKey, recipients: partial }),
      /team/,
    );
  });
});

describe("metadata instructions", () => {
  const mint = Keypair.generate().publicKey;
  const authority = Keypair.generate().publicKey;

  it("targets the Metaplex program and signs with the mint authority", () => {
    const ix = createMetadataInstruction({ mint, authority, uri: "https://example.com/ezto.json" });
    assert.equal(ix.programId.toBase58(), METADATA_PROGRAM);
    const keys = ix.keys.map((k) => k.pubkey.toBase58());
    assert.ok(keys.includes(mint.toBase58()));
    assert.equal(ix.keys.find((k) => k.pubkey.equals(authority))?.isSigner, true);
  });

  it("lock instruction targets the Metaplex program", () => {
    const ix = lockMetadataInstruction({ mint, authority });
    assert.equal(ix.programId.toBase58(), METADATA_PROGRAM);
  });
});
