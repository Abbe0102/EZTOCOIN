# EZTO ready-to-post videos

Vertical 1080×1920, 30 fps, H.264, **no audio**: add a trending sound in the TikTok / Instagram app when posting (better reach, and licensed by the platform).
Text stays inside the safe area, clear of the TikTok side buttons and caption.

| File | Length | Topic |
|---|---|---|
| `out/red-flags.mp4` | 22 s | 3 red flags in any meme coin, and how EZTO avoids them |
| `out/what-is-ezto.mp4` | 18 s | What is EZTO, in 3 points |
| `out/fake-token.mp4` | 18 s | Scam warning: EZTO has not launched; where the real address will appear |
| `out/tokenomics.mp4` | 20 s | Where every EZTO token goes |

Suggested order: **what-is-ezto → red-flags → fake-token → tokenomics**, 2–3 days apart.

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

**Pinned comment (every video)**
```
Website: eztocoin.com · Telegram: link in bio · EZTO has not launched yet, any EZTO token today is fake.
```

## Editing / adding videos
Scenes live in `src/video.html` (`VIDEOS` object: one entry per video, scenes with start/end seconds).
Preview stills: `node src/render.js --preview /some/dir` · Render MP4s: `node src/render.js [id ...]` (needs Playwright + ffmpeg).
