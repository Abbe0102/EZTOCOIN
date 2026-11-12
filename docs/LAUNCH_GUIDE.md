# دليل إطلاق EZTO خطوة بخطوة

> ⚠️ **قاعدة ذهبية:** كل شي منجرّبه على **devnet** (شبكة التجربة، فلوسها مش حقيقية) قبل **mainnet**.
> ولا مرة تشارك الـ seed phrase أو ملف الـ keypair مع حدا، ولا حتى معي.

## 0. التحضير
1. نزّل محفظة **Phantom** أو **Solflare**.
2. نزّل [Solana CLI](https://docs.anza.xyz/cli/install) و Node.js 20 أو أحدث.
3. اعمل محفظة للإطلاق: `solana-keygen new -o ~/ezto-launch.json`.
4. اعمل **5 محافظ منفصلة** (Liquidity, Platform, Marketing, Staking, Team) وانسخ عناوينها.

## 1. الهوية (اللوغو والمعلومات)
1. جهّز لوغو PNG مربّع (512×512).
2. ارفع اللوغو على مكان دائم (مثلاً Arweave أو IPFS عن طريق Pinata).
3. انسخ `token/metadata.example.json`، عبّي الروابط فيه، وارفعه كمان. **رابطه** هو الـ `--uri`.

## 2. تجربة على devnet
```bash
cd token && npm install
solana config set --url devnet
solana airdrop 2 ~/ezto-launch.json
cp recipients.example.json recipients.json   # وحط فيه عناوين المحافظ الخمسة
npm run launch -- --keypair ~/ezto-launch.json --recipients recipients.json --uri <رابط-الـmetadata>
# راجع الخطة، وإذا كلشي تمام:
npm run launch -- --keypair ~/ezto-launch.json --recipients recipients.json --uri <رابط-الـmetadata> --execute
```
افتح الرابط اللي بيطلع على Solana Explorer وتأكد إنو:
- Supply = 1,000,000,000
- Mint Authority = ما في
- Freeze Authority = ما في

## 3. الإطلاق الحقيقي على mainnet
نفس الأوامر بس مع `--cluster mainnet-beta`، وبتحتاج حوالي 0.05 SOL للرسوم.
**احفظ ملف `mint-mainnet-beta.json` وعنوان التوكن بمكان آمن.**

## 4. السيولة (Raydium)
1. من محفظة Liquidity روح على Raydium وافتح **Create Pool** (نوع CPMM).
2. حط الـ 400M EZTO ومعهن كمية SOL، وهي بتحدد السعر الأولي.
3. بعد ما تعمل الـ pool **احرق الـ LP tokens** (Raydium فيها خيار Burn & Earn). هيك ما حدا بيقدر يسحب السيولة.

## 5. قفل التوكنات (Streamflow)
من [Streamflow](https://app.streamflow.finance) اعمل Vesting:
| المحفظة | الإعداد |
|---|---|
| Team | Cliff 12 شهر، وبعدين linear 24 شهر |
| Platform | Cliff 6 شهور، وبعدين linear 24 شهر |
| Marketing | 50M حرّة، و100M linear 12 شهر |
| Staking | مقفولة لحد ما يجهز برنامج الـ staking |

انشر روابط عقود الـ vesting على الموقع.

## 6. بعد الإطلاق
- قفل الـ metadata نهائياً بعد ما يثبت اللوغو والروابط (منضيف أمر لهالشي).
- تسجيل التوكن على CoinGecko و CoinMarketCap.
- نشر عنوان التوكن الرسمي على الموقع وكل الحسابات.
