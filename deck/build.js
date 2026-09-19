const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.author = "Mad Angles, Coimbatore Institute of Technology";
pres.title = "Vasool Raja — Regulatory Digital Twin (HackVerse 2.0)";

// Palette
const GREEN = "1E6A44", GREEN_DK = "144C31", GREEN_SOFT = "E3EFE7";
const GOLD = "C9961A", GOLD_SOFT = "F6EDD3";
const INK = "18261F", INK2 = "4E5D55", LINE = "D7DDD6";
const RED = "A9392C", RED_SOFT = "F7E3DF";
const WHITE = "FFFFFF", PAPER = "F5F7F2";
const HEAD = "Cambria", BODY = "Calibri";

const W = 13.33, H = 7.5, M = 0.6;

function label(slide, text, dark) {
  slide.addText(text.toUpperCase(), { x: M, y: 0.32, w: 4, h: 0.3, fontFace: BODY, fontSize: 10, bold: true, charSpacing: 3, color: dark ? GOLD : GREEN, margin: 0, isTextBox: true });
}
function footer(slide, n, dark) {
  slide.addText("Vasool Raja  ·  HackVerse 2.0  ·  Digital Twins & FinTech", { x: M, y: H - 0.55, w: 8, h: 0.3, fontFace: BODY, fontSize: 9, color: dark ? "9DB8A8" : INK2, margin: 0, isTextBox: true });
  slide.addText(String(n), { x: W - M - 0.6, y: H - 0.55, w: 0.6, h: 0.3, fontFace: BODY, fontSize: 9, color: dark ? "9DB8A8" : INK2, align: "right", margin: 0, isTextBox: true });
}
function title(slide, text, opts = {}) {
  slide.addText(text, { x: M, y: 0.7, w: W - 2 * M, h: 1.0, fontFace: HEAD, fontSize: opts.size || 34, bold: true, color: opts.color || INK, margin: 0, isTextBox: true, valign: "top" });
}

// ---------- Slide 0: Cover (rupee-note engraving) ----------
{
  const s = pres.addSlide();
  s.background = { color: "EDE6CF" };
  s.addImage({ path: "/home/claude/deck/cover-note.png", x: 0, y: 0, w: W, h: H });
  s.addNotes("Cover. A rupee-note-style engraving of the team's own design: guilloche rosettes, windowed security thread with micro-text, an engraved ₹ in the watermark window, denomination 100 = the ₹100/day hook, the tagline in eight Indian scripts, bleed lines and ID mark. Clearly marked 'not legal tender'; no issuer name, emblem or portrait.");
}

// ---------- Slide 1: Hook ----------
{
  const s = pres.addSlide();
  s.background = { color: GREEN_DK };
  label(s, "Problem", true);
  s.addText("₹100/day compensation", { x: M, y: 1.35, w: 12.2, h: 1.4, fontFace: HEAD, fontSize: 68, bold: true, color: GOLD, margin: 0, isTextBox: true, valign: "middle" });
  s.addText("When an eligible failed transaction is not reversed within the prescribed time.", { x: M, y: 2.85, w: 11.5, h: 0.6, fontFace: BODY, fontSize: 22, color: WHITE, margin: 0, isTextBox: true });
  s.addText("RBI/2019-20/67 · in force since 15 Oct 2019 · eligibility and the T+1 / T+5 windows depend on the channel — not every failed transaction qualifies. Most customers never know to check.", { x: M, y: 3.5, w: 11.5, h: 0.6, fontFace: BODY, fontSize: 12, color: "9DB8A8", margin: 0, isTextBox: true });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 4.35, w: 12.13, h: 1.15, fill: { color: "0E3A25" }, line: { color: "0E3A25" } });
  s.addText([
    { text: "Vasool Raja checks your statement against the RBI rule that applied on that date.", options: { bold: true, fontSize: 17, color: WHITE, breakLine: true } },
    { text: "22 RBI rules implemented  ·  76 automated tests  ·  ready to demo", options: { fontSize: 13, color: GOLD } },
  ], { x: M + 0.25, y: 4.35, w: 11.7, h: 1.15, fontFace: BODY, margin: 0, isTextBox: true, valign: "middle" });
  s.addText("Rule-driven.  Evidence-backed.  Human-confirmed.", { x: M, y: 5.7, w: 11.5, h: 0.4, fontFace: HEAD, fontSize: 16, italic: true, color: GOLD_SOFT, margin: 0, isTextBox: true });
  s.addNotes("ABSTRACT. Problem. Indian banks operate under a detailed RBI rulebook on charges, failed-transaction reversal and compensation (₹100/day when an eligible failed transaction is not reversed within the prescribed time, RBI/2019-20/67), yet customers never read it. Banks collected ₹7,086 crore in minimum-balance penalties in FY26; 13.34 lakh Ombudsman complaints were filed in FY25. Solution. Vasool Raja is a Regulatory Digital Twin: the customer's actual financial state (transactions, balances, reversals) is compared with the expected regulatory state (the versioned RBI rule in force on that date, its required action, deadline and compensation formula); the delta is an evidence-backed potential claim. 22 RBI rules implemented as an open JSON rulebook (40 mapped), 76 automated tests; findings labelled recoverable / avoidable / unclear; complaint prepared and tracked on the statutory 30-day clock; no complaint is filed without human confirmation. A deterministic rule engine decides; an LLM only extracts, explains and communicates (Tamil voice, family Guardian). Feasibility. Built: FastAPI + rule engine + web app; CSV/PDF/passbook-photo OCR, multi-statement history, printed A4 complaint, real one-button guardian email. Impact. Every UPI user; free for consumers; bank-side use: detect regulatory exceptions before they become complaints. Keywords: Digital Twin, Regulatory Twin, RegTech, FinTech, RBI compliance, rule engine, evidence chain, grievance redressal, UPI, financial inclusion, Tamil.");
}

