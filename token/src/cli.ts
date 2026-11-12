/**
 * EZTO launch script.
 *
 *   npm run launch -- --keypair ~/.config/solana/id.json \
 *     --recipients recipients.json --uri https://.../ezto.json [--cluster devnet|mainnet-beta] [--execute]
 *
 * Without --execute it only prints the plan (dry run). Always launch on devnet first.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { parseArgs } from "node:util";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { MINT_SIZE } from "@solana/spl-token";
import { ALLOCATIONS, TOKEN } from "./config.js";
import {
  Recipients,
  allocationAmounts,
  createMintInstructions,
  distributeInstructions,
  revokeMintAuthorityInstruction,
} from "./launch.js";
import { createMetadataInstruction } from "./metadata.js";

const { values: args } = parseArgs({
  options: {
    keypair: { type: "string" },
    recipients: { type: "string" },
    uri: { type: "string" },
    cluster: { type: "string", default: "devnet" },
    rpc: { type: "string" },
    execute: { type: "boolean", default: false },
  },
});

function fail(msg: string): never {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

if (!args.keypair) fail("--keypair is required (path to your wallet's keypair JSON)");
if (!args.recipients) fail("--recipients is required (see recipients.example.json)");
if (!args.uri) fail("--uri is required (public URL of the metadata JSON)");
if (!["devnet", "mainnet-beta"].includes(args.cluster!)) fail("--cluster must be devnet or mainnet-beta");

const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(readFileSync(args.keypair.replace(/^~/, process.env.HOME ?? ""), "utf8"))),
);
const rawRecipients = JSON.parse(readFileSync(args.recipients, "utf8"));
const recipients = {} as Recipients;
for (const a of ALLOCATIONS) {
  if (!rawRecipients[a.key]) fail(`recipients file is missing "${a.key}"`);
  try {
    recipients[a.key] = new PublicKey(rawRecipients[a.key]);
  } catch {
    fail(`"${a.key}" is not a valid Solana address`);
  }
}

const amounts = allocationAmounts();
const fmt = (base: bigint) => (base / 10n ** BigInt(TOKEN.decimals)).toLocaleString("en-US");

console.log(`\nEZTO launch plan: ${args.cluster}${args.execute ? "" : "  (DRY RUN)"}`);
console.log(`  Payer / temporary mint authority: ${payer.publicKey.toBase58()}`);
console.log(`  Token: ${TOKEN.name} (${TOKEN.symbol}), ${TOKEN.decimals} decimals, ${TOKEN.totalSupply.toLocaleString("en-US")} supply`);
console.log(`  Metadata URI: ${args.uri}`);
console.log(`  Freeze authority: none`);
for (const a of ALLOCATIONS) {
  console.log(`  ${a.label.padEnd(24)} ${(a.bps / 100 + "%").padStart(4)}  ${fmt(amounts[a.key]).padStart(13)}  → ${recipients[a.key].toBase58()}`);
}
console.log(`  Then: mint authority revoked permanently.\n`);

if (!args.execute) {
  console.log("Dry run only. Re-run with --execute to send transactions.");
  process.exit(0);
}

const connection = new Connection(args.rpc ?? clusterApiUrl(args.cluster as "devnet" | "mainnet-beta"), "confirmed");

// Save the mint keypair BEFORE sending anything, so the address is never lost.
const mintFile = `mint-${args.cluster}.json`;
if (existsSync(mintFile)) fail(`${mintFile} already exists: a launch was already started. Inspect it before retrying.`);
const mint = Keypair.generate();
writeFileSync(mintFile, JSON.stringify(Array.from(mint.secretKey)));
console.log(`Mint address: ${mint.publicKey.toBase58()}  (keypair saved to ${mintFile})`);

async function step(name: string, ixs: TransactionInstruction[], signers: Keypair[] = []) {
  const sig = await sendAndConfirmTransaction(connection, new Transaction().add(...ixs), [payer, ...signers]);
  console.log(`✔ ${name}: ${sig}`);
}

const rent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
await step(
  "Create mint + metadata",
  [
    ...createMintInstructions({ payer: payer.publicKey, mint: mint.publicKey, rentLamports: rent }),
    createMetadataInstruction({ mint: mint.publicKey, authority: payer.publicKey, uri: args.uri }),
  ],
  [mint],
);
await step("Distribute allocations", distributeInstructions({ payer: payer.publicKey, mint: mint.publicKey, recipients, amounts }));
await step("Revoke mint authority", [revokeMintAuthorityInstruction({ mint: mint.publicKey, currentAuthority: payer.publicKey })]);

const explorer = `https://explorer.solana.com/address/${mint.publicKey.toBase58()}${args.cluster === "devnet" ? "?cluster=devnet" : ""}`;
console.log(`\nDone. EZTO mint: ${mint.publicKey.toBase58()}\n${explorer}`);
