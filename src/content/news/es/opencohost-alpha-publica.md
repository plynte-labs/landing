---
title: 'OpenCohost v0.3.0-alpha.4: alpha pública disponible'
description: 'OpenCohost pasa a alpha pública: UI Tauri (React+TS), co-host de voz local-first con Twitch y OBS. Descarga el instalador Windows desde GitHub Releases.'
pubDate: 2026-09-10
updatedDate: 2026-09-10
locale: 'es'
author: 'Plynte Labs'
tags: ['OpenCohost', 'alpha', 'release', 'Tauri']
order: 0
heroImage: '/projects/opencohost/opencohost-tauri-kira.webp'
---

OpenCohost ya tiene **alpha pública descargable**: la
[v0.3.0-alpha.4](https://github.com/plynte-labs/OpenCohost/releases/tag/v0.3.0-alpha.4)
con instalador Windows (`OpenCohost-0.3.0-alpha.4-x64-setup.exe`).

## Qué es hoy

Co-host de voz **local-first** para streamers: push-to-talk (usando LiveAudio),
agenda, memoria por perfiles e integración con **OBS** y chat de **Twitch**. Stack: Python +
Tauri/React + Ollama + LLMs cloud opcionales + Piper TTS + LiveAudio STT + OBS.

Aclaraciones importantes:

- **Local-first, no 100% local a secas**: Ollama corre en tu máquina; hay LLMs
  cloud opcionales.
- **Twitch es el default**. YouTube es extra opt-in (`youtube-chat`), sin
  paridad prometida.
- **La UI actual es Tauri (React+TS)**. La UI CustomTkinter anterior está
  congelada y no recibe funciones nuevas.

## Enlaces verificables

- Repositorio: [github.com/plynte-labs/OpenCohost](https://github.com/plynte-labs/OpenCohost)
- Descarga: [v0.3.0-alpha.4](https://github.com/plynte-labs/OpenCohost/releases/tag/v0.3.0-alpha.4)
- Sitio: [opencohost.com](https://www.opencohost.com)
- Licencia: MIT

Es una alpha: esperá errores y reportalos como issues en el repo.