// ---------- Slide 2: Rulebook ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Problem · Regulatory engine");
  title(s, "It's not one rule. It's a rulebook — versioned, tested, deterministic.", { size: 30 });
  s.addText("₹100/day is one of about forty RBI rules that decide what your bank may charge, what it must tell you first, and what it owes you when it fails. Your bank knows all of them. You know none.", { x: M, y: 1.6, w: 7.9, h: 0.9, fontFace: BODY, fontSize: 14.5, color: INK2, margin: 0, isTextBox: true });
  // funnel: mapped → implemented → tests → decision
  const fx = 8.85, fw = W - M - fx;
  s.addShape(pres.shapes.RECTANGLE, { x: fx, y: 1.55, w: fw, h: 1.0, fill: { color: GREEN_DK }, line: { color: GREEN_DK } });
  const steps = [["40", "RBI rules mapped"], ["22", "fully implemented & tested"], ["76", "automated tests — all passing"], ["✓", "deterministic decision"]];
  const sw = (fw - 0.2) / 4;
  steps.forEach((st, i) => {
    const x = fx + 0.1 + i * sw;
    s.addText(st[0], { x, y: 1.6, w: sw, h: 0.5, fontFace: HEAD, fontSize: 22, bold: true, color: GOLD, align: "center", margin: 0, isTextBox: true });
    s.addText(st[1], { x, y: 2.08, w: sw, h: 0.42, fontFace: BODY, fontSize: 8.5, color: WHITE, align: "center", margin: 0, isTextBox: true, valign: "top" });
    if (i < 3) s.addText("→", { x: x + sw - 0.12, y: 1.68, w: 0.24, h: 0.4, fontFace: HEAD, fontSize: 12, color: "9DB8A8", align: "center", margin: 0, isTextBox: true });
  });
  s.addText([
    { text: "40 mapped does NOT mean 40 implemented. ", options: { bold: true, color: RED } },
    { text: "Each of the 22 implemented rules carries: RBI source / circular · effective date · conditions / formula · required evidence · automated tests. A rule engine, not an LLM guessing what RBI says.", options: { color: INK2 } },
  ], { x: M, y: 2.6, w: W - 2 * M, h: 0.36, fontFace: BODY, fontSize: 10.5, italic: true, margin: 0, isTextBox: true });
  const rules = [
    ["Failed transaction", "Reversal by T+1 (UPI) or T+5 (ATM); ₹100/day after, paid without a complaint", "RBI/2019-20/67 · 2019"],
    ["Minimum balance", "Warning notice + one month to restore; penalty proportionate; never negative", "RBI · 20 Nov 2014"],
    ["ATM charges", "5 free own-bank, 3/5 other-bank, enquiries count; max ₹23 after", "RBI · eff. 1 May 2025"],
    ["Credit-card closure", "Closed within 7 working days of request, else ₹500/day", "Card Directions · 2022"],
    ["Unauthorised transaction", "Report within 3 working days → zero liability; shadow credit in 10 days", "RBI · 6 Jul 2017"],
    ["Loan charges", "Nothing outside the Key Fact Statement; penal charges never capitalised", "RBI · eff. 1 Oct 2024"],
    ["Inactive accounts", "No minimum-balance penalty, no reactivation charge", "RBI · eff. 1 Apr 2024"],
    ["Bank lockers", "Loss by negligence, fire, theft or staff fraud: up to 100× annual rent", "RBI · Aug 2021"],
  ];
  const cw = (W - 2 * M - 3 * 0.25) / 4, ch = 1.7;
  rules.forEach((r, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = M + col * (cw + 0.25), y = 3.05 + row * (ch + 0.22);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: cw, h: ch, fill: { color: PAPER }, line: { color: LINE, width: 0.75 } });
    s.addText(r[0], { x: x + 0.18, y: y + 0.12, w: cw - 0.36, h: 0.35, fontFace: HEAD, fontSize: 14.5, bold: true, color: GREEN, margin: 0, isTextBox: true });
    s.addText(r[1], { x: x + 0.18, y: y + 0.5, w: cw - 0.36, h: 0.8, fontFace: BODY, fontSize: 11, color: INK, margin: 0, isTextBox: true, valign: "top" });
    s.addText(r[2], { x: x + 0.18, y: y + ch - 0.38, w: cw - 0.36, h: 0.28, fontFace: BODY, fontSize: 9.5, color: INK2, margin: 0, isTextBox: true });
  });
  footer(s, 2);
  s.addNotes("The rulebook slide: establishes that Vasool Raja is a rule engine over the RBI consumer rulebook, not an app for failed ATM transactions. 40 rules mapped; 22 implemented as open JSON (rulebook/rules.json), each with circular, effective window, formula, evidence, questions and automated tests (76 passing). Eight shown. Rules change (the ATM cap was ₹21 before 1 May 2025), so every rule is versioned by effective date. Rule-change pipeline: RBI notification → rule update → human verification → test cases → production.");
}

// ---------- Slide 3: Amma's passbook ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Problem");
  title(s, "Amma's passbook: ₹295 gone. “System charge, ma’am.”");
  // passbook table
  const rows = [
    [{ text: "Date", options: { bold: true, color: INK2 } }, { text: "Particulars", options: { bold: true, color: INK2 } }, { text: "Withdrawal", options: { bold: true, color: INK2, align: "right" } }, { text: "Deposit", options: { bold: true, color: INK2, align: "right" } }, { text: "Balance", options: { bold: true, color: INK2, align: "right" } }],
    ["02/06/26", "NEFT PENSION JUN", "", { text: "6,500.00", options: { align: "right" } }, { text: "8,214.00", options: { align: "right" } }],
    ["04/06/26", "ATM WDL CANARA RS PURAM", { text: "3,000.00", options: { align: "right" } }, "", { text: "5,214.00", options: { align: "right" } }],
    ["11/06/26", "ATM WDL SBI GANDHIPURAM", { text: "2,000.00", options: { align: "right" } }, "", { text: "3,214.00", options: { align: "right" } }],
    [{ text: "30/06/26", options: { fill: { color: RED_SOFT } } }, { text: "CHRG MIN BAL NON MAINT   ?", options: { fill: { color: RED_SOFT }, bold: true, color: RED } }, { text: "295.00", options: { align: "right", fill: { color: RED_SOFT }, bold: true, color: RED } }, { text: "", options: { fill: { color: RED_SOFT } } }, { text: "2,919.00", options: { align: "right", fill: { color: RED_SOFT } } }],
    [{ text: "30/06/26", options: { fill: { color: RED_SOFT } } }, { text: "SMS ALERT CHRG Q1   ?", options: { fill: { color: RED_SOFT }, bold: true, color: RED } }, { text: "17.70", options: { align: "right", fill: { color: RED_SOFT }, bold: true, color: RED } }, { text: "", options: { fill: { color: RED_SOFT } } }, { text: "2,901.30", options: { align: "right", fill: { color: RED_SOFT } } }],
  ];
  s.addTable(rows, { x: M, y: 1.85, w: 7.0, colW: [1.05, 2.75, 1.1, 1.0, 1.1], fontFace: "Courier New", fontSize: 10.5, color: INK, border: { type: "solid", color: LINE, pt: 0.5 }, fill: { color: PAPER }, rowH: 0.36, margin: 0.06 });
  s.addText("A printed passbook page, June 2026. The two lines she cannot explain.", { x: M, y: 4.05, w: 7, h: 0.28, fontFace: BODY, fontSize: 10, italic: true, color: INK2, margin: 0, isTextBox: true });

  const flow = [["PASSBOOK PHOTO", "page photographed · OCR"], ["TRANSACTION", "CHRG MIN BAL ₹295 · 30 Jun"], ["RBI RULE", "min-balance penalty · 20 Nov 2014"], ["ENGINE CHECK", "warning? ✗ · one month? ✗"], ["EVIDENCE", "2 statement lines"], ["VERDICT", "₹295 potentially recoverable"], ["EXPLANATION", "Tamil · guardian · human confirms"]];
  const fw = (W - 2 * M - 6 * 0.22) / 7;
  flow.forEach(([k, v], i) => {
    const x = M + i * (fw + 0.22), hot = i === 5;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.55, w: fw, h: 0.66, fill: { color: hot ? GREEN_SOFT : i === 6 ? GOLD_SOFT : PAPER }, line: { color: hot ? GREEN : i === 6 ? GOLD : LINE, width: 0.75 } });
    s.addText(k, { x: x + 0.08, y: 4.58, w: fw - 0.16, h: 0.22, fontFace: BODY, fontSize: 7.5, bold: true, charSpacing: 1.5, color: hot ? GREEN : INK2, margin: 0, isTextBox: true });
    s.addText(v, { x: x + 0.08, y: 4.79, w: fw - 0.16, h: 0.4, fontFace: BODY, fontSize: 9, bold: hot, color: INK, margin: 0, isTextBox: true, valign: "top" });
    if (i < 6) s.addText("→", { x: x + fw - 0.02, y: 4.71, w: 0.26, h: 0.3, fontFace: HEAD, fontSize: 13, color: INK2, align: "center", margin: 0, isTextBox: true });
  });
  // scene
  const scene = [
    ["She asks", "“Why ₹295?”"],
    ["Counter", "“System charge, ma’am.” She leaves."],
    ["The rule", "A minimum-balance penalty needs a warning and one month to restore. She got neither."],
    ["Months later", "Her phone rings, in Tamil: “Amma, unga account-la ₹590 thappa cut aagirukku. Kumar-ku sollirukkom.”"],
    ["Her son", "Gets one message: ₹590 potential claim · the RBI rule · evidence ready · one button. Nothing is filed until he confirms."],
  ];
  let y = 1.85;
  scene.forEach(([k, v]) => {
    s.addText(k.toUpperCase(), { x: 8.0, y, w: 1.3, h: 0.3, fontFace: BODY, fontSize: 8.5, bold: true, charSpacing: 2, color: GREEN, margin: 0, isTextBox: true });
    s.addText(v, { x: 9.35, y: y - 0.02, w: 3.4, h: 0.5, fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, isTextBox: true, valign: "top" });
    y += 0.52;
  });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 5.38, w: W - 2 * M, h: 1.3, fill: { color: GREEN_SOFT }, line: { color: GREEN_SOFT } });
  s.addText("People have rights they don’t know they have, and the process to exercise them is too hard.", { x: M + 0.3, y: 5.48, w: W - 2 * M - 0.6, h: 0.5, fontFace: HEAD, fontSize: 18, bold: true, color: GREEN, margin: 0, isTextBox: true });
  s.addText("The rules are hidden knowledge. The statement is hidden evidence. The complaint is a process nobody finishes. Vasool Raja identifies the potential claim and prepares the recovery workflow — an actual financial event checked against the rule that applied to it. Nothing is filed until human confirmation.", { x: M + 0.3, y: 5.98, w: 8.9, h: 0.65, fontFace: BODY, fontSize: 11, color: INK, margin: 0, isTextBox: true, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.75, y: 5.98, w: 2.98, h: 0.6, fill: { color: GOLD_SOFT }, line: { color: GOLD, width: 0.75 } });
  s.addText("Tamil voice + guardian = accessibility layer — same regulatory engine underneath.", { x: 9.83, y: 5.98, w: 2.85, h: 0.6, fontFace: BODY, fontSize: 9.5, bold: true, color: "7A5A0E", margin: 0, isTextBox: true, valign: "middle" });
  footer(s, 3);
  s.addNotes("Passbook table (text, not an image): NEFT pension 6,500; ATM withdrawals 3,000 and 2,000; minimum-balance charge 295.00 and SMS alert charge 17.70 on 30/06/26. Scene: she asks why; counter says system charge; the rule requires notice and one month; months later a Tamil voice call and one WhatsApp to her son. Spine: people have rights they don't know they have, and the process to exercise them is too hard.");
}

