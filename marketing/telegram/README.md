# EZTO Telegram Kit

Everything needed to run the official group **t.me/Eztocoin** as a safe, active home for the community.
Copy-paste ready. Keep the tone friendly, calm and honest. Never talk about price.

---

## 1. Group settings (Telegram app → group → Edit)

| Setting | Value | Why |
|---|---|---|
| Group name | `EZTO \| Official Community` | Same name everywhere; "Official" helps against fake groups |
| Photo | `brand/social/ezto-avatar-1000.png` | New logo |
| Description | See §3 | |
| Chat history for new members | **Visible** | New people see the pinned messages and activity |
| Slow mode | **10 seconds** | Stops spam waves without killing conversation |
| Members can: send media, stickers, GIFs, polls | ✅ | Keeps it fun |
| Members can: add members | ❌ | Stops mass-adding bots |
| Members can: pin messages, change info | ❌ | Only admins |
| Admin titles | `Founder`, `Mod` | People can see who is real staff |

**Admins:** keep the list short. Every admin must have 2FA on their Telegram account
(Settings → Privacy and Security → Two-Step Verification).

---

## 2. Anti-spam bot: Rose (@MissRose_bot)

Rose is free and widely used. It handles the captcha, welcome message, rules and scam filters.

**Add it:** open @MissRose_bot → *Add to group* → choose EZTO → make it **admin**
(permissions: delete messages, ban users, pin messages).

Then send these commands **in the group** (as admin). If a command is ever rejected, type `/help` in a private chat with Rose to see the current syntax.

```
/captcha on
/captchamode button
/welcome on
/setflood 5
/lock url
/lock forward
```

- `captcha`: new members must press a button before they can talk (blocks most bots).
- `setflood 5`: auto-mute anyone sending 5+ messages in a row.
- `lock url` / `lock forward`: members can't post links or forwards, the #1 scam vector. Admins still can.

**Welcome message:** send `/setwelcome` followed by the text in §4.
**Rules:** send `/setrules` followed by the text in §5.

**Blocklist** (auto-delete common scam phrases). Send each line as its own command:
```
/addblocklist "presale"
/addblocklist "send sol"
/addblocklist "dm me"
/addblocklist "support team"
/addblocklist "validate wallet"
/addblocklist "seed phrase"
```

**Quick-answer filters:** when someone types the trigger word, Rose replies automatically.
```
/filter ca EZTO has NOT launched yet. The official contract address will only be posted on eztocoin.com and pinned here. Any "EZTO" token you see today is fake.
/filter contract EZTO has NOT launched yet. The official contract address will only be posted on eztocoin.com and pinned here.
/filter whitepaper 📄 Read the whitepaper: https://eztocoin.com/whitepaper.html
/filter website 🌐 https://eztocoin.com
/filter tokenomics 📊 1,000,000,000 EZTO, fixed forever. Full breakdown: https://eztocoin.com/#tokenomics
/filter roadmap 🗺️ https://eztocoin.com/#roadmap
/filter launch 🚀 No launch date yet. We announce it here first, never in DMs. Vision first, hype later.
```

---

## 3. Group description (Edit → Description)

```
⚡ Official EZTO ($EZTO) community: Vision first, hype later.
A clean community token on Solana: 0% tax, fixed supply, built in public.

🌐 eztocoin.com
⚠️ Not launched yet. Admins NEVER DM first.
```

---

## 4. Welcome message (`/setwelcome`)

Rose replaces `{first}` with the new member's first name.

```
👋 Welcome to EZTO, {first}!

EZTO is a clean community token on Solana: 0% tax, fixed supply, built in public.
Vision first, hype later. ⚡

📌 Start here:
🌐 Website: eztocoin.com
📄 Whitepaper: eztocoin.com/whitepaper.html
📜 Rules: type /rules

⚠️ EZTO has NOT launched yet. Admins will NEVER DM you first. Anyone who DMs you offering EZTO, a "presale" or "support" is a scammer: block and report.
```

---

## 5. Rules (`/setrules`)

```
📜 EZTO community rules

1. Be respectful. No insults, racism or harassment.
2. English is the main language, so everyone can follow.
3. No price predictions, "moon" or "100x" talk. We talk about what EZTO builds.
4. No links, ads or promotion of other projects.
5. No spam or flooding.
6. Admins never DM first and never ask for funds or your seed phrase. Report anyone who does.
7. The official contract address will ONLY be posted on eztocoin.com and pinned here.

Breaking the rules = warning, then mute or ban.
```

