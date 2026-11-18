# EZTOCOIN (EZTO)

A clean community token on **Solana**: 0% tax, fixed supply, no freeze authority, locked liquidity. It starts as a meme coin and grows into a simple, non-custodial trading platform.

| | |
|---|---|
| Name / Symbol | EZTO Coin / EZTO |
| Chain | Solana (SPL token) |
| Supply | 1,000,000,000 (fixed: mint authority revoked) |
| Decimals | 6 |
| Tax | 0% |

## Repository layout

```
docs/WHITEPAPER.md      Whitepaper (v2 draft); mirrored at website/whitepaper.html
docs/LAUNCH_GUIDE.md    Step-by-step launch guide
website/                Project website (static, deployed to GitHub Pages)
brand/                  Logo, icons, social assets, brand guide
marketing/              Social media content pack (posts, captions, TikTok scripts)
token/                  Token launch code (TypeScript)
  src/config.ts         Token settings & allocations
  src/launch.ts         Mint, distribute, revoke-authority instructions
  src/metadata.ts       Metaplex metadata (name, symbol, logo)
  src/cli.ts            Launch script (dry run by default)
  test/                 Tests on a local Solana bank (no network, no real funds)
```

## Development

```bash
cd token
npm install
npm test            # run tests
npm run typecheck
npm run launch -- --keypair <wallet.json> --recipients recipients.json --uri <metadata-url>   # dry run
```

See [docs/LAUNCH_GUIDE.md](docs/LAUNCH_GUIDE.md) before launching anything.

## Tokenomics

| Allocation | % | Release |
|---|---|---|
| Liquidity | 40% | DEX pool at launch, LP burned |
| Platform Development | 20% | 6-month cliff + 24 months linear |
| Marketing & Listings | 15% | 5% at launch, 10% over 12 months |
| Staking & Rewards | 15% | Locked until staking goes live |
| Team | 10% | 12-month cliff + 24 months linear |

> EZTO is a community token, not an investment. See the Risks & Disclaimer section of the whitepaper.
