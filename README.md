# Skincare Tracker

A simple, single-page skincare/beard-care routine tracker. No backend, no build step — just HTML, CSS, and vanilla JS.

**Live app:** https://ed-rodz.github.io/skincare-tracker/

## Features

- Morning and evening checklists, each in the order steps should be done
- Tap a step to mark it done; progress is saved automatically
- Each step shows the amount to use and any wait time before the next step
- The evening acid treatment step automatically alternates by calendar date:
  - Odd dates → Azelaic Acid
  - Even dates → Salicylic Acid
- Progress resets automatically each day (stored per-date in `localStorage`, so nothing to manually clear)
- Dark mode: follows system preference by default, with a manual toggle (🌙/☀️) that's remembered between visits

## Routine

**Morning:** Cleanse → Niacinamide → Moisturize → Sunscreen (non-negotiable)

**Evening:** Cleanse → Acid treatment (alternates daily) → Moisturize → Beard oil

## Tech

Plain HTML/CSS/JS, no dependencies, no build step. All state lives in the browser's `localStorage`:

- `skincare-YYYY-MM-DD` — that day's checklist progress
- `skincare-theme` — light/dark preference

## Running locally

Just open `index.html` in a browser — no server required.

## Deployment

Hosted via GitHub Pages, served from the `main` branch. Pushing to `main` redeploys automatically (usually live within about a minute).

## Ideas for v2

- Clear out old daily progress entries from `localStorage` automatically
- Weekly/monthly streak or history view
- Editable routine (add/remove/reorder products without touching code)
- Optional reminders/notifications