// ---------- Slide 4: Scale ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Impact · Problem scale");
  title(s, "₹7,086 crore in penalties last year. 13.34 lakh complaints.");
  s.addText("Regulatory-rule violations happen at massive scale, while customers must currently discover and pursue them manually. These are problem-scale figures from public sources — not Vasool Raja results, and not amounts Vasool Raja claims to recover.", { x: M, y: 1.55, w: W - 2 * M, h: 0.4, fontFace: BODY, fontSize: 11, italic: true, color: INK2, margin: 0, isTextBox: true });
  const stats = [
    ["₹7,086 cr", "minimum-balance penalties collected in FY26 alone", "Rajya Sabha reply, 28 Jul 2026 — HDFC ₹1,798 cr, Axis ₹1,081 cr"],
    ["₹35,588 cr", "minimum-balance, ATM and SMS charges, FY18–FY23", "Rajya Sabha reply, 8 Aug 2023"],
    ["13.34 lakh", "complaints to the RBI Ombudsman in FY25", "RBI Ombudsman Scheme annual report 2024–25"],
    ["₹59,600", "external documented case: awarded on a ₹10,000 ATM failure — ₹100/day for the 296 days until reversal, plus costs", "Delhi consumer commission, 27 Aug 2026 (ANI) — the customer litigated for four years; not a Vasool Raja recovery"],
  ];
  const cw = (W - 2 * M - 0.3) / 2, ch = 1.9;
  stats.forEach((st, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * (cw + 0.3), y = 2.05 + row * (ch + 0.25);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: cw, h: ch, fill: { color: PAPER }, line: { color: LINE, width: 0.75 } });
    s.addText(st[0], { x: x + 0.3, y: y + 0.15, w: cw - 0.6, h: 0.8, fontFace: HEAD, fontSize: 44, bold: true, color: GREEN, margin: 0, isTextBox: true });
    s.addText(st[1], { x: x + 0.3, y: y + 0.95, w: cw - 0.6, h: 0.5, fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, isTextBox: true, valign: "top" });
    s.addText("SOURCE  " + st[2], { x: x + 0.3, y: y + 1.45, w: cw - 0.6, h: 0.4, fontFace: BODY, fontSize: 9, color: INK2, margin: 0, isTextBox: true, valign: "top" });
  });
  s.addText("The customer in the ₹59,600 case got what RBI says should have been credited automatically — only because he litigated. Every UPI user in India is exposed to the same rules: 24.51 billion transactions a month (NPCI, Aug 2026).", { x: M, y: 6.35, w: W - 2 * M, h: 0.45, fontFace: BODY, fontSize: 11.5, italic: true, color: INK2, margin: 0, isTextBox: true });
  footer(s, 4);
  s.addNotes("Scale, all official: ₹7,086.63 crore minimum-balance penalties FY26 (Rajya Sabha, 28 Jul 2026); ₹35,587.68 crore FY18–FY23 (Rajya Sabha, 8 Aug 2023); 13.34 lakh complaints FY25 (RBI Ombudsman annual report); Punjab & Sind Bank ordered to pay ₹59,600 on a ₹10,000 failed ATM withdrawal (Delhi DCDRC, 27 Aug 2026). UPI volume: 24.51 billion transactions, August 2026 (NPCI).");
}

