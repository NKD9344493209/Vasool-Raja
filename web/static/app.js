/* Vasool Raja — web app (no build step). Talks to /api. */
(() => {
  "use strict";

  // ------------------------------------------------------------------ i18n
  const T = {
    en: {
      tagline: "We watch. You don't have to.",
      "nav.scan": "Scan", "nav.findings": "Found", "nav.cases": "Cases", "nav.history": "History", "nav.ask": "Ask", "nav.rules": "Rulebook", "nav.settings": "Settings",
      "foot.rule": "The rule engine decides. The assistant only explains.",
      "home.multi": "You can select several files at once — different months or quarters of the same account.",
      "home.current": "Open account: {a}", "home.addto": "Add a statement to it", "home.new": "This form starts a new account.",
      "st.h": "Statements", "st.lede": "Every statement of this account we have seen. Rules run on the whole history — a June penalty is judged on May's balances.",
      "st.add": "Add another statement", "st.added": "+{n} new lines · {d} duplicates skipped", "st.lines": "{n} lines", "st.new": "{n} new", "st.dup": "{n} duplicate", "st.remove": "Remove", "st.covers": "Covered: {a} → {b}", "st.gap": "Gap: {a} → {b} — upload that statement too",
      "hist.h": "History", "hist.lede": "Every account scanned on this device, with what was found and what came back. Open one to continue where you left off.", "hist.none": "Nothing scanned yet.",
      "hist.open": "Open", "hist.current": "Open now", "hist.found": "found", "hist.recovered": "recovered", "hist.stmts": "{n} statement(s)", "hist.cases": "{n} case(s)", "hist.opencases": "{n} open",
      "case.print": "Print complaint", "case.printomb": "Print Ombudsman draft", "case.printhint": "A4 letter with Annexure A — take 2 copies to the branch, get one stamped.",
      "mail.sent": "Email delivered to {to}", "mail.sim": "Email simulated ({r})", "mail.also": "Also emailed to {to}",
      "g.email": "Email (the real one-button message goes here)", "n.h": "Real delivery", "n.on": "Email is ON — messages go out for real (from {f})", "n.off": "Email is OFF — the guardian message and complaint are simulated on screen.",
      "n.demo": "Safety: every mail is redirected to {to}", "n.how": "To turn it on, create a .env file next to run.bat with VASOOL_SMTP_USER, VASOOL_SMTP_PASS (Gmail app password) and VASOOL_DEMO_TO. Nothing is ever sent to a bank.", "n.test": "Send test mail", "n.bank": "The bank itself is never emailed by this demo.",
      "ap.h": "Vasool Raja asks for your OK", "ap.for": "For {h}'s account at {b}", "ap.yes": "✓ Yes, send the complaint", "ap.no": "Not now", "ap.done": "Sent to the bank. Thank you — we're watching the 30-day clock.", "ap.used": "This request was already answered.", "ap.note": "No balance or spending details are shown. Only the complaint goes to the bank.",
      "foot.privacy": "We check transactions. We don't sell them. No passwords, ever.",
      "home.h1": "What if your bank owed you money right now?",
      "home.lede": "Give us one statement or a passbook photo. We run the RBI rulebook on it and tell you what your bank may owe you — with the rule beside every rupee. Nothing is sent to anyone unless you say so.",
      "home.drop": "Drop a statement here — PDF, CSV or a passbook photo", "home.or": "or try a sample",
      "home.bank": "Bank", "home.type": "Account type", "home.city": "City", "home.minbal": "Minimum balance your bank requires (₹)", "home.name": "Your name", "home.scan": "Check my account",
      "home.privacy": "Processed on this server, stored only as normalised transactions, deletable any time. We never ask for net-banking passwords or PINs.",
      "found.h": "found", "found.sub": "{n} items your bank may owe you", "found.unclear": "{n} need one answer from you", "found.avoid": "{n} you can stop next time",
      "found.charges": "Bank charges in this period: {a}", "found.none": "Everything looks okay. Nothing needs your attention.", "found.watch": "We'll keep watching.",
      "found.getback": "Get it back", "found.effort": "Your effort: about 2 minutes",
      "sec.now": "Worth acting on now", "sec.ask": "One answer from you settles these", "sec.combine": "Small — we'll bundle them", "sec.skip": "Too small to bother you — we keep watching", "sec.prevent": "Allowed — but you can stop the next one",
      "why": "Why we think so", "hide": "Hide", "expected": "Should have happened", "actual": "What happened", "calc": "Calculation", "rule": "Your right", "source": "RBI source", "confidence": "Confidence", "evidence": "Statement lines",
      "prevent": "How to stop the next one", "answer": "Answer:", "yes": "Yes", "no": "No", "not_sure": "Not sure",
      "case.h": "Your case", "case.prepared": "Complaint prepared. Nothing has been sent.", "case.guardian": "Ask my guardian", "case.send": "Send it myself", "case.preview": "Read the complaint",
      "case.callh": "Amma's phone rings", "case.play": "Play the call", "case.stop": "Stop", "case.press1": "Press 1 — call {g}", "case.press2": "Press 2 — not now",
      "case.wa": "WhatsApp to {g}", "case.approve": "Approve as {g}", "case.sent": "Sent to the bank. We're watching the 30-day clock.", "case.days": "{d} days left for the bank to reply",
      "case.bankreplied": "Bank replied", "case.recovered": "Money came back", "case.bankright": "Bank showed it was valid", "case.escalate": "Escalate to RBI Ombudsman", "case.check": "Check next statement for the refund",
      "case.download": "Complaint text", "case.omb": "Ombudsman draft", "case.timeline": "What happened so far",
      "cases.h": "Cases", "cases.none": "No cases yet. When something is found, 'Get it back' creates one.",
      "ask.h": "Ask Vasool Raja", "ask.ph": "Why did the bank charge me ₹295?", "ask.send": "Ask", "ask.hint": "Ask in Tamil or English. Try: what happened? · how much? · what should I do? · where is my KFS?",
      "rules.h": "The rulebook", "rules.lede": "Every rule Vasool Raja checks, with its RBI source and effective date. Open data — anyone can audit it.",
      "settings.h": "Settings", "g.h": "Guardian (காப்பாளர்)", "g.lede": "One person you trust. We call you first, then send them one message with one button. They never see your balance or spending.",
      "g.name": "Name", "g.rel": "Relation", "g.phone": "Phone", "g.consent": "Your consent, in your words (spoken or typed)", "g.save": "Save guardian",
      "s.delete": "Delete all my data", "s.deleted": "Deleted.", "s.basic": "Letter to convert to a zero-charge Basic account",
      "noacct": "Scan a statement first.", "err": "Something went wrong: ",
      "priority.RECOVER_NOW": "Recover now", "priority.COMBINE": "Combine", "priority.NOT_WORTH_IT": "We keep watching", "priority.PREVENT": "Prevent",
      "label.RECOVERABLE": "Rule broken · recoverable", "label.AVOIDABLE": "Allowed · avoidable", "label.UNCLEAR": "Needs one answer",
      "conf.CONFIRMED": "Confirmed", "conf.NEEDS_CHECKING": "Needs checking", "conf.INFO": "Information",
      "suspicious": "This looks like a payment that may have failed and been retried. Did it fail?",
      "state": { FOUND: "Found", PREPARED: "Prepared", AWAITING_APPROVAL: "Awaiting approval", SENT_TO_BANK: "Sent to bank", BANK_REPLIED: "Bank replied", DEADLINE_PASSED: "Deadline passed", ESCALATED_OMBUDSMAN: "Escalated", RECOVERED: "Recovered", CLOSED_BANK_RIGHT: "Bank was right", CLOSED_BY_USER: "Closed" },
    },
    ta: {
      tagline: "நாங்க பாத்துக்கறோம். நீங்க கவலைப்பட வேண்டாம்.",
      "nav.scan": "Scan", "nav.findings": "கண்டுபிடிச்சது", "nav.cases": "Cases", "nav.history": "History", "nav.ask": "கேளுங்க", "nav.rules": "Rulebook", "nav.settings": "Settings",
      "foot.rule": "Rule engine முடிவு பண்ணும். Assistant விளக்கம் மட்டும் சொல்லும்.",
      "home.multi": "ஒரே account-ஓட பல மாசம் / quarter statement-களை ஒரே நேரத்துல select பண்ணலாம்.",
      "home.current": "Open-ல இருக்கற account: {a}", "home.addto": "இதுக்கு இன்னொரு statement சேர்", "home.new": "இந்த form புது account-ஐ ஆரம்பிக்கும்.",
      "st.h": "Statements", "st.lede": "இந்த account-ஓட எல்லா statement-ம். Rules முழு history மேல ஓடும் — June penalty May balance வெச்சு பாக்கப்படும்.",
      "st.add": "இன்னொரு statement சேர்", "st.added": "+{n} புது lines · {d} duplicate தவிர்த்தாச்சு", "st.lines": "{n} lines", "st.new": "{n} புதுசு", "st.dup": "{n} duplicate", "st.remove": "நீக்கு", "st.covers": "இருக்கறது: {a} → {b}", "st.gap": "இடைவெளி: {a} → {b} — அந்த statement-ஐயும் upload பண்ணுங்க",
      "hist.h": "History", "hist.lede": "இந்த device-ல scan பண்ண எல்லா account-ம் — என்ன கிடைச்சது, என்ன திரும்ப வந்தது. விட்ட இடத்துல இருந்து தொடர ஒண்ணை open பண்ணுங்க.", "hist.none": "இன்னும் எதுவும் scan பண்ணல.",
      "hist.open": "Open", "hist.current": "இப்போ open", "hist.found": "கிடைச்சது", "hist.recovered": "திரும்ப வந்தது", "hist.stmts": "{n} statement", "hist.cases": "{n} case", "hist.opencases": "{n} open",
      "case.print": "Complaint print", "case.printomb": "Ombudsman draft print", "case.printhint": "A4 letter + Annexure A — 2 copy எடுத்து branch-க்கு போங்க, ஒண்ணுல seal வாங்குங்க.",
      "mail.sent": "{to}-க்கு email போயிடுச்சு", "mail.sim": "Email simulate பண்ணினோம் ({r})", "mail.also": "{to}-க்கும் email போச்சு",
      "g.email": "Email (உண்மையான one-button message இங்க போகும்)", "n.h": "உண்மையான delivery", "n.on": "Email ON — message-கள் உண்மையா போகும் ({f}-ல இருந்து)", "n.off": "Email OFF — காப்பாளர் message, complaint எல்லாம் screen-ல simulate மட்டும்.",
      "n.demo": "பாதுகாப்பு: எல்லா mail-ம் {to}-க்கு மட்டும் போகும்", "n.how": "ON பண்ண run.bat பக்கத்துல .env file-ல VASOOL_SMTP_USER, VASOOL_SMTP_PASS (Gmail app password), VASOOL_DEMO_TO போடுங்க. Bank-க்கு எப்பவும் அனுப்ப மாட்டோம்.", "n.test": "Test mail அனுப்பு", "n.bank": "இந்த demo bank-க்கு நேரடியா mail பண்ணாது.",
      "ap.h": "Vasool Raja உங்க OK கேக்குது", "ap.for": "{b}-ல {h}-ஓட account-க்கு", "ap.yes": "✓ சரி, complaint அனுப்பு", "ap.no": "இப்போ வேண்டாம்", "ap.done": "Bank-க்கு போயிடுச்சு. நன்றி — 30 நாள் clock-ஐ நாங்க பாத்துக்கறோம்.", "ap.used": "இந்த request-க்கு ஏற்கனவே பதில் சொல்லியாச்சு.", "ap.note": "Balance, செலவு விவரம் எதுவும் இதுல இல்ல. Complaint மட்டும் bank-க்கு போகும்.",
      "foot.privacy": "Transactions-ஐ check பண்றோம்; விக்கறது இல்ல. Password எப்பவும் கேக்க மாட்டோம்.",
      "home.h1": "உங்க bank உங்களுக்கு பணம் கடன் பட்டிருந்தா?",
      "home.lede": "ஒரு statement அல்லது passbook photo கொடுங்க. RBI rulebook-ஐ அதுல ஓட்டி, bank உங்களுக்கு என்ன தரணும்-னு சொல்றோம் — ஒவ்வொரு ரூபாய்க்கும் rule பக்கத்துலயே. நீங்க சொல்லாம யாருக்கும் எதுவும் அனுப்ப மாட்டோம்.",
      "home.drop": "Statement-ஐ இங்க போடுங்க — PDF, CSV அல்லது passbook photo", "home.or": "அல்லது sample-ஐ பாருங்க",
      "home.bank": "Bank", "home.type": "Account வகை", "home.city": "ஊர்", "home.minbal": "Bank கேக்கற minimum balance (₹)", "home.name": "உங்க பேர்", "home.scan": "என் account-ஐ check பண்ணு",
      "home.privacy": "இந்த server-ல process ஆகும்; transactions மட்டும் சேமிக்கப்படும்; எப்போ வேணா அழிக்கலாம். Net-banking password, PIN எப்பவும் கேக்க மாட்டோம்.",
      "found.h": "கிடைச்சது", "found.sub": "{n} items bank உங்களுக்கு தர வேண்டியிருக்கலாம்", "found.unclear": "{n}-க்கு உங்க ஒரு பதில் வேணும்", "found.avoid": "{n}-ஐ அடுத்த முறை தடுக்கலாம்",
      "found.charges": "இந்த காலத்துல bank charges: {a}", "found.none": "எல்லாம் சரியா இருக்கு. எதுவும் பண்ண வேண்டாம்.", "found.watch": "நாங்க பாத்துட்டே இருப்போம்.",
      "found.getback": "திரும்ப வாங்கு", "found.effort": "உங்க வேலை: சுமார் 2 நிமிஷம்",
      "sec.now": "இப்பவே கேக்கலாம்", "sec.ask": "உங்க ஒரு பதில் போதும்", "sec.combine": "சின்னது — சேர்த்து ஒரே complaint", "sec.skip": "ரொம்ப சின்னது — நாங்க பாத்துக்கறோம்", "sec.prevent": "சரி தான் — ஆனா அடுத்ததை தடுக்கலாம்",
      "why": "ஏன்-னு பாருங்க", "hide": "மூடு", "expected": "நடந்திருக்க வேண்டியது", "actual": "நடந்தது", "calc": "கணக்கு", "rule": "உங்க உரிமை", "source": "RBI source", "confidence": "நம்பகம்", "evidence": "Statement lines",
      "prevent": "அடுத்ததை தடுக்க", "answer": "பதில்:", "yes": "ஆமா", "no": "இல்ல", "not_sure": "தெரியல",
      "case.h": "உங்க case", "case.prepared": "Complaint தயார். இன்னும் எதுவும் அனுப்பல.", "case.guardian": "என் காப்பாளரை கேளு", "case.send": "நானே அனுப்பறேன்", "case.preview": "Complaint-ஐ படி",
      "case.callh": "அம்மா phone அடிக்குது", "case.play": "Call-ஐ கேளு", "case.stop": "நிறுத்து", "case.press1": "1 அழுத்து — {g}-ஐ கூப்பிடு", "case.press2": "2 அழுத்து — இப்போ வேண்டாம்",
      "case.wa": "{g}-க்கு WhatsApp", "case.approve": "{g}-ஆ OK சொல்லு", "case.sent": "Bank-க்கு அனுப்பியாச்சு. 30 நாள் clock-ஐ பாத்துக்கறோம்.", "case.days": "Bank பதில் சொல்ல {d} நாள் இருக்கு",
      "case.bankreplied": "Bank பதில் சொல்லிடுச்சு", "case.recovered": "பணம் வந்துடுச்சு", "case.bankright": "Bank சரி-ன்னு காட்டிடுச்சு", "case.escalate": "RBI Ombudsman-க்கு", "case.check": "அடுத்த statement-ல refund-ஐ check பண்ணு",
      "case.download": "Complaint text", "case.omb": "Ombudsman draft", "case.timeline": "இதுவரை நடந்தது",
      "cases.h": "Cases", "cases.none": "இன்னும் case இல்ல. எதாவது கிடைச்சா 'திரும்ப வாங்கு' case உருவாக்கும்.",
      "ask.h": "Vasool Raja-கிட்ட கேளுங்க", "ask.ph": "ஏன் bank ₹295 cut பண்ணுச்சு?", "ask.send": "கேளு", "ask.hint": "தமிழ்ல அல்லது English-ல கேளுங்க. உதாரணம்: என்ன ஆச்சு? · எவ்வளவு? · நான் என்ன பண்ணணும்? · KFS எங்க?",
      "rules.h": "Rulebook", "rules.lede": "Vasool Raja check பண்ற ஒவ்வொரு rule-ம், RBI source-ம் தேதியும். Open data — யார் வேணா audit பண்ணலாம்.",
      "settings.h": "Settings", "g.h": "காப்பாளர் (Guardian)", "g.lede": "நீங்க நம்புற ஒருத்தர். முதல்ல உங்களுக்கு phone பண்ணுவோம், அப்புறம் அவங்களுக்கு ஒரு message. உங்க balance, செலவு அவங்களுக்கு தெரியாது.",
      "g.name": "பேர்", "g.rel": "உறவு", "g.phone": "Phone", "g.consent": "உங்க சம்மதம், உங்க வார்த்தையில", "g.save": "காப்பாளரை சேமி",
      "s.delete": "என் data எல்லாத்தையும் அழி", "s.deleted": "அழிச்சாச்சு.", "s.basic": "Zero-charge Basic account-க்கு மாத்த letter",
      "noacct": "முதல்ல statement-ஐ scan பண்ணுங்க.", "err": "ஏதோ தப்பு: ",
      "priority.RECOVER_NOW": "இப்பவே", "priority.COMBINE": "சேர்த்து", "priority.NOT_WORTH_IT": "பாத்துக்கறோம்", "priority.PREVENT": "தடுக்கலாம்",
      "label.RECOVERABLE": "Rule மீறல் · திரும்ப வாங்கலாம்", "label.AVOIDABLE": "சரி · தடுக்கலாம்", "label.UNCLEAR": "ஒரு பதில் வேணும்",
      "conf.CONFIRMED": "உறுதி", "conf.NEEDS_CHECKING": "Check பண்ணணும்", "conf.INFO": "தகவல்",
      "suspicious": "இது fail ஆயி மறுபடி பண்ண payment மாதிரி இருக்கு. Fail ஆச்சா?",
      "state": { FOUND: "கண்டுபிடிச்சது", PREPARED: "தயார்", AWAITING_APPROVAL: "OK-க்கு காத்திருக்கு", SENT_TO_BANK: "Bank-க்கு போச்சு", BANK_REPLIED: "Bank பதில்", DEADLINE_PASSED: "Deadline முடிஞ்சது", ESCALATED_OMBUDSMAN: "Ombudsman", RECOVERED: "வந்துடுச்சு", CLOSED_BANK_RIGHT: "Bank சரி", CLOSED_BY_USER: "மூடியது" },
    },
  };
  const S = window.__VR = { lang: localStorage.getItem("vr.lang") || "ta", accountId: localStorage.getItem("vr.account") || null, data: null, cases: [], openWhy: new Set(), chat: [] };
  const t = (k, vars) => { let s = (T[S.lang][k] ?? T.en[k] ?? k); if (typeof s === "string" && vars) for (const [a, b] of Object.entries(vars)) s = s.replaceAll(`{${a}}`, b); return s; };
  const inr = (x) => { const n = Number(x || 0); const frac = Math.abs(n - Math.round(n)) > 0.004; return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: frac ? 2 : 0, maximumFractionDigits: 2 }); };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  // ------------------------------------------------------------------ api
  async function api(path, opts = {}) {
    const r = await fetch("/api" + path, opts);
    if (!r.ok) { let m = r.statusText; try { const j = await r.json(); const d = j.detail ?? j; m = typeof d === "string" ? d : (d.message ? d.message + (d.warnings?.length ? " · " + d.warnings.join(" · ") : "") : JSON.stringify(d)); } catch { } throw new Error(m); }
    const ct = r.headers.get("content-type") || "";
    return ct.includes("json") ? r.json() : r.text();
  }
  const post = (path, body) => api(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });

  function toast(msg, ms = 2600) { const el = $("#toast"); el.textContent = msg; el.hidden = false; clearTimeout(el._t); el._t = setTimeout(() => (el.hidden = true), ms); }

  // ------------------------------------------------------------------ speech
  function speak(text, lang) {
    try {
      if (!("speechSynthesis" in window)) return false;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "ta" ? "ta-IN" : "en-IN";
      const voices = window.speechSynthesis.getVoices();
      const v = voices.find((v) => v.lang.toLowerCase().startsWith(lang === "ta" ? "ta" : "en-in")) || voices.find((v) => v.lang.toLowerCase().startsWith("en"));
      if (v) u.voice = v;
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
      return true;
    } catch { return false; }
  }
  function listen(onText) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast("Voice input isn't available in this browser — type instead."); return null; }
    const r = new SR(); r.lang = S.lang === "ta" ? "ta-IN" : "en-IN"; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = (e) => onText(e.results[0][0].transcript);
    r.onerror = () => toast("Couldn't hear that. Try again.");
    r.start();
    return r;
  }

  // ------------------------------------------------------------------ shell
  function applyLang() {
    $("#lang-ta").setAttribute("aria-pressed", S.lang === "ta");
    $("#lang-en").setAttribute("aria-pressed", S.lang === "en");
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.documentElement.lang = S.lang;
  }
  function setLang(l) { S.lang = l; localStorage.setItem("vr.lang", l); applyLang(); route(); }
  $("#lang-ta").onclick = () => setLang("ta");
  $("#lang-en").onclick = () => setLang("en");

  async function loadAccount() {
    if (!S.accountId) return null;
    try { S.data = await api(`/accounts/${S.accountId}`); S.cases = S.data.cases || []; return S.data; }
    catch { S.accountId = null; localStorage.removeItem("vr.account"); return null; }
  }

  // ------------------------------------------------------------------ screens
  async function screenHome() {
    const samples = S.samples = await api("/samples").catch(() => []);
    const lang = S.lang;
    return `
    <div class="stack">
      <section class="card dark">
        <div class="eyebrow">Vasool Scan</div>
        <h1 style="margin-top:8px">${esc(t("home.h1"))}</h1>
        <p style="margin-top:12px;max-width:62ch;color:#DCE8E0">${esc(t("home.lede"))}</p>
      </section>
      <form id="scanform" class="card stack">
        <label class="drop" id="drop">
          <input type="file" id="file" name="file" multiple accept=".csv,.tsv,.txt,.pdf,.xlsx,.jpg,.jpeg,.png,.webp">
          <div><strong id="dropname">${esc(t("home.drop"))}</strong></div>
          <div class="muted" style="margin-top:6px">PDF · CSV · XLSX · JPG/PNG · ${esc(t("home.multi"))}</div>
        </label>
        <div class="row">
          <span class="muted">${esc(t("home.or"))}</span>
          ${samples.map((s) => `<button type="button" class="btn sm sample" data-name="${esc(s.name)}">${esc(s.name.replace(/_/g, " ").replace(/\.(csv|tsv)$/, ""))}</button>`).join("")}
        </div>
        <div class="grid2">
          <label class="field">${esc(t("home.bank"))}<select name="bank"><option value="">Auto-detect</option>${["SBI", "HDFC", "ICICI", "AXIS", "CANARA", "PNB", "BOB", "UNION", "KOTAK", "INDIAN BANK", "IOB", "BOI", "TMB", "CUB", "KVB", "FEDERAL"].map((b) => `<option>${b}</option>`).join("")}</select></label>
          <label class="field">${esc(t("home.type"))}<select name="account_type"><option value="SAVINGS">Savings</option><option value="SALARY">Salary</option><option value="PENSION">Pension</option><option value="BSBDA">Basic (BSBDA / Jan Dhan)</option><option value="CURRENT">Current</option></select></label>
          <label class="field">${esc(t("home.city"))}<select name="city_tier"><option value="NON_METRO">Non-metro (Coimbatore, Madurai…)</option><option value="METRO">Metro (Chennai, Bengaluru, Mumbai…)</option></select></label>
          <label class="field">${esc(t("home.minbal"))}<input name="min_balance_required" type="number" min="0" step="1" placeholder="e.g. 500 / 1000 / 10000"></label>
          <label class="field">${esc(t("home.name"))}<input name="holder_name" placeholder="Selvi R"></label>
          <label class="field">As of (for demo)<input name="as_of" type="date" value="${new Date().toISOString().slice(0, 10)}"></label>
        </div>
        <div class="row" style="justify-content:space-between">
          <span class="muted" style="max-width:56ch;font-size:.85rem">${esc(t("home.privacy"))}</span>
          <button class="btn primary" type="submit" id="scanbtn">${esc(t("home.scan"))}</button>
        </div>
      </form>
      ${S.accountId && S.data ? `<section class="card soft row" style="justify-content:space-between"><div><div class="eyebrow">${esc(t("home.current", { a: acctLabel(S.data) }))}</div><div class="muted" style="font-size:.9rem">${esc(t("home.new"))}</div></div><div class="row"><a class="btn" href="#/findings">↩ ${esc(t("nav.findings"))}</a><a class="btn gold" href="#/findings#statements">${esc(t("home.addto"))}</a><a class="btn ghost" href="#/history">${esc(t("nav.history"))}</a></div></section>` : ""}
    </div>`;
  }
  const acctLabel = (d) => `${d.profile?.bank || d.summary?.bank || ""}${d.profile?.account_last4 ? " ····" + d.profile.account_last4 : ""}${d.profile?.holder_name ? " · " + d.profile.holder_name : ""}`;

  function bindHome() {
    const form = $("#scanform"), drop = $("#drop"), file = $("#file");
    let sampleName = null;
    file.onchange = () => { sampleName = null; const n = file.files.length; $("#dropname").textContent = n > 1 ? `${n} files: ` + [...file.files].map((f) => f.name).join(", ") : file.files[0]?.name || t("home.drop"); };
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
    drop.addEventListener("drop", (e) => { file.files = e.dataTransfer.files; file.onchange(); });
    $$(".sample").forEach((b) => (b.onclick = () => { sampleName = b.dataset.name; $("#dropname").textContent = "Sample: " + sampleName; $$(".sample").forEach((x) => x.classList.remove("gold")); b.classList.add("gold");
      // sensible demo defaults per sample
      const f = form.elements;
      if (sampleName.startsWith("canara")) { f.bank.value = "CANARA"; f.account_type.value = "PENSION"; f.city_tier.value = "NON_METRO"; f.min_balance_required.value = 500; f.holder_name.value = "Selvi R"; f.as_of.value = "2026-09-13"; }
      if (sampleName.startsWith("sbi")) { f.bank.value = "SBI"; f.account_type.value = "SAVINGS"; f.city_tier.value = "NON_METRO"; f.min_balance_required.value = 0; f.holder_name.value = "Arun K"; f.as_of.value = "2025-07-01"; }
      if (sampleName.startsWith("hdfc")) { f.bank.value = "HDFC"; f.account_type.value = "SALARY"; f.city_tier.value = "METRO"; f.min_balance_required.value = 10000; f.holder_name.value = "Priya S"; f.as_of.value = "2026-04-01"; }
      if (sampleName.startsWith("indianbank")) { f.bank.value = "INDIAN BANK"; f.account_type.value = "SAVINGS"; f.city_tier.value = "NON_METRO"; f.min_balance_required.value = 500; f.holder_name.value = "Murugan P"; f.as_of.value = "2026-09-13"; }
    }));
    form.onsubmit = async (e) => {
      e.preventDefault();
      const f = form.elements;
      const fd = new FormData();
      if (sampleName) { fd.append("file", await (await fetch(`/api/samples/${sampleName}`)).blob(), sampleName); }
      else if (file.files.length) { [...file.files].forEach((f) => fd.append("files", f, f.name)); }
      else { toast(t("home.drop")); return; }
      fd.append("profile", JSON.stringify({ bank: f.bank.value, account_type: f.account_type.value, city_tier: f.city_tier.value, min_balance_required: f.min_balance_required.value ? Number(f.min_balance_required.value) : null, holder_name: f.holder_name.value, language: S.lang }));
      if (f.as_of.value) fd.append("as_of", f.as_of.value);
      $("#scanbtn").disabled = true; $("#scanbtn").textContent = "Vasool Scan…";
      try {
        const d = await api("/scan", { method: "POST", body: fd });
        S.accountId = d.account_id; localStorage.setItem("vr.account", d.account_id); S.data = d; S.cases = d.cases || [];
        if ((d.upload || []).length > 1) toast(d.upload.map((u) => `${u.filename}: +${u.new}${u.duplicates ? " · " + u.duplicates + " dup" : ""}`).join("  |  "), 5000);
        location.hash = "#/findings";
      } catch (err) { toast(t("err") + err.message, 5000); $("#scanbtn").disabled = false; $("#scanbtn").textContent = t("home.scan"); }
    };
  }

  // ---- findings ------------------------------------------------------------
  const txnById = () => Object.fromEntries((S.data?.transactions || []).map((x) => [x.id, x]));
  const rulesCache = {};
  async function getRule(id) { if (!rulesCache[id]) rulesCache[id] = await api(`/rules/${id}`); return rulesCache[id]; }

  function findingCard(f) {
    const lang = S.lang, red = f.label === "RECOVERABLE", amb = f.label === "AVOIDABLE";
    const chipCls = red ? "red" : amb ? "amb" : "grey";
    const open = S.openWhy.has(f.id);
    const qs = (f.questions || []).map((q) => `
      <div class="qbtns" data-q="${esc(q.id)}" data-txn="${esc(f.evidence[0] || "")}">
        <span class="muted">${esc(lang === "ta" ? q.ta : q.en)}</span>
        ${(q.options || ["yes", "no", "not_sure"]).map((o) => `<button class="btn sm ans" data-val="${esc(o)}">${esc(t(o))}</button>`).join("")}
      </div>`).join("");
    return `
    <article class="card finding" data-id="${esc(f.id)}">
      <div>
        <div class="pillrow"><span class="chip ${chipCls}">${esc(t("label." + f.label))}</span><span class="chip grey">${esc(t("conf." + f.confidence))}</span><span class="chip green">${esc(t("priority." + f.priority))}</span><span class="chip grey mono">${esc(f.rule_id)}</span></div>
        <p class="summary" style="margin-top:8px">${esc(lang === "ta" ? f.summary_ta : f.summary_en)}</p>
        ${amb && (f.prevention_en || f.prevention_ta) ? `<p class="muted" style="font-size:.92rem">↳ ${esc(lang === "ta" ? f.prevention_ta : f.prevention_en)}</p>` : ""}
      </div>
      <div class="amt ${amb ? "" : ""}">${f.amount ? inr(f.amount) : ""}</div>
      <div class="actions">
        <button class="btn sm why-toggle">${open ? esc(t("hide")) : esc(t("why"))}</button>
        <button class="btn sm ghost speak" data-text="${esc(lang === "ta" ? f.summary_ta : f.summary_en)}">🔊</button>
        ${qs}
      </div>
      ${open ? `<div class="why" data-why="${esc(f.id)}"><div class="muted">…</div></div>` : ""}
    </article>`;
  }

  async function renderWhy(f, el) {
    const rule = await getRule(f.rule_id);
    const byId = txnById();
    const rows = f.evidence.map((id) => byId[id]).filter(Boolean);
    el.innerHTML = `
      <div class="kv">
        <b>${esc(t("expected"))}</b><span>${esc(f.expected)}</span>
        <b>${esc(t("actual"))}</b><span>${esc(f.actual)}</span>
        <b>${esc(t("calc"))}</b><span class="mono">${esc(f.calculation)}</span>
        <b>${esc(t("rule"))}</b><span>${esc(S.lang === "ta" ? rule.right_ta : rule.right_en)}</span>
        <b>${esc(t("source"))}</b><span><a href="${esc(rule.source.url)}" target="_blank" rel="noopener">${esc(rule.source.circular)}</a> · ${esc(rule.source.date)} · in force from ${esc(rule.effective_from)}${rule.effective_to ? " to " + esc(rule.effective_to) : ""}</span>
        <b>${esc(t("confidence"))}</b><span>${esc(t("conf." + f.confidence))} · ${f.evidence.length} evidence line(s) · priority ${esc(f.priority_reasons.join(" · "))}</span>
        ${f.prevention_en ? `<b>${esc(t("prevent"))}</b><span>${esc(S.lang === "ta" ? f.prevention_ta : f.prevention_en)}</span>` : ""}
      </div>
      <div class="evidence"><table><thead><tr><th>Date</th><th>Narration</th><th class="r">Debit</th><th class="r">Credit</th><th class="r">Balance</th><th>Ref</th></tr></thead><tbody>
        ${rows.map((r) => `<tr><td>${esc(r.date)}</td><td>${esc(r.narration)}</td><td class="r">${r.debit ? inr(r.debit) : ""}</td><td class="r">${r.credit ? inr(r.credit) : ""}</td><td class="r">${r.balance != null ? inr(r.balance) : ""}</td><td>${esc(r.ref)}</td></tr>`).join("")}
      </tbody></table></div>`;
  }

  function screenFindings() {
    if (!S.data) return `<div class="empty">${esc(t("noacct"))} <a href="#/">Scan</a></div>`;
    const d = S.data, s = d.summary, F = d.findings;
    const rec = F.filter((f) => f.label === "RECOVERABLE"), unc = F.filter((f) => f.label === "UNCLEAR"), avo = F.filter((f) => f.label === "AVOIDABLE");
    const now = rec.filter((f) => f.priority === "RECOVER_NOW"), comb = rec.filter((f) => f.priority === "COMBINE"), skip = rec.filter((f) => f.priority === "NOT_WORTH_IT");
    const byId = txnById();
    const sus = (d.suspicious_debits || []).map((id) => byId[id]).filter(Boolean).filter((x) => !(d.account_answers || {})[`txn_failed:${x.id}`]);
    const q = d.questions_for_suspicious;
    const section = (key, arr) => arr.length ? `<div class="section-title"><h2>${esc(t(key))}</h2><span class="count">${arr.length}</span></div>${arr.map(findingCard).join("")}` : "";
    const openCase = S.cases.find((c) => !["RECOVERED", "CLOSED_BANK_RIGHT", "CLOSED_BY_USER"].includes(c.state));
    const cov = d.coverage || {};
    return `
    <div class="stack">
      <section class="card ${s.total_recoverable > 0 ? "dark" : "soft"}">
        <div class="eyebrow">Vasool Scan · ${esc(s.bank || "")} ${d.profile.account_last4 ? "····" + esc(d.profile.account_last4) : ""} · ${esc(cov.from || s.period.from || "")} → ${esc(cov.to || s.period.to || "")}${(d.statements || []).length > 1 ? " · " + esc(t("hist.stmts", { n: d.statements.length })) : ""}</div>
        ${s.total_recoverable > 0 ? `
          <div class="hero-amount" style="margin-top:10px">${inr(s.total_recoverable)} <span style="font-size:.45em">${esc(t("found.h"))}</span></div>
          <p style="margin-top:8px;color:#DCE8E0">${esc(t("found.sub", { n: rec.length }))}${unc.length ? " · " + esc(t("found.unclear", { n: unc.length })) : ""}${avo.length ? " · " + esc(t("found.avoid", { n: avo.length })) : ""}</p>
          <p class="muted" style="color:#9DB8A8">${esc(t("found.charges", { a: inr(s.total_bank_charges_in_period) }))}</p>
          <div class="row" style="margin-top:8px">
            ${openCase ? `<a class="btn gold" href="#/case/${esc(openCase.id)}">${esc(t("case.h"))} ${esc(openCase.id)} →</a>` : `<button class="btn gold" id="getback" style="font-size:1.1rem;padding:14px 24px">${esc(t("found.getback"))}</button>`}
            <span style="color:#DCE8E0">${esc(t("found.effort"))}</span>
          </div>` : `
          <h1 style="margin-top:8px;color:var(--green)">${esc(t("found.none"))}</h1>
          <p class="muted">${esc(t("found.watch"))}${unc.length ? " · " + esc(t("found.unclear", { n: unc.length })) : ""}</p>`}
        ${s.warnings?.length ? `<p class="muted" style="font-size:.82rem;margin-top:8px">${s.warnings.map(esc).join("<br>")}</p>` : ""}
      </section>
      ${sus.length ? `<section class="card warn"><h3>${esc(t("suspicious"))}</h3>${sus.map((x) => `<div class="qbtns" data-q="txn_failed" data-txn="${esc(x.id)}" style="margin-top:8px"><span class="mono">${esc(x.date)} · ${esc(x.narration)} · ${inr(x.debit)}</span>${["yes", "no", "not_sure"].map((o) => `<button class="btn sm ans" data-val="${o}">${esc(t(o))}</button>`).join("")}</div>`).join("")}</section>` : ""}
      ${section("sec.now", now)}
      ${section("sec.ask", unc)}
      ${section("sec.combine", comb)}
      ${section("sec.skip", skip)}
      ${section("sec.prevent", avo)}
      ${statementsCard(d)}
    </div>`;
  }

  function statementsCard(d) {
    const st = d.statements || [], cov = d.coverage || { gaps: [] };
    return `
    <section class="card stack" id="statements">
      <div class="section-title" style="margin-top:0"><h2>${esc(t("st.h"))}</h2><span class="count">${st.length}</span></div>
      <p class="muted" style="margin:0">${esc(t("st.lede"))}</p>
      ${st.map((x) => `<div class="row stmt" style="justify-content:space-between;border-top:1px dashed var(--line);padding-top:8px">
          <div><div><b>${esc(x.filename)}</b> <span class="chip grey">${esc(x.source_kind || "")}</span></div>
          <div class="muted mono" style="font-size:.8rem">${esc(x.period_from || "?")} → ${esc(x.period_to || "?")} · ${esc(t("st.lines", { n: x.txn_count }))} · ${esc(t("st.new", { n: x.new_count }))}${x.dup_count ? " · " + esc(t("st.dup", { n: x.dup_count })) : ""}</div>
          ${x.warnings?.length ? `<div class="muted" style="font-size:.8rem;color:var(--gold)">${x.warnings.map(esc).join("<br>")}</div>` : ""}</div>
          <button class="btn sm ghost rm-stmt" data-id="${esc(x.id)}" style="color:var(--red)">✕ ${esc(t("st.remove"))}</button>
        </div>`).join("")}
      ${cov.gaps?.length ? `<div class="card warn" style="padding:10px 14px">${cov.gaps.map(([a, b]) => esc(t("st.gap", { a, b }))).join("<br>")}</div>` : ""}
      <div class="row">
        <label class="btn primary" style="font-size:1rem;padding:10px 16px">＋ ${esc(t("st.add"))}<input type="file" id="addstmt" hidden multiple accept=".csv,.tsv,.txt,.pdf,.xlsx,.jpg,.jpeg,.png,.webp"></label>
        ${(() => { const sm = (S.samples || []).filter((x) => x.name.split("_")[0] === (d.profile.bank || "").toLowerCase().replace(" ", "") && !st.some((y) => y.filename === x.name)); return sm.length ? `<span class="muted" style="font-size:.85rem">${esc(t("home.or"))}</span>` + sm.map((x) => `<button class="btn sm add-sample" data-name="${esc(x.name)}">${esc(x.name.replace(/_/g, " ").replace(/\.(csv|tsv)$/, ""))}</button>`).join("") : ""; })()}
      </div>
    </section>`;
  }

  async function addStatements(files) {
    const fd = new FormData();
    files.forEach(([blob, name]) => fd.append("files", blob, name));
    try {
      const d = await api(`/accounts/${S.accountId}/statements`, { method: "POST", body: fd });
      S.data = d; S.cases = d.cases || [];
      const n = d.upload.reduce((a, u) => a + u.new, 0), k = d.upload.reduce((a, u) => a + u.duplicates, 0);
      toast(t("st.added", { n, d: k }), 4500);
      await route();
    } catch (e) { toast(t("err") + e.message, 6000); }
  }

  function bindFindings() {
    $$(".why-toggle").forEach((b) => (b.onclick = async () => {
      const card = b.closest(".finding"), id = card.dataset.id;
      if (S.openWhy.has(id)) S.openWhy.delete(id); else S.openWhy.add(id);
      await route();
      const el = $(`[data-why="${id}"]`);
      if (el) { const f = S.data.findings.find((x) => x.id === id); renderWhy(f, el); }
    }));
    $$("[data-why]").forEach((el) => { const f = S.data.findings.find((x) => x.id === el.dataset.why); if (f) renderWhy(f, el); });
    $$(".speak").forEach((b) => (b.onclick = () => speak(b.dataset.text, S.lang)));
    $$(".ans").forEach((b) => (b.onclick = async () => {
      const wrap = b.closest(".qbtns"); const key = wrap.dataset.txn ? `${wrap.dataset.q}:${wrap.dataset.txn}` : wrap.dataset.q;
      try { S.data = await post(`/accounts/${S.accountId}/answers`, { answers: { [key]: b.dataset.val } }); S.cases = S.data.cases || []; toast("✓"); route(); }
      catch (e) { toast(t("err") + e.message); }
    }));
    const add = $("#addstmt");
    if (add) add.onchange = () => addStatements([...add.files].map((f) => [f, f.name]));
    $$(".add-sample").forEach((b) => (b.onclick = async () => { b.disabled = true; const blob = await (await fetch(`/api/samples/${b.dataset.name}`)).blob(); await addStatements([[blob, b.dataset.name]]); }));
    $$(".rm-stmt").forEach((b) => (b.onclick = async () => {
      if (!confirm(t("st.remove") + "?")) return;
      try { const d = await api(`/accounts/${S.accountId}/statements/${b.dataset.id}`, { method: "DELETE" }); if (d.summary) { S.data = d; S.cases = d.cases || []; } else { S.accountId = null; S.data = null; localStorage.removeItem("vr.account"); location.hash = "#/"; return; } route(); }
      catch (e) { toast(t("err") + e.message); }
    }));
    const gb = $("#getback");
    if (gb) gb.onclick = async () => {
      gb.disabled = true;
      try { const c = await post(`/accounts/${S.accountId}/cases`, {}); location.hash = `#/case/${c.id}`; }
      catch (e) { toast(t("err") + e.message); gb.disabled = false; }
    };
  }

  // ---- case ---------------------------------------------------------------
  const ORDER = ["FOUND", "PREPARED", "AWAITING_APPROVAL", "SENT_TO_BANK", "BANK_REPLIED", "ESCALATED_OMBUDSMAN", "RECOVERED"];
  function tracker(c) {
    const steps = [["FOUND", t("state").FOUND], ["SENT_TO_BANK", t("state").SENT_TO_BANK], ["BANK_REPLIED", t("state").BANK_REPLIED], ["ESCALATED_OMBUDSMAN", t("state").ESCALATED_OMBUDSMAN], ["RECOVERED", t("state").RECOVERED]];
    const idx = ORDER.indexOf(c.state);
    const pos = (k) => ORDER.indexOf(k);
    return `<div class="track">${steps.map(([k, label], i) => { const cls = c.state === k || (k === "FOUND" && ["PREPARED", "AWAITING_APPROVAL"].includes(c.state)) ? "on" : pos(k) < idx ? "done" : ""; return `<span class="${cls}">${esc(label)}</span>${i < steps.length - 1 ? "<i>→</i>" : ""}`; }).join("")}</div>`;
  }

  async function screenCase(id) {
    let c; try { c = await api(`/cases/${id}`); } catch { return `<div class="empty">Case not found.</div>`; }
    if (!S.data) await loadAccount();
    const g = S.data?.guardian;
    const gname = g?.name || "";
    const notif = await api(`/accounts/${c.account_id}/notifications`).catch(() => []);
    const lastCall = notif.find((n) => n.kind === "voice_call" && n.case_id === c.id);
    const lastMsg = notif.find((n) => n.kind === "guardian_message" && n.case_id === c.id);
    const lastMail = notif.find((n) => n.kind === "email_guardian" && n.case_id === c.id);
    const pre = ["FOUND", "PREPARED"].includes(c.state), waiting = c.state === "AWAITING_APPROVAL", sent = c.state === "SENT_TO_BANK";
    const closed = ["RECOVERED", "CLOSED_BANK_RIGHT", "CLOSED_BY_USER"].includes(c.state);
    return `
    <div class="stack">
      <section class="card dark">
        <div class="eyebrow">${esc(t("case.h"))} · ${esc(c.id)}</div>
        <div class="hero-amount" style="margin-top:8px;font-size:clamp(2rem,6vw,3.2rem)">${inr(c.amount)}</div>
        <p style="margin-top:6px;color:#DCE8E0;font-size:1.05rem">${esc(c.status_text)}</p>
        ${c.days_left != null && sent ? `<p style="color:#9DB8A8">${esc(t("case.days", { d: c.days_left }))} · ${esc(c.bank_reply_due)}</p>` : ""}
        ${tracker(c)}
      </section>

      ${pre ? `
      <section class="card stack">
        <h2>${esc(t("case.prepared"))}</h2>
        <div class="row">
          <button class="btn primary" id="askg">${g ? esc(t("case.guardian")) : esc(t("case.guardian"))}</button>
          <button class="btn" id="sendself">${esc(t("case.send"))}</button>
          <button class="btn ghost" id="preview">${esc(t("case.preview"))}</button>
        </div>
        ${!g ? `<p class="muted">${esc(t("g.lede"))} <a href="#/settings">${esc(t("g.h"))} →</a></p>` : ""}
        <pre id="previewbox" class="mono" hidden style="white-space:pre-wrap;background:var(--grey-soft);padding:14px;border-radius:10px;max-height:50vh;overflow:auto"></pre>
      </section>` : ""}

      ${waiting || (lastCall && !closed) ? `
      <section class="grid2">
        <div class="phone">
          <div class="from">${esc(t("case.callh"))} <span class="pulse"></span></div>
          <div class="bubble" id="callbubble">${esc(lastCall?.text || "")}</div>
          <div class="keys">
            <button class="btn sm gold" id="playcall">🔊 ${esc(t("case.play"))}</button>
            <button class="btn sm" id="stopcall">${esc(t("case.stop"))}</button>
          </div>
          <div class="keys">
            ${gname ? `<button class="btn sm" id="press1">1 · ${esc(t("case.press1", { g: gname }))}</button>` : ""}
            <button class="btn sm ghost" id="press2">2 · ${esc(t("case.press2"))}</button>
          </div>
        </div>
        ${lastMsg ? `
        <div class="phone">
          <div class="from">${esc(t("case.wa", { g: gname }))}</div>
          <div class="bubble wa">${esc(lastMsg.text)}</div>
          ${lastMail ? `<div class="muted" style="font-size:.8rem;margin-top:8px">${lastMail.sent ? "📧 " + esc(t("mail.also", { to: lastMail.to })) : "📧 " + esc(t("mail.sim", { r: lastMail.reason || "" }))}</div>` : ""}
          <div class="keys">${waiting ? `<button class="btn sm primary" id="approve" data-token="${esc(lastMsg.token)}">✓ ${esc(t("case.approve", { g: gname }))}</button>` : `<span class="chip green">✓ ${esc(c.guardian_approved_by || "approved")}</span>`}</div>
        </div>` : waiting ? `<div class="card stack"><div class="eyebrow">${esc(S.lang === "ta" ? "காப்பாளர் இல்ல" : "No guardian on file")}</div><p class="muted" style="margin:0">${esc(S.lang === "ta" ? "நீங்களே OK சொல்லலாம். அல்லது Settings-ல ஒரு காப்பாளரை சேர்த்தா, அவங்க phone-க்கு ஒரு button message போகும்." : "You can approve it yourself. Or add a guardian in Settings and they get a one-button message on their phone.")} <a href="#/settings">${esc(t("g.h"))} →</a></p><button class="btn primary" id="approve-self" data-token="${esc(notif.find((n) => n.token && n.case_id === c.id)?.token || "")}">✓ OK — ${esc(S.lang === "ta" ? "நானே அனுப்பறேன்" : "send it")}</button></div>` : ""}
      </section>` : ""}

      ${!pre && !closed && !waiting ? `
      <section class="card stack">
        <h3>${esc(t("case.timeline"))}</h3>
        <div class="row">
          ${sent || c.state === "DEADLINE_PASSED" ? `<button class="btn sm ev" data-state="BANK_REPLIED">${esc(t("case.bankreplied"))}</button>` : ""}
          ${["SENT_TO_BANK", "BANK_REPLIED", "DEADLINE_PASSED", "ESCALATED_OMBUDSMAN"].includes(c.state) ? `<button class="btn sm ev gold" data-state="RECOVERED">${esc(t("case.recovered"))}</button>` : ""}
          ${["BANK_REPLIED", "DEADLINE_PASSED"].includes(c.state) ? `<button class="btn sm ev" data-state="ESCALATED_OMBUDSMAN">${esc(t("case.escalate"))}</button>` : ""}
          ${["SENT_TO_BANK", "BANK_REPLIED", "ESCALATED_OMBUDSMAN"].includes(c.state) ? `<button class="btn sm ev" data-state="CLOSED_BANK_RIGHT">${esc(t("case.bankright"))}</button>` : ""}
          ${["SENT_TO_BANK", "BANK_REPLIED", "DEADLINE_PASSED", "ESCALATED_OMBUDSMAN"].includes(c.state) ? `<label class="btn sm">${esc(t("case.check"))}<input type="file" id="checkfile" hidden accept=".csv,.tsv,.pdf,.xlsx"></label>` : ""}
        </div>
      </section>` : ""}

      <section class="card stack">
        <div class="row">
          <a class="btn gold" href="/api/cases/${esc(c.id)}/complaint.html?lang=${S.lang}&print=1" target="_blank" rel="noopener">🖨 ${esc(t("case.print"))}</a>
          <a class="btn" href="/api/cases/${esc(c.id)}/ombudsman.html?lang=${S.lang}" target="_blank" rel="noopener">${esc(t("case.printomb"))}</a>
          <a class="btn sm ghost" href="/api/cases/${esc(c.id)}/complaint.txt" target="_blank">${esc(t("case.download"))}</a><a class="btn sm ghost" href="/api/cases/${esc(c.id)}/ombudsman.txt" target="_blank">${esc(t("case.omb"))}</a>
        </div>
        <p class="muted" style="margin:0;font-size:.88rem">${esc(t("case.printhint"))}</p>
        <div class="timeline">${c.events.map((e) => `<div class="ev"><span class="t">${esc(e.at.replace("T", " "))}</span><span><b>${esc(t("state")[e.state] || e.state)}</b> — ${esc(e.note)} <span class="muted">(${esc(e.actor)})</span></span></div>`).join("")}</div>
      </section>
    </div>`;
  }

  const waitingNow = (id) => location.hash === `#/case/${id}` && $("#approve, #approve-self");
  function bindCase(id) {
    const askg = $("#askg");
    if (askg) askg.onclick = async () => { askg.disabled = true; try { const r = await post(`/cases/${id}/request-approval?lang=${S.lang}`); await route(); if (r.email) toast(r.email.sent ? "📧 " + t("mail.sent", { to: r.email.to }) : t("mail.sim", { r: r.email.reason }), 6000); setTimeout(() => speak(r.holder_call.text, r.holder_call.lang), 400); } catch (e) { toast(t("err") + e.message); askg.disabled = false; } };
    const ss = $("#sendself");
    if (ss) ss.onclick = async () => { try { await post(`/cases/${id}/send`); toast(t("case.sent")); route(); } catch (e) { toast(t("err") + e.message); } };
    const pv = $("#preview");
    if (pv) pv.onclick = async () => { const box = $("#previewbox"); box.hidden = !box.hidden; if (!box.textContent) box.textContent = await api(`/cases/${id}/complaint.txt`); };
    const play = $("#playcall"); if (play) play.onclick = () => { if (!speak($("#callbubble").textContent, S.lang)) toast("No speech voice available in this browser."); };
    const stop = $("#stopcall"); if (stop) stop.onclick = () => window.speechSynthesis?.cancel();
    const p1 = $("#press1"); if (p1) p1.onclick = () => toast(S.lang === "ta" ? "Kumar-ஐ கூப்பிடறோம்…" : "Calling your guardian…");
    const p2 = $("#press2"); if (p2) p2.onclick = () => toast(S.lang === "ta" ? "சரி. நாங்க பாத்துக்கறோம்." : "No problem. We'll keep watching.");
    $$("#approve, #approve-self").forEach((b) => (b.onclick = async () => { try { const r = await post(`/approvals/${b.dataset.token}?approver=${encodeURIComponent(S.data?.guardian?.name || "holder")}`); toast(t("case.sent") + (r.email?.sent ? " 📧 " + t("mail.sent", { to: r.email.to }) : ""), 5000); route(); } catch (e) { toast(t("err") + e.message); } }));
    // live: when the guardian approves from their phone, this screen moves on by itself
    if (waitingNow(id)) { clearInterval(S._poll); S._poll = setInterval(async () => { try { const c = await api(`/cases/${id}`); if (c.state !== "AWAITING_APPROVAL") { clearInterval(S._poll); toast(t("case.sent"), 4000); route(); } } catch { clearInterval(S._poll); } }, 2500); }
    $$(".ev").forEach((b) => (b.onclick = async () => { try { await post(`/cases/${id}/event`, { state: b.dataset.state, note: "marked in app", actor: "user" }); route(); } catch (e) { toast(t("err") + e.message); } }));
    const cf = $("#checkfile");
    if (cf) cf.onchange = async () => { const fd = new FormData(); fd.append("file", cf.files[0]); try { const r = await api(`/cases/${id}/check-recovery`, { method: "POST", body: fd }); toast(r.recovered ? "✓ " + r.status_text : r.status_text, 4000); route(); } catch (e) { toast(t("err") + e.message); } };
  }

  function screenCases() {
    if (!S.data) return `<div class="empty">${esc(t("noacct"))} <a href="#/">Scan</a></div>`;
    if (!S.cases.length) return `<div class="stack"><h1>${esc(t("cases.h"))}</h1><div class="empty">${esc(t("cases.none"))}</div></div>`;
    return `<div class="stack"><h1>${esc(t("cases.h"))}</h1>${S.cases.map((c) => `<a class="card" href="#/case/${esc(c.id)}" style="text-decoration:none;color:inherit"><div class="row" style="justify-content:space-between"><div><div class="eyebrow">${esc(c.id)}</div><div style="font-size:1.05rem;margin-top:4px">${esc(c.status_text)}</div>${c.days_left != null ? `<div class="muted">${esc(t("case.days", { d: c.days_left }))}</div>` : ""}</div><div class="amt display" style="font-size:1.6rem;color:var(--green)">${inr(c.amount)}</div></div><div style="margin-top:10px">${tracker(c)}</div></a>`).join("")}</div>`;
  }

  // ---- approve (opened from the guardian's phone) --------------------------
  async function screenApprove(token) {
    let a; try { a = await api(`/approvals/${token}`); } catch { return `<div class="empty">Invalid link.</div>`; }
    const L = a.lang === "ta" ? "ta" : "en"; const tt = (k, v) => { const s = T[L][k] ?? T.en[k]; return v ? Object.entries(v).reduce((x, [p, q]) => x.replaceAll(`{${p}}`, q), s) : s; };
    return `
    <div class="stack" style="max-width:520px;margin:0 auto">
      <section class="card dark">
        <div class="eyebrow">Vasool Raja · ${esc(a.case_id)}</div>
        <h1 style="margin-top:8px;font-size:1.6rem">${esc(tt("ap.h"))}</h1>
        <p style="color:#DCE8E0;margin-top:6px">${esc(tt("ap.for", { h: a.holder || "-", b: a.bank || "-" }))}</p>
        <div class="hero-amount" style="font-size:2.6rem;margin-top:6px">${inr(a.amount)}</div>
      </section>
      <section class="card stack">
        <div class="phone" style="max-width:none"><div class="bubble wa" style="margin-top:0">${esc(a.message)}</div></div>
        <p class="muted" style="margin:0;font-size:.88rem">${esc(tt("ap.note"))}</p>
        ${a.used || a.state !== "AWAITING_APPROVAL" ? `<p class="chip green" style="font-size:.9rem;padding:8px 12px">✓ ${esc(a.used ? tt("ap.done") : tt("ap.used"))}</p>` : `
        <button class="btn gold" id="ap-yes" style="font-size:1.2rem;padding:16px 22px;width:100%">${esc(tt("ap.yes"))}</button>
        <button class="btn ghost" id="ap-no" style="width:100%">${esc(tt("ap.no"))}</button>`}
        <div id="ap-result"></div>
      </section>
    </div>`;
  }
  function bindApprove(token) {
    const y = $("#ap-yes"), n = $("#ap-no");
    if (y) y.onclick = async () => { y.disabled = true; try { const a = await api(`/approvals/${token}`); const r = await post(`/approvals/${token}?approver=${encodeURIComponent(a.guardian?.name || "guardian")}`); const L = a.lang === "ta" ? "ta" : "en"; $("#ap-result").innerHTML = `<div class="card soft" style="margin-top:10px"><b>✓ ${esc(T[L]["ap.done"])}</b>${r.email?.sent ? `<div class="muted" style="font-size:.85rem">📧 ${esc(T[L]["mail.sent"].replace("{to}", r.email.to))}</div>` : ""}</div>`; y.hidden = true; if (n) n.hidden = true; speak(T[L]["ap.done"], L); } catch (e) { toast(t("err") + e.message); y.disabled = false; } };
    if (n) n.onclick = () => { $("#ap-result").innerHTML = `<p class="muted">${esc(S.lang === "ta" ? "சரி. நாங்க பாத்துக்கறோம்." : "No problem. We'll keep watching.")}</p>`; };
  }

  // ---- history -----------------------------------------------------------
  async function screenHistory() {
    const accts = await api("/accounts").catch(() => []);
    if (!accts.length) return `<div class="stack"><h1>${esc(t("hist.h"))}</h1><div class="empty">${esc(t("hist.none"))} <a href="#/">Scan</a></div></div>`;
    return `<div class="stack"><h1>${esc(t("hist.h"))}</h1><p class="muted">${esc(t("hist.lede"))}</p>
      ${accts.map((a) => { const cur = a.id === S.accountId; const p = a.profile || {}; return `
      <article class="card ${cur ? "soft" : ""}" data-id="${esc(a.id)}">
        <div class="row" style="justify-content:space-between;align-items:flex-start">
          <div>
            <div class="pillrow">${cur ? `<span class="chip green">${esc(t("hist.current"))}</span>` : ""}<span class="chip grey mono">${esc(a.id)}</span><span class="chip grey">${esc(t("hist.stmts", { n: a.statements }))}</span>${a.cases ? `<span class="chip ${a.open_cases ? "amb" : "grey"}">${esc(t("hist.cases", { n: a.cases }))}${a.open_cases ? " · " + esc(t("hist.opencases", { n: a.open_cases })) : ""}</span>` : ""}</div>
            <h2 style="margin-top:8px">${esc(p.bank || "?")}${p.account_last4 ? " ····" + esc(p.account_last4) : ""}${p.holder_name ? " · " + esc(p.holder_name) : ""}</h2>
            <div class="muted mono" style="font-size:.82rem">${esc(a.period.from || "")} → ${esc(a.period.to || "")} · ${a.transactions} lines · ${esc(p.account_type || "")} · ${esc((a.updated_at || a.created_at || "").slice(0, 16).replace("T", " "))}</div>
          </div>
          <div style="text-align:right">
            <div class="amt display" style="font-size:1.7rem;color:var(--green);font-family:var(--head);font-weight:700">${inr(a.total_recoverable)} <span class="muted" style="font-size:.8rem;font-weight:400">${esc(t("hist.found"))}</span></div>
            ${a.recovered ? `<div class="muted" style="font-size:.9rem">${inr(a.recovered)} ${esc(t("hist.recovered"))}</div>` : ""}
            <div class="row" style="justify-content:flex-end;margin-top:8px">
              <button class="btn sm ${cur ? "" : "primary"} h-open" data-id="${esc(a.id)}">${esc(cur ? t("nav.findings") : t("hist.open"))} →</button>
              <button class="btn sm ghost h-del" data-id="${esc(a.id)}" style="color:var(--red)">✕</button>
            </div>
          </div>
        </div>
      </article>`; }).join("")}
    </div>`;
  }
  function bindHistory() {
    $$(".h-open").forEach((b) => (b.onclick = async () => { S.accountId = b.dataset.id; localStorage.setItem("vr.account", S.accountId); S.data = null; S.openWhy = new Set(); await loadAccount(); location.hash = "#/findings"; }));
    $$(".h-del").forEach((b) => (b.onclick = async () => { if (!confirm(t("s.delete") + "?")) return; try { await api(`/accounts/${b.dataset.id}`, { method: "DELETE" }); if (S.accountId === b.dataset.id) { S.accountId = null; S.data = null; S.cases = []; localStorage.removeItem("vr.account"); } toast(t("s.deleted")); route(); } catch (e) { toast(t("err") + e.message); } }));
  }

  // ---- ask ---------------------------------------------------------------
  function screenAsk() {
    return `
    <div class="stack">
      <h1>${esc(t("ask.h"))}</h1>
      <p class="muted">${esc(t("ask.hint"))}</p>
      <div class="chat" id="chat">${S.chat.map((m) => `<div class="msg ${m.me ? "me" : "bot"}">${esc(m.text)}${m.sources?.length ? `<span class="g">RBI: ${m.sources.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title.split(" ")[0])}</a>`).join(" · ")}</span>` : ""}${m.sugg?.length ? `<span class="sugg">${m.sugg.map((x) => `<button class="btn sm ghost sug">${esc(x)}</button>`).join("")}</span>` : ""}${m.kind && m.kind !== "chat" ? `<span class="g">${esc({account: S.lang === "ta" ? "உங்க account-ல இருந்து" : "from your account", knowledge: S.lang === "ta" ? "bank rules-ல இருந்து" : "from banking rules", claim_check: S.lang === "ta" ? "rulebook-ஓட சரிபார்த்தது" : "checked against the rulebook", llm: "assistant", fallback: ""}[m.kind] || "")}</span>` : ""}</div>`).join("") || `<div class="msg bot">${esc(S.lang === "ta" ? "வணக்கம். உங்க account பத்தியோ, bank rules பத்தியோ எதுவும் கேளுங்க." : "Hello. Ask me about your account, a charge, or any banking rule.")}</div>`}</div>
      <form class="askbar" id="askform">
        <button type="button" class="mic" id="mic" aria-label="Speak">🎙</button>
        <input id="q" placeholder="${esc(t("ask.ph"))}" autocomplete="off">
        <button class="btn primary" type="submit">${esc(t("ask.send"))}</button>
      </form>
      <div class="row">${(S.lang === "ta" ? ["என்ன ஆச்சு?", "நான் என்ன பண்ணணும்?", "statement எப்படி download பண்றது?", "SMS-க்கு charge பண்ணலாமா?", "ATM-ல எத்தனை free?", "RBI-ல எப்படி complaint பண்றது?"] : ["what happened?", "what should I do?", "how do I download my statement?", "can the bank charge for SMS?", "how many free ATM transactions?", "how do I complain to the RBI Ombudsman?", "is it true all ATM use is free?"]).map((s) => `<button class="btn sm ghost sug">${esc(s)}</button>`).join("")}</div>
    </div>`;
  }
  function bindAsk() {
    const form = $("#askform"), q = $("#q");
    const send = async (text) => {
      if (!text.trim()) return;
      S.chat.push({ me: true, text }); await route();
      try { const a = await post(S.accountId ? `/accounts/${S.accountId}/ask` : `/ask`, { question: text, lang: S.lang }); S.chat.push({ me: false, text: a.text, g: a.grounded_on, kind: a.kind, sources: a.sources, sugg: a.suggestions }); await route(); speak(a.text.split("\n")[0], a.lang); }
      catch (e) { S.chat.push({ me: false, text: t("err") + e.message }); route(); }
      const chat = $("#chat"); if (chat) chat.scrollTop = chat.scrollHeight;
    };
    form.onsubmit = (e) => { e.preventDefault(); const v = q.value; q.value = ""; send(v); };
    $$(".sug").forEach((b) => (b.onclick = () => send(b.textContent)));
    const mic = $("#mic");
    mic.onclick = () => { mic.classList.add("on"); const r = listen((txt) => { mic.classList.remove("on"); send(txt); }); if (r) r.onend = () => mic.classList.remove("on"); else mic.classList.remove("on"); };
    const chat = $("#chat"); if (chat) chat.scrollTop = chat.scrollHeight;
  }

  // ---- rules -------------------------------------------------------------
  async function screenRules() {
    const rules = await api("/rules");
    const cats = [...new Set(rules.map((r) => r.category))];
    return `<div class="stack"><h1>${esc(t("rules.h"))}</h1><p class="muted">${esc(t("rules.lede"))} <a href="https://github.com/" target="_blank" rel="noopener">rulebook/rules.json</a></p>
      ${cats.map((c) => `<div class="section-title"><h2>${esc(c.replace("_", " "))}</h2><span class="count">${rules.filter((r) => r.category === c).length}</span></div>
        ${rules.filter((r) => r.category === c).map((r) => `<article class="card rule"><div class="pillrow"><span class="chip ${r.status === "active" ? "green" : "amb"}">${esc(r.status)}</span><span class="chip grey mono">${esc(r.id)}</span><span class="chip grey">${esc(r.compensation_type)}</span></div><h3>${esc(r.title)}</h3><p>${esc(S.lang === "ta" ? r.right_ta || r.right_en : r.right_en)}</p><div class="src"><a href="${esc(r.source.url)}" target="_blank" rel="noopener">${esc(r.source.circular)}</a> · ${esc(r.source.date)} · in force ${esc(r.effective_from)}${r.effective_to ? " → " + esc(r.effective_to) : " → present"}</div><div class="src">formula: ${esc(r.formula)}</div></article>`).join("")}`).join("")}
    </div>`;
  }

  // ---- settings ------------------------------------------------------------
  async function screenSettings() {
    const g = S.data?.guardian;
    const n = (S.health = S.health || await api("/health").catch(() => ({}))).notify || {};
    return `<div class="stack"><h1>${esc(t("settings.h"))}</h1>
      <section class="card stack ${n.email ? "soft" : ""}"><h2>${esc(t("n.h"))}</h2>
        <p style="margin:0">${n.email ? "📧 " + esc(t("n.on", { f: n.from })) : esc(t("n.off"))}</p>
        ${n.demo_to ? `<p class="muted" style="margin:0">🔒 ${esc(t("n.demo", { to: n.demo_to }))}</p>` : ""}
        <p class="muted" style="margin:0;font-size:.88rem">${esc(t("n.bank"))} ${n.email ? "" : esc(t("n.how"))}</p>
        ${n.email ? `<div class="row"><input id="testto" placeholder="${esc(n.demo_to || "someone@gmail.com")}" style="max-width:280px"><button class="btn sm" id="testmail">${esc(t("n.test"))}</button></div>` : ""}
      </section>
      <section class="card stack"><h2>${esc(t("g.h"))}</h2><p class="muted">${esc(t("g.lede"))}</p>
        ${S.data ? `<form id="gform" class="grid2">
          <label class="field">${esc(t("g.name"))}<input name="name" value="${esc(g?.name || "")}" placeholder="Kumar"></label>
          <label class="field">${esc(t("g.rel"))}<select name="relation">${["son", "daughter", "husband", "wife", "trusted person"].map((r) => `<option ${g?.relation === r ? "selected" : ""}>${r}</option>`).join("")}</select></label>
          <label class="field">${esc(t("g.phone"))}<input name="phone" value="${esc(g?.phone || "")}" placeholder="+91 98765 43210"></label>
          <label class="field">${esc(t("g.email"))}<input name="email" type="email" value="${esc(g?.email || "")}" placeholder="kumar@gmail.com"></label>
          <label class="field">Language<select name="language"><option value="ta" ${g?.language !== "en" ? "selected" : ""}>தமிழ்</option><option value="en" ${g?.language === "en" ? "selected" : ""}>English</option></select></label>
          <label class="field" style="grid-column:1/-1">${esc(t("g.consent"))}<textarea name="consent" style="min-height:70px;font-family:var(--body)" placeholder="En account-la edhavadhu thappa nadandha, en payyan Kumar-ku solunga.">${esc(g?.consent_note || "")}</textarea></label>
          <div><button class="btn primary" type="submit">${esc(t("g.save"))}</button> ${g?.consent_recorded_at ? `<span class="chip green">consent ${esc(g.consent_recorded_at.slice(0, 10))}</span>` : ""}</div>
        </form>` : `<p class="muted">${esc(t("noacct"))}</p>`}
      </section>
      ${S.data ? `<section class="card stack"><h2>Basic account</h2><p class="muted">${esc(S.lang === "ta" ? "Minimum balance இல்லாத, charge இல்லாத Basic Savings account-க்கு மாத்த உங்களுக்கு உரிமை இருக்கு. 7 நாளுக்குள்ள bank பண்ணணும்." : "You have the right to a zero-charge Basic Savings account with no minimum balance. The bank must convert within 7 days of asking.")}</p><a class="btn" href="/api/accounts/${esc(S.accountId)}/basic-account-letter" target="_blank">${esc(t("s.basic"))}</a></section>
      <section class="card stack"><h2>Privacy</h2><p class="muted">${esc(t("foot.privacy"))}</p><div class="row"><a class="btn sm" href="/api/accounts/${esc(S.accountId)}/audit" target="_blank">Audit log</a><button class="btn sm" id="delete" style="color:var(--red)">${esc(t("s.delete"))}</button></div></section>` : ""}
    </div>`;
  }
  function bindSettings() {
    const tm = $("#testmail");
    if (tm) tm.onclick = async () => { tm.disabled = true; try { const r = await post(`/notify/test`, { to: $("#testto").value }); toast(r.sent ? t("mail.sent", { to: r.to }) : t("mail.sim", { r: r.reason }), 6000); } catch (e) { toast(t("err") + e.message); } tm.disabled = false; };
    const f = $("#gform");
    if (f) f.onsubmit = async (e) => { e.preventDefault(); const el = f.elements; try { await post(`/accounts/${S.accountId}/guardian`, { name: el.name.value, relation: el.relation.value, phone: el.phone.value, email: el.email.value, language: el.language.value, consent_transcript: el.consent.value }); await loadAccount(); toast("✓"); route(); } catch (err) { toast(t("err") + err.message); } };
    const d = $("#delete");
    if (d) d.onclick = async () => { if (!confirm(t("s.delete") + "?")) return; await api(`/accounts/${S.accountId}`, { method: "DELETE" }); S.accountId = null; S.data = null; S.cases = []; localStorage.removeItem("vr.account"); toast(t("s.deleted")); location.hash = "#/"; };
  }

  // ------------------------------------------------------------------ router
  let routing = false;
  async function route() {
    if (routing) { setTimeout(route, 30); return; }
    routing = true;
    clearInterval(S._poll);
    try {
      const hash = (location.hash || "#/").replace(/#statements$/, "");
      const anchor = /#statements$/.test(location.hash);
      $$(".nav a").forEach((a) => a.classList.toggle("active", hash === a.getAttribute("href") || (a.getAttribute("href") === "#/cases" && hash.startsWith("#/case"))));
      const app = $("#app");
      if (!S.data && S.accountId) await loadAccount();
      let html = "", bind = null;
      if (hash === "#/") { html = await screenHome(); bind = bindHome; }
      else if (hash === "#/findings") { if (S.accountId) await loadAccount(); if (!S.samples) S.samples = await api("/samples").catch(() => []); html = screenFindings(); bind = bindFindings; }
      else if (hash.startsWith("#/case/")) { const id = hash.split("/")[2]; html = await screenCase(id); bind = () => bindCase(id); }
      else if (hash === "#/cases") { if (S.accountId) await loadAccount(); html = screenCases(); }
      else if (hash === "#/history") { html = await screenHistory(); bind = bindHistory; }
      else if (hash === "#/ask") { html = screenAsk(); bind = bindAsk; }
      else if (hash === "#/rules") { html = await screenRules(); }
      else if (hash === "#/settings") { html = await screenSettings(); bind = bindSettings; }
      else if (hash.startsWith("#/approve/")) { const tok = hash.split("/")[2]; html = await screenApprove(tok); bind = () => bindApprove(tok); }
      else { html = `<div class="empty">Not found.</div>`; }
      app.innerHTML = html;
      if (bind) bind();
      if (anchor && $("#statements")) $("#statements").scrollIntoView({ behavior: "smooth" }); else window.scrollTo({ top: 0 });
    } catch (e) { $("#app").innerHTML = `<div class="empty">${esc(t("err"))}${esc(e.message)}</div>`; }
    finally { routing = false; }
  }
  window.addEventListener("hashchange", route);
  applyLang();
  api("/health").then((h) => ($("#foot-version").textContent = `v${h.version} · rulebook ${h.rulebook} · ${h.rules} rules`)).catch(() => { });
  if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = () => { };
  route();
})();
