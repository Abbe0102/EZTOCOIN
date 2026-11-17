import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  findMetadataPda,
  updateMetadataAccountV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { createNoopSigner, none, publicKey, some } from "@metaplex-foundation/umi";
import { toWeb3JsInstruction } from "@metaplex-foundation/umi-web3js-adapters";
import { TOKEN } from "./config.js";

// Only used to build instructions locally; nothing is sent through this RPC.
const umi = createUmi("http://127.0.0.1:8899");

/**
 * Step 2: Metaplex metadata (name, symbol, logo/description URI).
 * Must run while the mint authority still exists.
 * `uri` points to a public JSON file (see token/metadata.example.json).
 */
export function createMetadataInstruction(params: {
  mint: PublicKey;
  authority: PublicKey;
  uri: string;
}): TransactionInstruction {
  const authority = createNoopSigner(publicKey(params.authority.toBase58()));
  const mint = publicKey(params.mint.toBase58());
  const builder = createMetadataAccountV3(umi, {
    metadata: findMetadataPda(umi, { mint }),
    mint,
    mintAuthority: authority,
    payer: authority,
    updateAuthority: authority,
    data: {
      name: TOKEN.name,
      symbol: TOKEN.symbol,
      uri: params.uri,
      sellerFeeBasisPoints: 0,
      creators: none(),
      collection: none(),
      uses: none(),
    },
    isMutable: true, // kept mutable until the logo/website are final; lock later with lockMetadataInstruction
    collectionDetails: none(),
  });
  return toWeb3JsInstruction(builder.getInstructions()[0]);
}

/** Makes the metadata permanently immutable and removes the update authority's power. */
export function lockMetadataInstruction(params: {
  mint: PublicKey;
  authority: PublicKey;
}): TransactionInstruction {
  const mint = publicKey(params.mint.toBase58());
  const builder = updateMetadataAccountV2(umi, {
    metadata: findMetadataPda(umi, { mint }),
    updateAuthority: createNoopSigner(publicKey(params.authority.toBase58())),
    data: none(),
    newUpdateAuthority: none(),
    primarySaleHappened: none(),
    isMutable: some(false),
  });
  return toWeb3JsInstruction(builder.getInstructions()[0]);
}
