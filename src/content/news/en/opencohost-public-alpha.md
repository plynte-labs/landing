---
title: 'OpenCohost v0.3.0-alpha.4: public alpha available'
description: 'OpenCohost moves to public alpha: Tauri UI (React+TS), local-first voice co-host with Twitch and OBS. Download the Windows installer from GitHub Releases.'
pubDate: 2026-09-10
updatedDate: 2026-09-10
locale: 'en'
author: 'Plynte Labs'
tags: ['OpenCohost', 'alpha', 'release', 'Tauri']
order: 0
heroImage: '/projects/opencohost/opencohost-tauri-kira.webp'
---

OpenCohost now has a **downloadable public alpha**:
[v0.3.0-alpha.4](https://github.com/plynte-labs/OpenCohost/releases/tag/v0.3.0-alpha.4)
with a Windows installer (`OpenCohost-0.3.0-alpha.4-x64-setup.exe`).

## What it is today

A **local-first** voice co-host for streamers: push-to-talk (via LiveAudio),
agenda, per-profile memory, and **OBS** + **Twitch** chat integration. Stack: Python +
Tauri/React + Ollama + optional cloud LLMs + Piper TTS + LiveAudio STT + OBS.

Important clarifications:

- **Local-first, not 100% local flat-out**: Ollama runs on your machine; cloud
  LLMs are optional.
- **Twitch is the default**. YouTube is an opt-in extra (`youtube-chat`) with
  no promised parity.
- **The current UI is Tauri (React+TS)**. The previous CustomTkinter UI is
  frozen and receives no new features.

## Verifiable links

- Repository: [github.com/plynte-labs/OpenCohost](https://github.com/plynte-labs/OpenCohost)
- Download: [v0.3.0-alpha.4](https://github.com/plynte-labs/OpenCohost/releases/tag/v0.3.0-alpha.4)
- Website: [opencohost.com](https://www.opencohost.com)
- License: MIT

This is an alpha: expect bugs and report them as repo issues.
