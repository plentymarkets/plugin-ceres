---
name: misconfig-postmortem
description: >
  Writes a post-mortem doc after a misconfiguration is identified and confirmed
  in conversation with the user. Trigger proactively — do not wait to be asked —
  the moment both Claude and the user agree that something was a misconfiguration
  (not a code bug, not a one-off user error): e.g. "yeah that was misconfigured",
  "that's the bug, the config was wrong", "so support just needs to fix that
  setting". Do NOT trigger for plain code bugs, typos fixed in a single edit, or
  anything without a config/setting root cause. Offer once; only write the file
  after the user confirms.
---

# Misconfiguration Post-Mortem

Purpose: capture a misconfiguration found during this conversation so future
supporters recognize the symptom and know the fix, without re-diagnosing from
scratch.

## When to fire

Fire once, right after both the user and you have independently landed on
"this was a misconfiguration" — not when you merely suspect one. Look for
either side stating the root cause is a wrong setting/config value/flag,
not application code.

Do not fire for:
- Pure code bugs (wrong logic, missing null check, etc.) — those belong in a
  commit message / changelog, not a post-mortem.
- Anything still unconfirmed ("might be a config issue") — wait for
  confirmation first.

When it fires, ask one short question: "Want me to write a post-mortem for
this misconfiguration?" Do not write the file before the user says yes.

## What to do

1. Reconstruct from the conversation (do not ask the user to repeat what's
   already been said):
   - What the symptom looked like (error message, broken behavior).
   - The actual misconfigured setting/value — file, key, and wrong vs. correct
     value.
   - How it was found (which log, which config file, which check).
   - The fix applied (or the fix to apply, if not yet applied).
   - Blast radius — what broke, what didn't.
2. Fill in `TEMPLATE.md` (in this skill directory) with those facts. Leave no
   placeholder text (`TODO`, `<...>`) in the final file — if a field is
   genuinely unknown, write "unknown" explicitly rather than deleting the
   heading.
3. Slug the filename from the misconfigured component + symptom, lowercase,
   hyphenated: `postmortems/YYYY-MM-DD-short-slug.md`. Use today's date. Create
   the `postmortems/` directory at the repo root if it doesn't exist yet.
4. Write the file with Write tool. Do not create any other summary doc.
5. Tell the user the file path in one line. Do not restate the contents back
   to them — they can read the file.

## Filling the template well

The "Watch out for" section is the one supporters actually scan during a
future incident — write it as symptom → check → fix, not prose. Assume the
reader is mid-incident and has 30 seconds.

Keep the whole doc under ~1 page. This is a support lookup reference, not an
incident report for stakeholders — skip sections like timeline-with-timestamps
or who-was-paged unless the user explicitly gives that detail.