---

## 6. Pinned messages (pin in this order; newest pin shows on top)

**Pin A: Official links**
```
🔗 EZTO official links (bookmark this)

🌐 Website: eztocoin.com
📄 Whitepaper: eztocoin.com/whitepaper.html
🐦 X: x.com/EZTOCOIN
🎵 TikTok: tiktok.com/@eztocoin
📸 Instagram: instagram.com/eztocoin
💻 Code: github.com/Abbe0102/EZTOCOIN
📧 hello@eztocoin.com

Any other link claiming to be EZTO is not ours.
```

**Pin B: Safety (keep this the top pin)**
```
⚠️ SAFETY FIRST

• EZTO has NOT launched. Any token called EZTO today is FAKE.
• The official contract address will be posted ONLY on eztocoin.com and pinned here.
• Admins will NEVER DM you first.
• No one from EZTO will ever ask for your seed phrase or ask you to send funds.

If someone DMs you "from EZTO": block and report them. 🛡️
```

---

## 7. Weekly activity calendar

A group stays alive when something happens every week.

| Day | Activity | Example |
|---|---|---|
| Monday | **Build update** | "This week we finished X, next we're working on Y." (screenshot or short video) |
| Wednesday | **Poll** | "Which feature should EZTO Swap show first? Portfolio / Price alerts / Swap history" |
| Friday | **Quiz** (Telegram quiz poll) | "What does 'mint authority revoked' mean?" Correct answers get a shout-out |
| Sunday (every 2 weeks) | **AMA: Ask Me Anything** | 30 min voice chat or text Q&A with the founder |

Rewards for activity: **shout-outs, a "Community" admin title for top helpers, early sneak peeks**.
Do **not** promise tokens or airdrops before launch.

### Ready-to-use posts

**Build update template**
```
🛠️ EZTO build update

✅ Done this week: [e.g. new website on eztocoin.com]
🔨 Working on: [e.g. launch preparations]
💬 Question for you: [e.g. what should we explain in our next TikTok?]

Vision first, hype later. ⚡
```

**AMA announcement**
```
🎙️ AMA this Sunday at [time + timezone]

Ask the founder anything about EZTO: the roadmap, the token, the plans.
Drop your questions below 👇 and we'll answer the best ones live.
```

**Poll ideas**
- What should our next TikTok be about? (Tokenomics explained / How to spot a scam / Behind the scenes)
- Which wallet do you use on Solana? (Phantom / Solflare / Backpack / Other)
- What matters most to you in a meme coin? (Community / Transparency / Real utility / Fun)

**Quiz ideas** (use Telegram's "Quiz" poll type)
- What is EZTO's buy/sell tax? → **0%**
- What happens to the LP tokens at launch? → **They are burned**
- Can more EZTO ever be created? → **No, mint authority is revoked**
- Which blockchain is EZTO on? → **Solana**

---

## 8. Moderator reply templates

| When someone asks… | Reply |
|---|---|
| "When launch?" | No date yet. We'll announce it here first, never in DMs. Follow the build in the meantime: eztocoin.com |
| "Wen moon / will it 100x?" | We don't do price talk here. We focus on what EZTO builds. Check the roadmap: eztocoin.com/#roadmap |
| "Is there a presale?" | No. There is no presale. Anyone offering one is a scammer. |
| "Who is the team?" | EZTO is led by an independent founder and built in public. All code is open source: github.com/Abbe0102/EZTOCOIN |
| "Can I help?" | Yes! Share our TikToks, invite friends who like honest projects, and give feedback here. Top helpers get a Community title. |
| "Partnership / collab?" | Thanks! Please email hello@eztocoin.com with details. |

### Handling a scammer in the group
1. Delete the message.
2. Ban the user (`/ban` as a reply to their message).
3. Post: `⚠️ We just removed a scammer. Reminder: admins never DM first. Only trust eztocoin.com.`

---

## 9. Growing the group (from TikTok)

- End **every** TikTok with "Join our Telegram, link in bio".
- In TikTok comments, answer questions and add: "More details in our Telegram (link in bio) 👋".
- Once a week, post a TikTok **about the Telegram** itself: a screen recording of an AMA, a poll result, a funny moment.
- Goal for the first month: **52 → 500 members**.
