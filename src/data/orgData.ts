import type { Project, Pillar } from '../types';

export type { Project, Pillar };

export const projects: Project[] = [
  {
    key: 'brick-draw',
    name: 'Brick Draw',
    description: 'A drawing app built with TypeScript, Canvas, and React',
    github: 'https://github.com/plynte-labs/brick-draw',
    status: 'live',
    tech: ['TypeScript', 'Canvas', 'React'],
  },
  {
    key: 'liveaudio',
    name: 'LiveAudio',
    description: 'Local real-time ASR subtitles with Whisper, Python, OBS, and WebSocket integration',
    github: 'https://github.com/plynte-labs/LiveAudio',
    status: 'live',
    tech: ['Whisper', 'Python', 'Real-time'],
  },
  {
    key: 'opencohost',
    name: 'OpenCohost',
    description: 'A voice AI platform for streamers built with Python, Ollama, and real-time processing — runs entirely on your machine.',
    status: 'coming-soon',
    tech: ['Python', 'Ollama', 'Real-time', 'YouTube/Twitch'],
    website: 'https://www.opencohost.com',
  },
];

export const pillars: Pillar[] = [
  {
    key: 'local-first',
    icon: '💻',
    title: 'Local First',
    description: 'Everything runs on your machine. No cloud dependency, no latency, full privacy.',
  },
  {
    key: 'mit-license',
    icon: '📜',
    title: 'MIT License',
    description: 'All our projects are open source under the MIT license. Use them, fork them, build with them.',
  },
  {
    key: 'ci-cd',
    icon: '🔄',
    title: 'CI/CD',
    description: 'Release-ready projects use automated checks for linting, testing, building, and delivery before public promotion.',
  },
  {
    key: 'hardware-acceleration',
    icon: '⚡',
    title: 'Hardware Acceleration',
    description: 'Leveraging GPU and local AI hardware for maximum performance.',
  },
];
