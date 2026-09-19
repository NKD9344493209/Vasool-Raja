# Demo script (90 seconds + Q&A)

**Before:** `run.bat` (listens on 0.0.0.0 and prints the laptop's IP), open http://localhost:8000, language தமிழ் for the call, English for the judges' reading. Have `data/samples/` open in a second tab. Wi-Fi is not needed after load (Google Fonts fall back to system fonts).

| t | Say | Do |
|---|---|---|
| 0:00 | "This is Amma's Canara pension passbook, three months." | Home → pick *canara amma pension 2026* → Check my account |
| 0:10 | "₹5,027 the bank may owe her. Two failed transactions with ₹100 a day running. One penalty that needs one answer. One ₹27 charge we won't bother her with." | Found screen |
| 0:25 | "Every rupee has a rule beside it." | Why we think so on the ₹1,200 card → circular link, 12 days × ₹100, statement lines |
| 0:35 | "The statement can't show whether the bank warned her. So we ask — one question. Or we look at the previous quarter." | Scroll to **Statements** → add *canara amma pension 2026 mar may* → "+18 new lines, 2 duplicates skipped" → the ₹348 card is now **Confirmed**: May's balance never fell below ₹500 |
| 0:45 | "Get it back. Nothing is sent. And it prints — Kumar can hand it over at the branch." | Get it back → case prepared → **Print complaint** (A4 letter, Annexure A, acknowledgement box) |
| 0:55 | "Amma can't read this. Her phone rings first." | Ask my guardian → Play the call (Tamil) |
| 1:05 | "Kumar gets one message. No balance, no spending. One button." | **Real:** teammate's phone buzzes with the mail → tap *Yes, send the complaint* → laptop screen flips to *Sent to the bank* on its own. **Fallback (no network):** WhatsApp bubble → Approve as Kumar |
| 1:15 | "Sent. Thirty-day clock. We watch it, she doesn't." | Case screen: 30 days left, tracker |
| 1:25 | "And the assistant only explains what the engine decided." | Ask → *why did the bank charge me 295?* |

## Real-phone setup (do this the night before)

1. Gmail account for the team → turn on 2-Step Verification → Google Account › Security › **App passwords** → create one ("Mail") → 16 characters.
2. Copy `.env.example` to `.env` in the app folder and fill `VASOOL_SMTP_USER`, `VASOOL_SMTP_PASS`, and `VASOOL_DEMO_TO` = the teammate's Gmail (the phone that will be shown to the judges). With `VASOOL_DEMO_TO` set, every mail goes there — no address typed anywhere else can leak out.
3. Laptop and that phone on the **same hotspot** (use the phone's own hotspot — college Wi-Fi often blocks port 465 and device-to-device traffic). `run.bat` prints the laptop's IPv4; put it in `.env` as `VASOOL_PUBLIC_URL=http://<ip>:8000` so the button in the mail opens the app on the phone.
4. Settings → **Real delivery** → *Send test mail* → it should arrive in under 10 s. Also open `http://<ip>:8000` on the phone once to confirm reach.
5. Guardian form → fill Kumar's email (or leave blank; `VASOOL_DEMO_TO` catches it).

What is real vs simulated — say it out loud: *the message to the family is real; the send to the bank is simulated — the complaint copy is mailed to the family with the bank's grievance address printed on it, and the printout goes to the branch.* Nothing in this build can email a bank.

**If asked "what about other months / other accounts?"** — Statements card: add any number of files, duplicates dropped, gaps named; **History** tab: every account scanned, open any to continue.

**If asked "isn't this just a rule engine?"** — scan *sbi arun student 2025*: partial reversal within T+5 → no claim; ₹25 in April judged by the ₹21 cap then; 6th withdrawal marked allowed; the Zomato retry is *asked about*, never claimed.

**If asked "what if I pay ₹50,000 college fees?"** — it's in Amma's statement. Not flagged. No anomaly detection here.

**Say "simulated"** before the recovery step: the refund is marked by a button or by uploading a later statement.
