# Vasool Raja — Regulatory Digital Twin for bank customers

> **AI explains. Rules decide. Evidence proves.**

Give it a bank statement or a passbook photo. It reconstructs your account as a **digital twin**, runs a **deterministic RBI rule engine** over that twin, and turns every difference between *what happened* and *what the rule says should have happened* into a **finding with an evidence chain** — the statement line, the account state, the rule in force on that date, the arithmetic, the potential claim. The assistant explains it in Tamil or English; a trusted family member can approve the action from their phone; the output is an **evidence pack** ready for the branch or the RBI Ombudsman.

Built by **Mad Angles, Coimbatore Institute of Technology** for HackVerse 2.0 (Digital Twins & FinTech), Karpagam College of Engineering.

## Product

**"Is my bank account being charged fairly?"** — that is the first question on the dashboard, and the whole product is the answer to it: potential recovery, how many findings, which need action, which need one answer from you, which are only information. Nothing is presented as guaranteed money: a *potential claim* is what the evidence supports; it becomes money only when the bank or the Ombudsman decides.

## Problem

Indian bank customers are protected by a large body of RBI customer-protection rules — ₹100/day compensation for failed transactions not reversed in time, notice before a minimum-balance penalty, free ATM transactions, no charge for SMS alerts beyond actual use, no reactivation fee for a dormant account. Almost nobody knows them, statements don't cite them, and the person most affected — a pensioner with a passbook — has the least chance of reading a circular. The evidence of every breach is already in the statement. Nobody turns it into a claim.

## Solution — how the digital twin works

```
Bank data (statement / passbook photo)
  ↓  parse · classify · pair debits with reversals
Digital twin (account state: transactions, balance history, charges, reversals, ATM counts, months)
  ↓  19 RBI rules, each evaluated at its own effective date
Findings (what happened · what should have happened · difference)
  ↓  evidence chain: line → state → rule → calculation → evidence → claim
AI explanation (Tamil / English, voice) — explains, never decides
  ↓  human confirmation: one question if the statement can't show it; guardian approval
Evidence pack (A4 letter, numbered claims with RBI reference, Annexure A) → action
```

The twin is derived from the uploaded lines only. The **My Twin** screen shows it: every count, the balance path, every reversal pair against its T+n deadline, every charge, and — for every line — **"Why wasn't this flagged?"**, the deterministic checklist the engine ran, so the product proves it does not flag everything.

## Features (all implemented)

| | |
|---|---|
| **Dashboard** | potential recovery · findings by status (action / needs confirmation / informational) · account overview tiles from the twin · demonstration-data label |
| **Scan experience** | a real timeline while the engine runs, finished with real numbers from the scan (transactions parsed, months, reversal pairs, rules evaluated, lines flagged / not flagged) |
| **Findings** | each card opens an **Evidence chain**: what happened → what should have happened → what we found → why flagged → statement lines → rule in force (circular, date, window) → calculation → potential claim |
| **Twin View** | for every ₹/day and minimum-balance finding: two lanes (actual vs expected regulatory state), the gap growing day by day, blind months shown as blind |
| **Time slider** | "every day the bank waits, the number grows" — move the as-of date and every unreversed failure re-prices at ₹100/day |
| **My Twin** | the account state as a picture, plus "Why wasn't this flagged?" on every line |
| **Ask Vasool Raja** | answers from the account's findings and the rulebook; corrects wrong claims with the source; says when evidence is insufficient; voice in and out |
| **Guardian** | consent → trusted guardian → review → approve; minimum information (amount, rule, one button); revoke; audit history; real Tamil phone call (Twilio) and real one-button email when configured — never to a bank |
| **Evidence pack** | A4 complaint with numbered claims, RBI reference and window, arithmetic, Annexure A of statement lines, requested resolution, acknowledgement box; Ombudsman draft; 30-day clock |
| **Rulebook** | every implemented rule with source, date, window, formula; scope statement; **System validation** card with the real test results |
| **Privacy centre** | what is collected, why, how long, who sees it; never-asked list; the security controls actually in this build; one-button delete |
| **Multi-statement history** | any number of statements per account, duplicates dropped, gaps named, verdicts that change when a month appears |
| **Passbook OCR** | printed passbook pages via Tesseract, conservative |

## Regulatory scope — read this

This prototype implements **19 RBI customer-protection rules** (22 listed in the rulebook, 3 marked *suggest* and never applied; 40 mapped in the design). It is **not complete RBI coverage**. Every implemented rule links to its circular and effective window in `rulebook/rules.json`; `GET /api/scope` reports the same numbers the UI shows. Rules that are mapped but not implemented are never applied, and nothing in the app claims otherwise.

