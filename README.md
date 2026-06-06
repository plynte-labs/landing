# Plynte Labs

[![License](https://img.shields.io/badge/license-MIT-%236FF073)](./LICENSE)
[![Stack](https://img.shields.io/badge/stack-react%2019%20%7C%20vite%206%20%7C%20ts%205.8-%236FF073)](https://plynte.com)

**An open-source software laboratory dedicated to engineering high-performance productivity tooling and localized AI-driven audio infrastructure, tools for artists and streamers under the MIT license.**

---

## 🧬 Ecosystem

| Project | Status | Description |
|---------|--------|-------------|
| [**Brick.draw**](https://github.com/plynte-labs/brick-draw) | 🟢 Live | Interactive low-latency drawing canvas |
| **LiveAudio** | 🔜 Coming soon | Real-time audio ingestion with open-weight Whisper models |
| **OpenCohost** | 🔜 Coming soon | Local voice assistant for streamers (TypeScript + Ollama + Python + Tauri) |

## 🏗️ Architecture

- **Local-First** — Tools run on your machine, not a data center you don't control
- **MIT Licensed** — Fork it, break it, improve it. The code is yours
- **CI/CD Pipelines** — Automated linting, type-checking, and production builds on every commit
- **Hardware Acceleration** — Optimized for consumer hardware, not cloud dependency

## 🤝 Contribute

```
Fork → Branch → PR → Review
```

We use [Conventional Commits](https://www.conventionalcommits.org/). Write clear descriptions, keep PRs focused, and tests are appreciated.

## 🛠️ Tech Stack

React 19 · Vite 6 · TypeScript 5.8 (strict) · CSS3 (design tokens) · framer-motion · react-router v6 · react-helmet-async · pnpm

## 🚀 Dev

```bash
pnpm install
pnpm run dev     # http://localhost:5173
pnpm run build   # tsc -b && vite build
pnpm run lint    # ESLint
```

## 📄 License

MIT © [Plynte Labs](https://github.com/plynte-labs)
