# Changelog

Plain-English record of what's shipped. For exact code diffs, see `git log` or the [commit history on GitHub](https://github.com/Ed-Rodz/skincare-tracker/commits/main).

## 2026-07-17 — Day streak tracking
Tracks consecutive days where every AM and PM step was checked off. Shows a 🔥 counter in the header once a full day is completed. Resets if a day is missed.

## 2026-07-16 — README and repo cleanup
Added README (routine overview, tech notes, v2 ideas) and `.gitignore`. Switched commit identity to GitHub's noreply email to keep the real address out of public commit history.

## 2026-07-16 — Deployed to GitHub Pages
Published the app publicly at https://ed-rodz.github.io/skincare-tracker/, installable to a phone home screen.

## 2026-07-16 — Dark mode
Added a light/dark theme toggle (🌙/☀️) in the header. Defaults to system preference on first visit, remembers manual choice afterward.

## 2026-07-16 — Product amounts and wait times
Added amount-to-use and wait-time instructions under each step (e.g. "dime-to-nickel size," "wait 10–15 min before moisturizer"), matching the reference routine cards.

## 2026-07-16 — Initial v1
First working version: AM/PM checklists in order, tap-to-check steps, PM acid treatment auto-alternates Azelaic (odd dates) / Salicylic (even dates), daily progress saved via localStorage.
