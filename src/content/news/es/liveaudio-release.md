---
title: 'LiveAudio ya está disponible para probar'
description: 'LiveAudio v1.1.0 ya tiene release: subtítulos en tiempo real con Whisper, 100% local, integrados a OBS. Descargalo y probalo.'
pubDate: 2026-06-15
locale: 'es'
author: 'Plynte Labs'
tags: ['lanzamiento', 'liveaudio']
order: 2
---

**LiveAudio** ya está deployado y listo para probar. La **v1.1.0** está
publicada en GitHub Releases, con instaladores para Windows y Linux.

LiveAudio es reconocimiento de voz (ASR) en tiempo real para creadores de
contenido: captura el audio de tu micrófono o del sistema, lo transcribe
localmente con Whisper y envía los subtítulos a OBS Studio por WebSocket.
**Procesamiento 100% local — nada se manda a la nube.**

## Qué incluye

- Transcripción en tiempo real con varios tamaños de Whisper (tiny, base,
  small, turbo).
- Detección de actividad de voz para descartar los silencios.
- Captura flexible desde micrófono físico o loopback del sistema.
- Integración con OBS Studio vía WebSocket.
- Filtrado de alucinaciones con blacklists personalizables.
- Sesiones guardadas como `.jsonl` y subtítulos como `.vtt`.
- Cambio de dispositivo y modelo en caliente, sin reiniciar.

Construido en Python con faster-whisper y PyTorch (CPU o CUDA), bajo licencia
MIT.

## Probalo

Descargá el instalador desde
[GitHub Releases](https://github.com/plynte-labs/LiveAudio/releases) (`.exe`
para Windows, `.tar.gz` para Linux) o mirá el código en
[github.com/plynte-labs/LiveAudio](https://github.com/plynte-labs/LiveAudio).
