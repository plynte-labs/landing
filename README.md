# Plynte Labs

[![License: MIT](https://img.shields.io/badge/License-MIT-6FF073.svg)](LICENSE)
[![CI](https://github.com/plynte-labs/landing/actions/workflows/ci.yml/badge.svg)](https://github.com/plynte-labs/landing/actions/workflows/ci.yml)
[![Stack](https://img.shields.io/badge/stack-react%2019%20%7C%20vite%206%20%7C%20ts%205.8-6FF073)](https://plynte.com)

Plynte Labs is an open-source software laboratory focused on high-performance productivity tools and local-first AI audio infrastructure for artists, streamers, and builders.

Plynte Labs es un laboratorio de software open-source enfocado en herramientas de productividad de alto rendimiento e infraestructura de audio local-first impulsada por IA para artistas, streamers y builders.

## Ecosystem

| Project | Status | Description |
|---------|--------|-------------|
| [Brick Draw](https://github.com/plynte-labs/brick-draw) | Live | Lightweight drawing canvas for desktop creative workflows. |
| [LiveAudio](https://github.com/plynte-labs/LiveAudio) | Live | Local real-time ASR subtitles powered by Whisper, with OBS/WebSocket integration. |
| OpenCohost | Coming soon | Local voice assistant for streamers using Python, Ollama, and YouTube/Twitch integrations. |

## Engineering baseline

| Area | Standard |
|------|----------|
| Branching | Use each repository's configured default branch. Avoid branch renames unless the migration cost is justified. |
| License | MIT for public open-source projects unless a repo explicitly says otherwise. |
| Commits | Conventional Commits. |
| CI | Security checks run before install/lint/build. Public release-ready repositories should scan for secrets and local-only paths before merge or release. |
| Docs | README, license, contributing, security, and support docs should be present before a repo is promoted. |
| Language | Public organization docs are bilingual: English and Spanish. |

## Local development

```bash
pnpm install
pnpm run dev     # http://localhost:5173
pnpm run lint    # ESLint
pnpm run build   # TypeScript + Vite production build
```

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Keep pull requests focused, explain the user-facing impact, and include verification notes.

## Security

Please report security issues privately. See [SECURITY.md](SECURITY.md).

## License

MIT © [Plynte Labs](https://github.com/plynte-labs)
