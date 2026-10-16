# NextXus Library Pillar — Sovereign Knowledge Archive

The Federation's library and knowledge archive, live at nextxus.org. Podcast episodes with full transcripts (CERN to Codex and more), a document upload desk, and the Sovereign Library collection.

This repo holds the static frontend. A Python/FastAPI backend (in `backend/`) powers the upload intake and episode services.

## Live

https://nextxus.org

## What's here

- **index.html** — the Library Pillar: episode listings, transcripts, upload desk
- **backend/** — FastAPI backend (upload intake, episode services)
- **static/** — static assets
- **SOURCES.md** — backup source archive links

## Content

- **CERN to Codex** — 8-episode podcast season with full transcripts (Standard Model anomalies, quantum architecture, the fifth force)
- **Upload Desk** — document intake for the knowledge collection
- **Knowledge Collection** — Season 01 and growing

## For builders

Frontend is static HTML — edit directly. Backend deploys to Render.com as a Python service. Keep episode transcripts alongside their audio; the page structure mirrors the transcript files.

---

Part of the [NextXus Federation](https://keywebco.github.io).