// ---------- Slide 5: Existing tools ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Innovation");
  title(s, "Existing solutions we evaluated each cover one step.");
  const hdr = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: GREEN }, fontSize: 12, align: "center", valign: "middle" } });
  const yes = { text: "✓", options: { color: GREEN, bold: true, align: "center", fontSize: 16 } };
  const no = { text: "—", options: { color: INK2, align: "center", fontSize: 14 } };
  const name = (t, sub) => ({ text: t + "\n" + sub, options: { fontSize: 11.5, color: INK, valign: "middle" } });
  const rows = [
    [{ text: "", options: { fill: { color: GREEN } } }, hdr("Finds the problem for you"), hdr("Computes what RBI says you’re owed"), hdr("Prepares evidence + complaint"), hdr("Runs the 30-day clock, escalates"), hdr("Tamil, voice, family helper")],
    [name("RBI CMS portal", "cms.rbi.org.in"), no, no, no, no, { text: "12 languages, web form", options: { fontSize: 10, color: INK2, align: "center" } }],
    [name("NPCI UPI Help", "status of a UPI transaction"), no, no, no, no, no],
    [name("ClaimBack.in", "statement scan, draft email"), yes, no, { text: "draft only", options: { fontSize: 10, color: INK2, align: "center" } }, no, no],
    [name("Bank apps / CRED", "spend insights, hidden card charges"), { text: "partly", options: { fontSize: 10, color: INK2, align: "center" } }, no, no, no, no],
    [{ text: "Vasool Raja\nstatement → rule → amount → evidence → priority → complaint → tracking", options: { bold: true, fontSize: 11, color: GREEN, fill: { color: GREEN_SOFT }, valign: "middle" } }, { ...yes, options: { ...yes.options, fill: { color: GREEN_SOFT } } }, { ...yes, options: { ...yes.options, fill: { color: GREEN_SOFT } } }, { ...yes, options: { ...yes.options, fill: { color: GREEN_SOFT } } }, { ...yes, options: { ...yes.options, fill: { color: GREEN_SOFT } } }, { ...yes, options: { ...yes.options, fill: { color: GREEN_SOFT } } }],
  ];
  s.addTable(rows, { x: M, y: 1.75, w: W - 2 * M, colW: [2.6, 1.9, 1.95, 1.95, 1.95, 1.78], fontFace: BODY, fontSize: 12, valign: "middle", border: { type: "solid", color: LINE, pt: 0.5 }, rowH: [0.66, 0.6, 0.6, 0.6, 0.6, 0.66], margin: 0.08 });
  s.addText([
    { text: "Existing solutions address individual steps. Vasool Raja connects the complete regulatory-checking chain. ", options: { bold: true, fontFace: HEAD, fontSize: 13.5, color: GREEN } },
    { text: "END-TO-END REGULATORY CHECKING ENGINE — not AI for the sake of AI. The innovation is the system design: financial state + time-aware regulation + deterministic rules + evidence + action.", options: { fontSize: 10.5, color: INK2 } },
  ], { x: M, y: 5.82, w: W - 2 * M, h: 0.5, fontFace: BODY, margin: 0, isTextBox: true, valign: "top" });
  const chain = ["STATEMENT", "RULE", "AMOUNT", "EVIDENCE", "PRIORITY", "COMPLAINT", "TRACKING"];
  const chw = (W - 2 * M - 6 * 0.3) / 7;
  chain.forEach((c, i) => {
    const x = M + i * (chw + 0.3);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 6.35, w: chw, h: 0.4, fill: { color: GREEN_SOFT }, line: { color: GREEN, width: 0.75 } });
    s.addText(c, { x, y: 6.35, w: chw, h: 0.4, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1, color: GREEN, align: "center", valign: "middle", margin: 0, isTextBox: true });
    if (i < 6) s.addText("→", { x: x + chw, y: 6.35, w: 0.3, h: 0.4, fontFace: HEAD, fontSize: 13, color: INK2, align: "center", valign: "middle", margin: 0, isTextBox: true });
  });
  footer(s, 5);
  s.addNotes("Competitor review, Sept 2026: RBI CMS portal (files a complaint you already know you have), NPCI UPI Help (per-transaction status, reactive), ClaimBack.in (scans a statement PDF and drafts an email; no failed-transaction compensation, no deadline tracking, English only), bank apps and CRED (insights, no recovery). We claim only what we found; the gap is the combination.");
}

