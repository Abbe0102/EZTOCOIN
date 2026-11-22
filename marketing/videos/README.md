# EZTO ready-to-post videos

Vertical 1080×1920, 30 fps, H.264, **no audio**: add a trending sound in the TikTok / Instagram app when posting (better reach, and licensed by the platform).
Text stays inside the safe area, clear of the TikTok side buttons and caption.

| File | Length | Topic |
|---|---|---|
| `out/red-flags.mp4` | 22 s | 3 red flags in any meme coin, and how EZTO avoids them |
| `out/what-is-ezto.mp4` | 18 s | What is EZTO, in 3 points |
| `out/fake-token.mp4` | 18 s | Scam warning: EZTO has not launched; where the real address will appear |
| `out/tokenomics.mp4` | 20 s | Where every EZTO token goes |
| `out/manifesto.mp4` | 18 s | Vision first, hype later: what EZTO stands for |
| `out/mint-authority.mp4` | 20 s | Can the dev print more coins? (mint authority explained) |
| `out/website.mp4` | 18 s | EZTO has a home: the site scrolling inside a phone |
| `out/roadmap.mp4` | 20 s | The four phases, one by one |

Suggested order (2–3 days apart): **manifesto → what-is-ezto → website → red-flags → mint-authority → fake-token → tokenomics → roadmap**.

## Captions

**what-is-ezto.mp4**
```
What is EZTO? 15 seconds. ⚡ A clean token on Solana, built in public, with a path to real products. Vision first, hype later. Join our Telegram, link in bio 👆
#EZTO #Solana #crypto #buildinpublic #memecoin
```

**red-flags.mp4**
```
3 red flags before you buy ANY meme coin 🚩 Save this before your next trade. EZTO: 0% tax, mint authority revoked, LP burned. Join our Telegram, link in bio 👆
#EZTO #Solana #crypto #memecoin #DYOR
```

**fake-token.mp4**
```
Someone WILL fake EZTO. Don't fall for it 🛡️ We haven't launched. The real address will only be on eztocoin.com and pinned in our Telegram. We never DM first. Share this with a friend.
#EZTO #Solana #cryptosafety #scamalert
```

**tokenomics.mp4**
```
1 billion EZTO, fixed forever. Here's where every single token goes 📊 Full details on eztocoin.com
#EZTO #Solana #tokenomics #crypto
```

**manifesto.mp4**
```
Most meme coins: hype first, nothing behind it. EZTO flips it. ⚡ Vision first, hype later. Follow the build, Telegram link in bio 👆
#EZTO #Solana #crypto #buildinpublic #memecoin
```

**mint-authority.mp4**
```
Can the dev just print more coins? 🤔 On Solana it depends on the "mint authority". EZTO's launch code revokes it forever, and the code is open source. Fixed supply. Forever.
#EZTO #Solana #crypto #DYOR #memecoin
```

**website.mp4**
```
EZTO has a home 🏠 Whitepaper, tokenomics and roadmap, all public on eztocoin.com. Bookmark it: it's the only place the real contract address will appear.
#EZTO #Solana #crypto #buildinpublic
```

**roadmap.mp4**
```
Where EZTO is going, one phase at a time 🗺️ Launch → Growth → EZTO Swap → Ecosystem. No dates until each phase is ready. Vision first, hype later.
#EZTO #Solana #roadmap #crypto
```

**Pinned comment (every video)**
```
Website: eztocoin.com · Telegram: link in bio · EZTO has not launched yet, any EZTO token today is fake.
```

## Editing / adding videos
Scenes live in `src/video.html` (`VIDEOS` object: one entry per video, scenes with start/end seconds).
Preview stills: `node src/render.js --preview /some/dir` · Render MP4s: `node src/render.js [id ...]` (needs Playwright + ffmpeg).
