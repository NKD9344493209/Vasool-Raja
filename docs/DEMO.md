# Demo script (2 minutes + Q&A)

**Before:** `python -m uvicorn api.main:app --host 0.0.0.0 --port 8000` (or `run.bat`), open http://localhost:8000, language தமிழ் for the call, English for the judges' reading. Have `data/samples/` open in a second tab. Wi-Fi is not needed after load (Google Fonts fall back to system fonts) — except for the real call and the real mail.

The three moments that make people look up are **the Twin View** (0:25), **the time slider** (0:45) and **the phone actually ringing** (1:15). Rehearse those three.

| t | Say | Do |
|---|---|---|
| 0:00 | "This is Amma's Canara pension passbook, three months. Her phone number goes here — you'll see why." | Home → pick *canara amma pension 2026* → type the demo phone in **Your phone** → Check my account |
| 0:10 | "₹5,027 the bank may owe her. Two failed transactions with ₹100 a day running. One penalty that needs one answer." | Found screen |
| 0:25 | "This is the digital twin — not a chart, the twin. Top lane: what RBI says should have happened. Bottom lane: what her statement says happened. The red is the gap. Watch it count." | ⇄ **See the twin** on the ₹3,800 UPI card → the band grows day by day, the counter climbs to ₹3,800 → point at *expected − actual = delta → claim* |
| 0:45 | "Every day the bank waits, the number grows. Here is today. Here is next month." | ← Back → **Bank waits** card → drag the slider a month ahead → the big number rolls up live, the UPI card re-prices; the ATM card doesn't move ("already reversed — frozen") → **Today** |
| 0:55 | "The statement can't show whether the bank warned her. The twin says: blind month." | ⇄ See the twin on the ₹348 card → *blind month* warning → **Add that statement** → add *canara amma pension 2026 mar may* → twin now shows May's balance line never touching ₹500 → card is **Confirmed** |
| 1:05 | "Get it back. Nothing is sent yet. It prints — Kumar can hand it over at the branch." | Get it back → case prepared → **Print complaint** (glance only) |
| 1:15 | "Amma can't read this. So her phone rings first — in Tamil." | **Ask my guardian** → hold the phone up; it rings within ~5 s; put it on speaker for one sentence → toast on screen: *📞 Calling +91…* |
| 1:30 | "Kumar gets one message. No balance, no spending. One button." | **Real:** teammate's phone gets the mail → tap *Yes, send the complaint* → laptop flips to *Sent to the bank* by itself. **Fallback:** WhatsApp bubble → Approve as Kumar |
| 1:45 | "Sent. Thirty-day clock. We watch it, she doesn't. And the assistant only explains what the engine decided." | Case screen → Ask → *why did the bank charge me 295?* |

## Real-phone setup (do this the night before)

### The mail (guardian's one button)
1. Gmail account for the team → 2-Step Verification → Google Account › Security › **App passwords** → create one ("Mail") → 16 characters.
2. Copy `.env.example` to `.env` in the app folder and fill `VASOOL_SMTP_USER`, `VASOOL_SMTP_PASS`, and `VASOOL_DEMO_TO` = the teammate's Gmail (the phone shown to the judges). With `VASOOL_DEMO_TO` set, every mail goes there — no address typed anywhere else can leak out.
3. Laptop and that phone on the **same hotspot** (the phone's own hotspot — college Wi-Fi often blocks port 465 and device-to-device traffic). The server prints the laptop's IPv4; put it in `.env` as `VASOOL_PUBLIC_URL=http://<ip>:8000` so the button in the mail opens the app on the phone.
4. Settings → **Real delivery** → *Send test mail* → arrives in under 10 s. Open `http://<ip>:8000` on the phone once to confirm reach.

### The call (Amma's phone rings)
1. twilio.com → free trial → verify your own mobile → **Get a trial number**.
2. Console home › *Account Info*: copy **Account SID**, **Auth Token**, and the trial **phone number** into `.env` as `VASOOL_TWILIO_SID`, `VASOOL_TWILIO_TOKEN`, `VASOOL_TWILIO_FROM` (the number in `+1…` form).
3. `VASOOL_DEMO_PHONE=+91xxxxxxxxxx` — the phone you will hold up. A trial account can only ring **verified** numbers, and this line redirects every call there anyway, so the demo cannot ring a stranger.
4. Restart the server → Settings → *Voice is ON* → **Test call** → the phone rings within seconds. A trial call starts with Twilio's own 5-second preamble ("you have a trial account…") — press any key on the phone and the Tamil voice follows. Say that out loud before the judges hear it.
5. If the hall has no data: the toast says *Call simulated (…)* and the on-screen Play-the-call button still speaks the same script — the demo does not break.

What is real vs simulated — say it out loud: *the call and the message to the family are real; the send to the bank is simulated — the complaint copy is mailed to the family with the bank's grievance address printed on it, and the printout goes to the branch.* Nothing in this build can email or call a bank.

## If the judges ask

**"Isn't this just a rule engine?"** — Yes, on purpose: the engine decides, the LLM only explains. Scan *sbi arun student 2025*: partial reversal within T+5 → no claim; ₹25 in April judged by the ₹21 cap then; 6th withdrawal marked allowed; the Zomato retry is *asked about*, never claimed.

**"Where's the twin?"** — Open any ⇄ button. Two states, one delta, and the delta *moves with time* (the slider). That is the definition on slide 3, running.

**"What about other months / accounts?"** — Statements card: any number of files, duplicates dropped, gaps named; the twin marks months it cannot see as blind. **History** tab: every account scanned.

**"What if I pay ₹50,000 college fees?"** — It's in Amma's statement. Not flagged. No anomaly detection.

**"Have you recovered real money?"** — No. Say so. The refund is marked by a button or by uploading a later statement.

## Two more ideas if there is time before the 25th
- **Live photo:** take a picture of a printed passbook page on the phone, send it to the laptop, scan it on stage (OCR path already works on `passbook_amma_page.png`).
- **Scan-your-own QR:** a QR on the last slide to the GitHub repo once it is public; judges scan a sample on their own phone at `http://<ip>:8000`.