## AI role

The rule engine (`vasool/rules/`) is deterministic and produces every finding. The assistant (`vasool/assistant.py`) only explains: it retrieves the structured finding, the rule and the evidence lines, and phrases them; it cannot create, upgrade or remove a finding. With `VASOOL_LLM=on` an LLM may rephrase, but the facts still come from the engine. Where evidence is insufficient the assistant says so and asks the one question that decides.

## Security

Implemented in this build (see the Privacy centre in the app):

* uploads limited to PDF / CSV / TSV / XLSX / images, 15 MB, checked server-side (415 / 413 otherwise); the file itself is never stored — only its transaction lines
* one local SQLite database; nothing is sent anywhere by default
* secrets only in `.env` (loaded by a tiny loader; never logged); `VASOOL_DEMO_TO` / `VASOOL_DEMO_PHONE` redirect every mail and call to one safe address
* no bank is ever emailed or called — hard-coded, not configurable
* security headers on every response (`nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, API responses `no-store`)
* every state change in an audit log; one-button deletion of all data for an account; guardian access revocable
* never asked for: net-banking password, OTP, ATM PIN, CVV, Aadhaar/PAN

Not in this build (see limitations): user accounts / login, rate limiting, encryption at rest.

## Testing

`python -m pytest -q` — **92 tests**, and `python scripts/validate.py` writes the real results to `data/validation.json`, which the Rulebook screen shows (never typed by hand). Groups: rule engine (28), assistant (22), statement merging & history (10), twin / time slider / voice (10), API & human loop (7), explainability (6), real delivery (5), passbook OCR (4).

## Run it

```bash
pip install -r requirements-dev.txt                 # Python 3.10+; tesseract-ocr for passbook photos
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000   # → http://localhost:8000
python scripts/validate.py                          # optional: refresh the System validation card
```

Optional real delivery: copy `.env.example` to `.env` (Gmail app password for the guardian mail; Twilio SID/token/number for the Tamil call). See `docs/DEMO.md`.

## Demo (3 minutes)

`docs/DEMO.md` has the choreography. Home → *canara amma pension 2026* → Check my account → scan timeline → dashboard → Findings → Evidence chain → See the twin → time slider → My Twin → "Why wasn't this flagged?" on the ₹50,000 college fee → Ask "why was ₹295 charged?" → answer the notice question → Get it back → Ask my guardian (phone rings) → Approve → CASE READY → Evidence pack. All sample data is synthetic and labelled **DEMONSTRATION DATA** in the app.

## Repository

```
rulebook/rules.json      the open rulebook — rule, circular, date, effective window, formula, evidence, questions
vasool/                  engine: parsers → classify → pairing → twin → rules → priority → complaint → cases → guardian → assistant
vasool/explain.py        twin summary + "why wasn't this flagged?" (derived from the twin, never re-decided)
api/main.py              FastAPI: scan, twin, why-not, scope, validation, answers, cases, approvals, guardian, ask
web/static/              the app (vanilla JS, Tamil/English, voice via the browser)
data/samples/            synthetic statements + passbook image — DEMONSTRATION DATA
tests/                   92 tests; scripts/validate.py turns them into data/validation.json
docs/                    ARCHITECTURE.md · DEMO.md · RULEBOOK.md · PRIVACY.md · screenshots
```

## Limitations (honest)

* **Data access** is upload or photo. Automatic watching needs RBI's Account Aggregator, which only regulated entities may use.
* **No real claim has been filed yet.** Recovery in the demo is marked by a button or by uploading the next statement.
* **Submission is not automated** — the app never contacts a bank. "Ready to submit" means the evidence pack is yours to hand in or file at cms.rbi.org.in.
* **Passbook OCR** is conservative and asks for a retake rather than guess.
* **Working days** for card-closure / gold-release rules are Mon–Fri; bank holidays are not modelled.
* **No login.** The prototype is single-user on one machine; production needs accounts, rate limiting and encryption at rest.
* Rules marked `suggest` raise a "needs checking" finding only.

## Roadmap

consent-based bank data via Account Aggregator · more rules (the 21 mapped-not-implemented first) · more statement formats · production security (accounts, encryption at rest, rate limits) · complaint integration with bank grievance portals and CMS · accessibility expansion · bank-side use of the same engine to find exceptions before they become complaints.

## Licence

Apache 2.0. The rulebook is open data — copy it, audit it, correct it.
