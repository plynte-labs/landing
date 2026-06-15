---
title: 'LiveAudio is ready to try'
description: 'LiveAudio v1.1.0 is released: real-time subtitles with Whisper, 100% local, wired into OBS. Download it and give it a spin.'
pubDate: 2026-06-15
locale: 'en'
author: 'Plynte Labs'
tags: ['release', 'liveaudio']
order: 2
---

**LiveAudio** is deployed and ready to try. **v1.1.0** is published on GitHub
Releases, with installers for Windows and Linux.

LiveAudio is real-time automatic speech recognition (ASR) for content creators:
it captures audio from your microphone or system, transcribes it locally with
Whisper, and sends subtitles to OBS Studio over WebSocket. **100% local
processing — nothing is sent to the cloud.**

## What's inside

- Real-time transcription with multiple Whisper sizes (tiny, base, small,
  turbo).
- Voice activity detection to drop silence.
- Flexible capture from a physical mic or system loopback.
- OBS Studio integration via WebSocket.
- Hallucination filtering with customizable blacklists.
- Sessions saved as `.jsonl` and subtitles as `.vtt`.
- Hot-swap device and model switching, no restart needed.

Built in Python with faster-whisper and PyTorch (CPU or CUDA), under the MIT
license.

## Try it

Grab the installer from
[GitHub Releases](https://github.com/plynte-labs/LiveAudio/releases) (`.exe` for
Windows, `.tar.gz` for Linux), or check out the code at
[github.com/plynte-labs/LiveAudio](https://github.com/plynte-labs/LiveAudio).
