"""Guardian (காப்பாளர்) — the human layer.

Two messages, in this order, always:
  1. a short voice call to the account holder, in their language
  2. a minimum-information message to the guardian with one action

Nothing is filed until a human taps. The guardian never sees balances,
salary, or other transactions — only: an issue exists, the amount, the rule,
approve or not.

Channel adapters are pluggable. The default `ConsoleChannel` prints; a
`TwilioChannel` would implement the same two methods with real calls/WhatsApp.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol

from .models import Case, Finding, Guardian
from .rules.base import inr


@dataclass
class VoiceScript:
    language: str
    text: str
    ivr_options: dict[str, str]


@dataclass
class GuardianMessage:
    to: str
    text: str
    approve_token: str


def holder_voice_script(amount: float, guardian: Guardian | None, lang: str = "ta") -> VoiceScript:
    gname = guardian.name if guardian else None
    if lang == "ta":
        if gname:
            text = (f"வணக்கம். Vasool Raja பேசுறோம். உங்க bank account-ல {inr(amount)} தப்பா cut ஆயிருக்கலாம்-னு கண்டுபிடிச்சிருக்கோம். "
                    f"இதை திரும்ப வாங்க {gname}-க்கு சொல்லியிருக்கோம். {gname}-கிட்ட பேச 1-ஐ அழுத்துங்க. இதை விட்டுடலாம்-னா 2-ஐ அழுத்துங்க.")
            opts = {"1": f"call_guardian:{guardian.phone}", "2": "dismiss"}
        else:
            text = (f"வணக்கம். Vasool Raja பேசுறோம். உங்க bank account-ல {inr(amount)} தப்பா cut ஆயிருக்கலாம். "
                    f"அருகில் உள்ள உதவி மையத்தை தெரிஞ்சுக்க 2-ஐ அழுத்துங்க. திரும்ப கேக்க 3-ஐ அழுத்துங்க.")
            opts = {"2": "nearest_help_centre", "3": "repeat"}
    else:
        if gname:
            text = (f"Hello. This is Vasool Raja. We found {inr(amount)} that may have been wrongly taken from your bank account. "
                    f"We have told {gname}, who can get it back for you. Press 1 to speak to {gname}. Press 2 to ignore this.")
            opts = {"1": f"call_guardian:{guardian.phone}", "2": "dismiss"}
        else:
            text = (f"Hello. This is Vasool Raja. We found {inr(amount)} that may have been wrongly taken from your bank account. "
                    f"Press 2 to hear the nearest help centre. Press 3 to hear this again.")
            opts = {"2": "nearest_help_centre", "3": "repeat"}
    return VoiceScript(language=lang, text=text, ivr_options=opts)


def guardian_message(case: Case, findings: list[Finding], guardian: Guardian, holder_name: str, approve_token: str, lang: str = "ta") -> GuardianMessage:
    rules = ", ".join(sorted({f.rule_id for f in findings if f.id in case.finding_ids}))
    who = holder_name or "the account holder"
    if lang == "ta":
        text = (f"Vasool Raja: {who}-ஓட bank account-ல ஒரு பிரச்சனை. {inr(case.amount)} திரும்ப வாங்கலாம். "
                f"RBI rule: {rules}. Complaint தயார்; ஆதாரம் attach ஆயிருக்கு. அனுப்ப OK சொல்லுங்க: {approve_token}. "
                f"(நாங்க {who}-க்கு முதல்ல phone பண்ணி சொல்லிட்டோம். Balance, செலவு விவரம் எதுவும் இதுல இல்ல.)")
    else:
        text = (f"Vasool Raja: a banking issue on {who}'s account. {inr(case.amount)} may be recoverable. "
                f"RBI rule: {rules}. Complaint prepared, evidence attached. Reply OK to send: {approve_token}. "
                f"({who} has been called first. No balance or spending details are included in this message.)")
    return GuardianMessage(to=guardian.phone, text=text, approve_token=approve_token)


class Channel(Protocol):
    def call(self, to: str, script: VoiceScript) -> str: ...
    def message(self, msg: GuardianMessage) -> str: ...


class ConsoleChannel:
    """Default adapter: logs instead of dialling. Swap for Twilio/Exotel in production."""

    def __init__(self):
        self.log: list[dict] = []

    def call(self, to: str, script: VoiceScript) -> str:
        entry = {"kind": "voice", "to": to, "lang": script.language, "text": script.text, "options": script.ivr_options, "at": datetime.now().isoformat(timespec="seconds")}
        self.log.append(entry)
        return f"voice:{len(self.log)}"

    def message(self, msg: GuardianMessage) -> str:
        entry = {"kind": "whatsapp", "to": msg.to, "text": msg.text, "at": datetime.now().isoformat(timespec="seconds")}
        self.log.append(entry)
        return f"msg:{len(self.log)}"


def record_consent(guardian: Guardian, transcript: str) -> Guardian:
    guardian.consent_recorded_at = datetime.now()
    guardian.consent_note = transcript
    return guardian