// ---------- Slide 6: The twin ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Technology · Digital Twin");
  s.addText([
    { text: "DIGITAL TWIN  =  ACTUAL FINANCIAL STATE  ↔  EXPECTED REGULATORY STATE", options: { bold: true, fontFace: HEAD, fontSize: 23, color: INK, breakLine: true } },
    { text: "The account is reconstructed over time and compared with the RBI rule in force on each date. Expected − actual = regulatory delta = potential claim.", options: { fontFace: BODY, fontSize: 12, color: INK2 } },
  ], { x: M, y: 0.65, w: W - 2 * M, h: 1.0, margin: 0, isTextBox: true, valign: "top" });
  const by = 1.7, bh = 2.25, bw = 3.75;
  // ACTUAL
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: by, w: bw, h: bh, fill: { color: PAPER }, line: { color: LINE, width: 0.75 } });
  s.addText("ACTUAL FINANCIAL STATE  ·  from the statement", { x: M + 0.2, y: by + 0.1, w: bw - 0.4, h: 0.28, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.5, color: INK2, margin: 0, isTextBox: true });
  s.addText([
    { text: "Transaction  failed ATM withdrawal", options: { bullet: true, breakLine: true } },
    { text: "Debit  ₹1,200 · 3 Aug", options: { bullet: true, breakLine: true } },
    { text: "Reversal  credited 20 Aug", options: { bullet: true, breakLine: true } },
    { text: "Compensation actually credited  ₹0", options: { bullet: true, bold: true, breakLine: true } },
    { text: "Evidence  2 statement lines · ref NFS803110", options: { bullet: true } },
  ], { x: M + 0.2, y: by + 0.42, w: bw - 0.4, h: 1.8, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, isTextBox: true, paraSpaceAfter: 4, valign: "top" });
  s.addText("vs", { x: M + bw + 0.02, y: by + 0.85, w: 0.46, h: 0.5, fontFace: HEAD, fontSize: 18, bold: true, color: INK2, align: "center", margin: 0, isTextBox: true });
  // EXPECTED
  const ex = M + bw + 0.5;
  s.addShape(pres.shapes.RECTANGLE, { x: ex, y: by, w: bw, h: bh, fill: { color: PAPER }, line: { color: LINE, width: 0.75 } });
  s.addText("EXPECTED REGULATORY STATE  ·  rule in force that day", { x: ex + 0.2, y: by + 0.1, w: bw - 0.4, h: 0.28, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.5, color: INK2, margin: 0, isTextBox: true });
  s.addText([
    { text: "Rule  RBI/2019-20/67", options: { bullet: true, breakLine: true } },
    { text: "Effective date  15 Oct 2019", options: { bullet: true, breakLine: true } },
    { text: "Deadline  T+5 → reversal by 8 Aug", options: { bullet: true, breakLine: true } },
    { text: "Expected compensation  ₹100 × 12 days late = ₹1,200", options: { bullet: true, bold: true, breakLine: true } },
    { text: "Credited automatically, no complaint needed", options: { bullet: true } },
  ], { x: ex + 0.2, y: by + 0.42, w: bw - 0.4, h: 1.8, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, isTextBox: true, paraSpaceAfter: 4, valign: "top" });
  // MATH column
  const dx = ex + bw + 0.3, dw = W - M - dx;
  const rows = [["EXPECTED under the rule", "₹1,200", PAPER, LINE, INK], ["MINUS  ACTUAL credited", "₹0", PAPER, LINE, INK], ["=  REGULATORY DELTA", "₹1,200", GREEN_SOFT, GREEN, GREEN], ["POTENTIAL CLAIM", "₹1,200", GREEN_DK, GREEN_DK, GOLD]];
  rows.forEach((r, i) => {
    const y = by + i * 0.57;
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y, w: dw, h: 0.5, fill: { color: r[2] }, line: { color: r[3], width: 0.75 } });
    s.addText(r[0], { x: dx + 0.12, y, w: dw - 1.3, h: 0.5, fontFace: BODY, fontSize: 8.5, bold: true, charSpacing: 1, color: i === 3 ? GOLD : r[4], margin: 0, isTextBox: true, valign: "middle" });
    s.addText(r[1], { x: dx + dw - 1.25, y, w: 1.13, h: 0.5, fontFace: HEAD, fontSize: 16, bold: true, color: i === 3 ? WHITE : r[4], align: "right", margin: 0, isTextBox: true, valign: "middle" });
  });
  s.addText("Evidence attached · Confidence: confirmed · Complaint prepared · human confirms", { x: dx, y: by + 2.25, w: dw, h: 0.2, fontFace: BODY, fontSize: 7.5, color: INK2, margin: 0, isTextBox: true });
  // pipeline
  s.addText("SYSTEM ARCHITECTURE AS BUILT   ·   green = deterministic decision path   ·   gold = LLM / OCR explanation path (never decides)", { x: M, y: 4.12, w: W - 2 * M, h: 0.25, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1.5, color: INK2, margin: 0, isTextBox: true });
  const pipe = [["Statement / passbook", "CSV · PDF · photo", "det"], ["Parser / OCR", "lines → transactions", "ai"], ["Classification", "channel · kind · own-bank ATM", "det"], ["Debit ↔ reversal pairing", "ref · amount · partial sums", "det"], ["Account state", "balance path · monthly counts", "det"], ["Regulatory twin", "rule in force per date", "det"], ["Versioned rules", "22 · effective windows", "det"], ["Expected vs actual", "per transaction", "det"], ["Delta", "₹ calculation", "det"], ["Evidence + confidence", "lines · label", "det"], ["Complaint + clock", "human confirms · 30 days", "det"], ["LLM explanation", "Tamil · voice · guardian", "ai"]];
  const pw = (W - 2 * M - 11 * 0.08) / 12, py = 4.4;
  pipe.forEach((p, i) => {
    const x = M + i * (pw + 0.08), ai = p[2] === "ai";
    s.addShape(pres.shapes.RECTANGLE, { x, y: py, w: pw, h: 1.05, fill: { color: ai ? GOLD_SOFT : GREEN_SOFT }, line: { color: ai ? GOLD : GREEN, width: 0.75 } });
    s.addText(p[0], { x: x + 0.05, y: py + 0.06, w: pw - 0.1, h: 0.5, fontFace: HEAD, fontSize: 8.5, bold: true, color: ai ? "7A5A0E" : GREEN, margin: 0, isTextBox: true, valign: "top" });
    s.addText(p[1], { x: x + 0.05, y: py + 0.58, w: pw - 0.1, h: 0.45, fontFace: BODY, fontSize: 7, color: INK, margin: 0, isTextBox: true, valign: "top" });
  });
  s.addText("Every potential claim = TRANSACTION + ACCOUNT STATE + APPLICABLE RULE + EFFECTIVE DATE + CALCULATION + EVIDENCE. Without all six: no claim. Versioned deterministic RBI rules decide; the LLM only extracts, explains and communicates.", { x: M, y: 5.6, w: W - 2 * M, h: 0.5, fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, isTextBox: true });
  s.addText("Stateful: adding an earlier statement changes the reconstructed account state, and can change a verdict (slide 8). GUARDIAN (காப்பாளர்) — accessibility, not the engine: holder called first in Tamil; one trusted person, one button; no complaint is filed without human confirmation.", { x: M, y: 6.12, w: W - 2 * M, h: 0.55, fontFace: BODY, fontSize: 9.5, color: INK2, margin: 0, isTextBox: true });
  footer(s, 6);
  s.addNotes("The twin is a continuously updated model of the customer's financial-rule state: transactions, balance path, account type, the RBI rules in force on each date, deadlines, claims and outcomes. Actual state (what the statement shows) is compared with expected state (what the rule required by when); the delta, with its evidence lines and confidence label, is the potential claim. ₹0 = compensation actually credited; ₹1,200 = compensation expected under RBI/2019-20/67 for 12 days of delay. The LLM never decides whether the bank owes money; it reads photos (OCR) and explains findings. Guardian: nominee-for-grievances; RBI Ombudsman Scheme permits authorised representatives.");
}

