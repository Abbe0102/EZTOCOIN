# EZTO Launch Guide

> ⚠️ **Golden rule:** everything is tested on **devnet** (test network, no real money) before **mainnet**.
> Never share your seed phrase or keypair file with anyone.

## 0. Preparation
1. Install a wallet: **Phantom** or **Solflare**.
2. Install the [Solana CLI](https://docs.anza.xyz/cli/install) and Node.js 20+.
3. Create a launch wallet: `solana-keygen new -o ~/ezto-launch.json`.
4. Create **5 separate wallets** (Liquidity, Platform, Marketing, Staking, Team) and copy their addresses.

## 1. Token identity (logo & metadata)
1. Use the token icon from `brand/logo/ezto-icon-1024.png`.
2. Upload it to permanent storage (Arweave, or IPFS via Pinata).
3. Copy `token/metadata.example.json`, fill in the links and upload it too. Its **URL** is the `--uri` value.

## 2. Test on devnet
```bash
cd token && npm install
solana config set --url devnet
solana airdrop 2 ~/ezto-launch.json
cp recipients.example.json recipients.json   # fill in the 5 wallet addresses
npm run launch -- --keypair ~/ezto-launch.json --recipients recipients.json --uri <metadata-url>
# review the plan, then:
npm run launch -- --keypair ~/ezto-launch.json --recipients recipients.json --uri <metadata-url> --execute
```
Open the Solana Explorer link it prints and verify:
- Supply = 1,000,000,000
- Mint Authority = none
- Freeze Authority = none

## 3. Mainnet launch
Same commands with `--cluster mainnet-beta`. You need about 0.05 SOL for fees.
**Store `mint-mainnet-beta.json` and the token address somewhere safe.**

## 4. Liquidity (Raydium)
1. From the Liquidity wallet, open Raydium → **Create Pool** (CPMM).
2. Add the 400M EZTO and an amount of SOL; this sets the starting price.
3. After creating the pool, **burn the LP tokens** (Raydium "Burn & Earn"). Liquidity can then never be pulled.

## 5. Token locks (Streamflow)
Create vesting contracts on [Streamflow](https://app.streamflow.finance):

| Wallet | Schedule |
|---|---|
| Team | 12-month cliff, then 24 months linear |
| Platform | 6-month cliff, then 24 months linear |
| Marketing | 50M unlocked, 100M linear over 12 months |
| Staking | Locked until the staking program is live |

Publish the vesting contract links on the website.

## 6. After launch
- Make the metadata immutable once the logo and links are final.
- Submit the token to CoinGecko and CoinMarketCap.
- Publish the official token address on the website and every social account.