// ---------- Slide 7: Doubts ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Feasibility · AI safety");
  s.addText([
    { text: "LLM ≠ DECISION MAKER", options: { bold: true, fontFace: HEAD, fontSize: 34, color: RED, breakLine: true } },
    { text: "DETERMINISTIC RULE ENGINE = DECISION MAKER", options: { bold: true, fontFace: HEAD, fontSize: 24, color: GREEN } },
  ], { x: M, y: 0.62, w: W - 2 * M, h: 1.15, margin: 0, isTextBox: true, valign: "top" });
  s.addText("The LLM extracts, explains and communicates. It cannot create a claim.", { x: M, y: 1.78, w: 8.5, h: 0.35, fontFace: BODY, fontSize: 13, bold: true, color: INK, margin: 0, isTextBox: true });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.55, y: 1.72, w: W - M - 9.55, h: 0.45, fill: { color: GREEN_DK }, line: { color: GREEN_DK } });
  s.addText("NO EVIDENCE  →  NO CLAIM", { x: 9.55, y: 1.72, w: W - M - 9.55, h: 0.45, fontFace: HEAD, fontSize: 14, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0, isTextBox: true });
  const flowRow = (y, items, ok) => {
    const fw = (W - 2 * M - 0.95 - (items.length - 1) * 0.25) / items.length;
    s.addText(ok ? "HOW IT WORKS" : "NOT THIS", { x: M, y: y + 0.1, w: 0.95, h: 0.3, fontFace: BODY, fontSize: 8, bold: true, charSpacing: 1.5, color: ok ? GREEN : RED, margin: 0, isTextBox: true });
    items.forEach((t, i) => {
      const x = M + 0.95 + i * (fw + 0.25), ai = t.startsWith("LLM");
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: fw, h: 0.5, fill: { color: ok ? (ai ? GOLD_SOFT : GREEN_SOFT) : RED_SOFT }, line: { color: ok ? (ai ? GOLD : GREEN) : RED, width: 0.75 } });
      s.addText(t, { x, y, w: fw, h: 0.5, fontFace: BODY, fontSize: 10, bold: true, color: ok ? INK : RED, align: "center", valign: "middle", margin: 0.05, isTextBox: true });
      if (i < items.length - 1) s.addText("→", { x: x + fw, y, w: 0.25, h: 0.5, fontFace: HEAD, fontSize: 13, color: INK2, align: "center", valign: "middle", margin: 0, isTextBox: true });
    });
  };
  flowRow(2.3, ["BANK DATA", "PARSER / OCR", "DETERMINISTIC RULE ENGINE", "VERDICT + EVIDENCE", "LLM EXPLANATION"], true);
  flowRow(2.95, ["BANK DATA", "LLM", "MONEY CLAIM"], false);
  const qa = [
    ["“Isn’t this just ChatGPT?”", "An LLM has no authoritative account state, no rule execution, no effective-date logic and no deterministic claim calculation. Vasool Raja supplies all four."],
    ["“What if the LLM hallucinates?”", "It does not determine the claim; the deterministic rule engine does. Every finding requires transaction data + account state + effective-date rule + calculation + evidence."],
    ["“What if a rule changes?”", "Rules are versioned by effective date. The engine applies the rule that was in force when the transaction occurred (e.g. ATM cap ₹21 before 1 May 2025, ₹23 after)."],
    ["“What if evidence is incomplete?”", "Do not claim. The finding is labelled “unclear” and the system asks for the missing information — it never presents an unclear finding as a claim."],
  ];
  let y = 3.7;
  qa.forEach(([q, a], i) => {
    s.addShape(pres.shapes.OVAL, { x: M, y: y + 0.05, w: 0.38, h: 0.38, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(String(i + 1), { x: M, y: y + 0.05, w: 0.38, h: 0.38, fontFace: HEAD, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(q, { x: M + 0.58, y, w: 3.8, h: 0.65, fontFace: HEAD, fontSize: 13.5, bold: true, color: INK, margin: 0, isTextBox: true, valign: "top" });
    s.addText(a, { x: 5.1, y, w: W - M - 5.1, h: 0.65, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, isTextBox: true, valign: "top" });
    y += 0.72;
  });
  footer(s, 7);
  s.addNotes("Hallucination control by architecture: the LLM sits after the verdict, never before it. In reserve: 'Who cares about ₹20?' (lead with the ₹1,000s, combine small ones, never ask the user to act on one); 'Does the money actually come back?' (not always — labels recoverable / avoidable / unclear; recovery in the prototype is simulated); 'How does an illiterate person use an app?' (called in Tamil; guardian gets one message and one button — accessibility layer, same engine); false alarm on a big legitimate payment (no anomaly detection; a ₹50,000 fee matches no rule — automated test).");
}

// ---------- Slide 8: Proof ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Team · What exists today");
  title(s, "NOT A PLAN. A WORKING ENGINE.", { size: 30 });
  s.addText("Mad Angles · Coimbatore Institute of Technology. Everything below is running code; screenshots from the prototype, 17 Sep 2026. Demo data is synthetic.", { x: M, y: 1.5, w: 12.1, h: 0.35, fontFace: BODY, fontSize: 11.5, color: INK2, margin: 0, isTextBox: true });
  // left: found screen + stateful strip
  const lw = 5.5;
  s.addImage({ path: "/home/claude/deck/shot-found.png", x: M, y: 1.9, w: lw, h: lw / 1.829 });
  const ly = 1.9 + lw / 1.829 + 0.08;
  s.addText([{ text: "₹5,402 potential claim value identified ", options: { bold: true, color: GREEN } }, { text: "(sum of RECOVERABLE findings; synthetic demo data) · 2 Canara statements merged, Mar–Aug · 5 findings, each with rule id and confidence.", options: { color: INK } }], { x: M, y: ly, w: lw, h: 0.45, fontFace: BODY, fontSize: 9.5, margin: 0, isTextBox: true, valign: "top" });
  const st = [["ADD LAST QUARTER", "2nd statement merged"], ["ACCOUNT STATE CHANGES", "more history available"], ["MAY BALANCES VISIBLE", "never below ₹500"], ["JUNE VERDICT CHANGES", "min-balance penalty"], ["“NEEDS ONE ANSWER” → “CONFIRMED”", "recoverable"]];
  const stw = (lw - 4 * 0.1) / 5, sty = ly + 0.5;
  s.addText("STATEFUL REGULATORY TWIN — not a one-shot LLM response", { x: M, y: sty - 0.02, w: lw, h: 0.2, fontFace: BODY, fontSize: 7.5, bold: true, charSpacing: 1.5, color: GREEN, margin: 0, isTextBox: true });
  st.forEach(([k, v], i) => {
    const x = M + i * (stw + 0.1), hot = i === 4;
    s.addShape(pres.shapes.RECTANGLE, { x, y: sty + 0.2, w: stw, h: 0.62, fill: { color: hot ? GREEN_DK : GREEN_SOFT }, line: { color: hot ? GREEN_DK : GREEN, width: 0.75 } });
    s.addText(k, { x: x + 0.04, y: sty + 0.24, w: stw - 0.08, h: 0.34, fontFace: BODY, fontSize: 6.3, bold: true, color: hot ? GOLD : GREEN, margin: 0, isTextBox: true, valign: "top" });
    s.addText(v, { x: x + 0.04, y: sty + 0.57, w: stw - 0.08, h: 0.22, fontFace: BODY, fontSize: 6.8, color: hot ? WHITE : INK, margin: 0, isTextBox: true, valign: "top" });
    if (i < 4) s.addText("→", { x: x + stw - 0.05, y: sty + 0.35, w: 0.2, h: 0.3, fontFace: HEAD, fontSize: 9, color: INK2, align: "center", margin: 0, isTextBox: true });
  });
  // right column
  const rx = M + lw + 0.3, rw = W - M - rx;
  const tiw = 3.05;
  s.addImage({ path: "/home/claude/deck/shot-tests.png", x: rx, y: 1.9, w: tiw, h: tiw / 2.44 });
  s.addText("76 automated tests, all passing (pytest)", { x: rx, y: 1.9 + tiw / 2.44 + 0.04, w: tiw, h: 0.25, fontFace: BODY, fontSize: 9, bold: true, color: GREEN, margin: 0, isTextBox: true });
  const tx = rx + tiw + 0.2, tw = W - M - tx;
  s.addText("REPRESENTATIVE AUTOMATED TESTS  ·  3 of 76", { x: tx, y: 1.9, w: tw, h: 0.24, fontFace: BODY, fontSize: 8, bold: true, charSpacing: 1.5, color: INK2, margin: 0, isTextBox: true });
  const hdr = (t) => ({ text: t, options: { bold: true, color: INK2, fontSize: 8.5, fill: { color: PAPER } } });
  const ok = { text: "PASS", options: { bold: true, color: GREEN, fontSize: 9, align: "center" } };
  s.addTable([
    [hdr("Case"), hdr("Expected"), { ...hdr("Result"), options: { ...hdr("Result").options, align: "center" } }],
    ["Late ATM reversal — 12 days", "Claim: 12 × ₹100", ok],
    ["Partial reversal within T+5", "No claim", ok],
    ["₹50,000 college fee", "Never flagged", ok],
  ], { x: tx, y: 2.16, w: tw, colW: [tw * 0.47, tw * 0.33, tw * 0.2], fontFace: BODY, fontSize: 9, color: INK, border: { type: "solid", color: LINE, pt: 0.5 }, rowH: 0.27, margin: 0.04, valign: "middle" });
  // print + phone
  const py2 = 3.5, ph = 1.35;
  s.addImage({ path: "/home/claude/deck/shot-print.png", x: rx, y: py2, w: ph * 1.333, h: ph });
  s.addImage({ path: "/home/claude/deck/shot-phone.png", x: rx + ph * 1.333 + 0.12, y: py2, w: ph * 0.513, h: ph });
  const tx2 = rx + ph * 1.333 + 0.12 + ph * 0.513 + 0.18;
  s.addText([
    { text: "Complaint generated, print-ready A4", options: { bold: true, fontFace: HEAD, fontSize: 10.5, color: GREEN, breakLine: true } },
    { text: "letter, RBI references, Annexure A with the evidence lines", options: { fontSize: 9, color: INK, breakLine: true } },
    { text: " ", options: { fontSize: 4, breakLine: true } },
    { text: "Guardian message — real email, one button", options: { bold: true, fontFace: HEAD, fontSize: 10.5, color: GREEN, breakLine: true } },
    { text: "the laptop screen moves to “Sent” when the phone taps; no complaint without human confirmation", options: { fontSize: 9, color: INK, breakLine: true } },
    { text: " ", options: { fontSize: 4, breakLine: true } },
    { text: "Open 22-rule JSON rulebook", options: { bold: true, fontFace: HEAD, fontSize: 10.5, color: GREEN, breakLine: true } },
    { text: "circular · effective window · formula · evidence · tests. Code on the demo laptop, available to the panel.", options: { fontSize: 9, color: INK } },
  ], { x: tx2, y: py2 - 0.02, w: W - M - tx2, h: 2.0, fontFace: BODY, margin: 0, isTextBox: true, valign: "top" });
  // limitation
  s.addShape(pres.shapes.RECTANGLE, { x: rx, y: 5.55, w: rw, h: 1.05, fill: { color: RED_SOFT }, line: { color: RED, width: 0.75 } });
  s.addText([
    { text: "HONEST LIMITATION", options: { bold: true, fontSize: 10, color: RED, charSpacing: 1.5, breakLine: true } },
    { text: "Recovery is currently simulated. The prototype identifies potential claims and prepares the recovery workflow. It does not email a bank. No actual bank recovery has been demonstrated.", options: { fontSize: 9.5, color: INK } },
  ], { x: rx + 0.15, y: 5.58, w: rw - 0.3, h: 1.0, fontFace: BODY, margin: 0, isTextBox: true, valign: "middle" });
  footer(s, 8);
  s.addNotes("Proof slide, no placeholders. Screenshots from the running app (v0.4.1). Left: Found screen after merging two synthetic Canara statements — ₹5,402.38 is the sum of RECOVERABLE findings on that data. Stateful strip: with only Jun–Aug the June min-balance penalty is UNCLEAR (needs the notice question); merging Mar–May makes May's balances visible (never below ₹500) and the verdict becomes CONFIRMED recoverable — an automated test (test_second_statement_changes_the_verdict). Right: real pytest output (76 passed); three representative tests named as they exist in tests/test_engine.py. If asked for the repo: on the laptop; GitHub link the moment it is public. If asked about a real filed claim: none yet — we say so.");
}

// ---------- Slide 9: Demo + business model ----------
{
  const s = pres.addSlide();
  s.background = { color: GREEN_DK };
  label(s, "Demo · 25 September · business model", true);
  title(s, "On 25 September you will see this journey live.", { color: WHITE, size: 30 });
  s.addText("A · LIVE DEMO  —  every demonstrated step already works", { x: M, y: 1.42, w: 8, h: 0.28, fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 2, color: GOLD, margin: 0, isTextBox: true });
  const journey = ["Upload real statement (CSV · PDF · passbook photo)", "Extract transactions", "Detect potential issue", "Identify applicable RBI rule", "Show actual vs expected", "Calculate ₹ amount", "Show evidence lines", "Show confidence label", "Generate complaint (A4)", "Explain in Tamil · guardian tap", "Add historical statement", "Verdict / state changes"];
  const jw = (W - 2 * M - 5 * 0.18) / 6;
  journey.forEach((t, i) => {
    const col = i % 6, row = Math.floor(i / 6), x = M + col * (jw + 0.18), y = 1.75 + row * 0.98;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: jw, h: 0.84, fill: { color: i === 11 ? GOLD : "0E3A25" }, line: { color: i === 11 ? GOLD : "2A5C42", width: 0.75 } });
    s.addText(String(i + 1), { x: x + 0.1, y: y + 0.06, w: 0.4, h: 0.3, fontFace: HEAD, fontSize: 13, bold: true, color: i === 11 ? GREEN_DK : GOLD, margin: 0, isTextBox: true });
    s.addText(t, { x: x + 0.1, y: y + 0.34, w: jw - 0.2, h: 0.5, fontFace: BODY, fontSize: 9.5, color: i === 11 ? GREEN_DK : WHITE, margin: 0, isTextBox: true, valign: "top" });
    if (col < 5) s.addText("→", { x: x + jw - 0.06, y: y + 0.28, w: 0.3, h: 0.3, fontFace: HEAD, fontSize: 12, color: "9DB8A8", align: "center", margin: 0, isTextBox: true });
  });
  s.addText("Recovery is simulated. Nothing is emailed to a bank. No complaint without human confirmation. We say this before anyone asks.", { x: M, y: 3.72, w: W - 2 * M, h: 0.3, fontFace: BODY, fontSize: 10, italic: true, color: "9DB8A8", margin: 0, isTextBox: true });
  // business model
  s.addText("B · BUSINESS MODEL  —  ONE ENGINE. TWO SIDES.", { x: M, y: 4.18, w: 8, h: 0.28, fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 2, color: GOLD, margin: 0, isTextBox: true });
  const side = (x, w, head, sub, steps, hot) => {
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.5, w, h: 1.55, fill: { color: "0E3A25" }, line: { color: "2A5C42", width: 0.75 } });
    s.addText([{ text: head, options: { bold: true, fontFace: HEAD, fontSize: 13, color: WHITE, breakLine: true } }, { text: sub, options: { fontSize: 9.5, color: "9DB8A8" } }], { x: x + 0.2, y: 4.56, w: w - 0.4, h: 0.6, fontFace: BODY, margin: 0, isTextBox: true, valign: "top" });
    const sw = (w - 0.4 - 2 * 0.15) / 3;
    steps.forEach((t, i) => {
      const sx = x + 0.2 + i * (sw + 0.15);
      s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 5.23, w: sw, h: 0.68, fill: { color: hot ? GOLD_SOFT : GREEN_SOFT }, line: { color: hot ? GOLD : GREEN, width: 0.5 } });
      s.addText(t, { x: sx, y: 5.23, w: sw, h: 0.68, fontFace: BODY, fontSize: 9, bold: true, color: GREEN_DK, align: "center", valign: "middle", margin: 0.04, isTextBox: true });
      if (i < 2) s.addText("→", { x: sx + sw - 0.02, y: 5.23, w: 0.19, h: 0.68, fontFace: HEAD, fontSize: 11, color: "9DB8A8", align: "center", valign: "middle", margin: 0, isTextBox: true });
    });
  };
  const half = (W - 2 * M - 0.3) / 2;
  side(M, half, "CONSUMER — FREE", "the account holder and family", ["Identify potential claims", "Understand rule + evidence", "Prepare recovery workflow"], false);
  side(M + half + 0.3, half, "BANK — LICENSED PRODUCT", "not a tool to reject claims — a tool to find exceptions first", ["Detect regulatory exceptions", "Resolve before escalation", "Reduce avoidable complaints"], true);
  s.addText("Why a bank could have an incentive: earlier detection → earlier resolution → fewer escalations, under RBI’s Internal Ombudsman Directions (14 Jan 2026, auto-escalation of unresolved complaints). No bank is a customer today.", { x: M, y: 6.15, w: 8.8, h: 0.55, fontFace: BODY, fontSize: 9, color: "9DB8A8", margin: 0, isTextBox: true });
  s.addText("Bank rule theriyadhaa?  Vasool Raja paathukkum.", { x: 9.3, y: 6.25, w: 3.45, h: 0.45, fontFace: HEAD, fontSize: 14, italic: true, color: GOLD, align: "right", margin: 0, isTextBox: true });
  footer(s, 9, true);
  s.addNotes("Closing: the demo as a 12-step journey, every step implemented (v0.4.1). Say 'simulated' about recovery before anyone asks. Business model: consumer side free; bank side is the same engine used to find regulatory exceptions before they become complaints — explicitly not a claim-rejection tool. RBI Internal Ombudsman Directions 14 Jan 2026 (source slide 10) create the incentive. No bank customers today; no revenue; no partnerships claimed.");
}

// ---------- Slide 10: Sources ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  label(s, "Sources");
  title(s, "Every number, a link. Every rule, a circular.", { size: 28 });
  const primary = [
    ["RBI/2019-20/67 — TAT and compensation for failed transactions (₹100/day)", "rbi.org.in/commonman/English/scripts/Notification.aspx?Id=3074"],
    ["RBI, 20 Nov 2014 — penal charges for non-maintenance of minimum balance", "rbi.org.in/commonman/English/Scripts/Notification.aspx?Id=1500"],
    ["RBI, 28 Mar 2025 — ATM free transactions and ₹23 cap (eff. 1 May 2025)", "rbi.org.in/scripts/NotificationUser.aspx?Id=12111"],
    ["RBI Master Circular on Customer Service in Banks, 2015 — disclosure, one month’s notice", "rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=9862"],
    ["RBI Credit Card and Debit Card Directions, 2022 — closure within 7 working days, ₹500/day", "rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12300"],
    ["RBI, 6 Jul 2017 — limiting customer liability in unauthorised electronic transactions", "rbi.org.in/Scripts/NotificationUser.aspx?Id=11040"],
    ["RBI Integrated Ombudsman Scheme 2026 (eff. 1 Jul 2026) — FAQs", "rbi.org.in/commonman/Upload/English/FAQs/PDFs/RBIOS01072026.pdf"],
    ["RBI Internal Ombudsman Directions, 14 Jan 2026 — auto-escalation, 30-day reply", "reported by business-standard.com (RBI mandates auto-escalation of unresolved complaints)"],
    ["RBI Ombudsman Scheme annual report 2024–25 — 13.34 lakh complaints", "rbi.org.in — Annual Report of Ombudsman Scheme 2024-25"],
  ];
  const supporting = [
    ["NPCI UPI product statistics — 24.51 bn transactions, Aug 2026", "npci.org.in/product/upi/product-statistics"],
    ["₹7,086 crore minimum-balance penalties FY26 — Rajya Sabha reply, 28 Jul 2026", "business-standard.com/finance/news/banks-collected-7-086-crore-as-minimum-balance-penalties-in-fy26"],
    ["₹35,587 crore charges FY18–FY23 — Rajya Sabha reply, 8 Aug 2023", "businesstoday.in (banks levied Rs 35,587 crore as service charge penalty since 2018)"],
    ["Punjab & Sind Bank ordered to pay ₹59,600 on a failed ATM transaction — ANI, 10 Sep 2026", "aninews.in (consumer commission orders Punjab & Sind Bank to pay Rs 59,600)"],
    ["Kasaragod consumer court — ₹2 SMS fee, ₹295 penalty, bank fined — Onmanorama, 23 Jul 2026", "onmanorama.com/news/kerala/2026/07/23/bank-deducts-sms-fee"],
  ];
  const lw = 7.6, rx = M + lw + 0.35, rw = W - M - rx;
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 1.6, w: lw, h: 0.34, fill: { color: GREEN_DK }, line: { color: GREEN_DK } });
  s.addText("PRIMARY REGULATORY SOURCES  ·  RBI circulars · directions · Ombudsman / CMS", { x: M + 0.15, y: 1.6, w: lw - 0.3, h: 0.34, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1, color: GOLD, margin: 0, isTextBox: true, valign: "middle" });
  let y = 2.05;
  primary.forEach(([t, u]) => {
    s.addText([{ text: t, options: { bold: true, color: INK, fontSize: 10, breakLine: true } }, { text: u, options: { color: INK2, fontSize: 8 } }], { x: M, y, w: lw, h: 0.46, fontFace: BODY, margin: 0, isTextBox: true, valign: "top" });
    y += 0.5;
  });
  s.addShape(pres.shapes.RECTANGLE, { x: rx, y: 1.6, w: rw, h: 0.34, fill: { color: PAPER }, line: { color: LINE, width: 0.75 } });
  s.addText("SUPPORTING SOURCES  ·  NPCI · Rajya Sabha data · press / media", { x: rx + 0.15, y: 1.6, w: rw - 0.3, h: 0.34, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1, color: INK2, margin: 0, isTextBox: true, valign: "middle" });
  y = 2.05;
  supporting.forEach(([t, u]) => {
    s.addText([{ text: t, options: { bold: true, color: INK, fontSize: 9, breakLine: true } }, { text: u, options: { color: INK2, fontSize: 7.5 } }], { x: rx, y, w: rw, h: 0.62, fontFace: BODY, margin: 0, isTextBox: true, valign: "top" });
    y += 0.66;
  });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.55, w: W - 2 * M, h: 0.38, fill: { color: GREEN_SOFT }, line: { color: GREEN_SOFT } });
  s.addText("Every implemented rule in the rulebook links to a primary regulatory source and its effective window.", { x: M + 0.15, y: 6.55, w: W - 2 * M - 0.3, h: 0.38, fontFace: BODY, fontSize: 10.5, bold: true, color: GREEN, margin: 0, isTextBox: true, valign: "middle" });
  footer(s, 10);
  s.addNotes("Every figure on slides 1–5 and every implemented rule traces to one of these. Before submission each URL is opened and the figure re-checked. Not used as a headline: '0.44% of complaints compensated' (Moneylife, FY24) — different denominator from the 13.34 lakh FY25 total; must not appear beside it without its own source line.");
}

pres.writeFile({ fileName: "/home/claude/deck/VasoolRaja_DigitalTwin_FinTech_MadAngles.pptx" }).then((f) => console.log("wrote", f));
