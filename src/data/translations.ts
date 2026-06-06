// src/data/translations.ts
export const translations: Record<string, Record<string, unknown>> = {
  es: {
    banner: {
      text: "↗ Portfolio de FranGuh → franguh.plynte.com",
    },
    navbar: {
      inicio: "Inicio",
      proyectos: "Proyectos",
      contribuir: "Contribuir",
      langToggle: "EN",
      maintainer: "por FranGuh",
    },
    hero: {
      tagline:
        "Un laboratorio de software open-source dedicado a crear herramientas de productividad de alto rendimiento e infraestructura de audio local impulsada por IA, para artistas y streamers bajo licencia MIT.",
      subtagline: "Forgeá, creá, compartí. Sin ataduras.",
      cta: "Explorar Proyectos",
      mitBadge: "MIT Licensed",
    },
    ecosystem: {
      heading: "Nuestros Proyectos",
      "brick-draw": {
        name: "Brick Draw",
        desc: "Aplicación de dibujo de alto rendimiento construida con TypeScript, Canvas y React. Diseñada para artistas y streamers que necesitan herramientas rápidas y sin fricción.",
      },
      liveaudio: {
        name: "LiveAudio",
        desc: "Procesamiento de audio en tiempo real con Whisper, Python e integración OBS. Infraestructura de audio local impulsada por IA para streaming en vivo.",
      },
      opencohost: {
        name: "OpenCohost",
        desc: "Asistente de voz local para streamers construido con TypeScript, Ollama, Python y Tauri. Procesamiento de lenguaje natural 100% local.",
      },
      comingSoon: "Próximamente",
      viewOnGithub: "Ver en GitHub",
    },
    architecture: {
      heading: "Cómo Construimos",
      "local-first": {
        title: "Local First",
        desc: "Todo corre en tu máquina. Sin dependencia de la nube, sin latencia, privacidad total.",
      },
      "mit-license": {
        title: "Licencia MIT",
        desc: "Todos nuestros proyectos son open source bajo licencia MIT. Usalos, forkearlos, construí con ellos.",
      },
      "ci-cd": {
        title: "CI/CD",
        desc: "Pruebas automatizadas, builds y pipelines de despliegue para cada proyecto.",
      },
      "hardware-acceleration": {
        title: "Aceleración por Hardware",
        desc: "Aprovechando GPU y hardware de IA local para máximo rendimiento.",
      },
    },
    contribute: {
      heading: "Contribuí",
      step1: "Hacé fork del repositorio en GitHub",
      step2: "Creá una rama con tu feature o fix",
      step3: "Abrí un Pull Request con conventional commits",
      step4: "El equipo revisa, discute y mergea",
      codeExample: "feat(opencohost): add streaming response buffer",
      githubLink: "Explorá nuestros repositorios en GitHub",
    },
    mission: {
      heading: "Nuestra Misión",
      statement:
        "Creemos en el software open-source como motor de innovación. Cada línea de código que publicamos bajo licencia MIT es una invitación a construir juntos, sin barreras ni letras chicas. Nuestro compromiso es con la comunidad: herramientas libres, documentación clara y un ecosistema donde cualquiera pueda aprender, contribuir y crear.",
      mitNotice:
        "Todos nuestros proyectos están publicados bajo la licencia MIT. Usalos, modificalos, compartilos.",
      maintainer: {
        name: "Gustavo Francisco (FranGuh)",
        role: "Mantenedor Principal & Ingeniero de Software",
        github: "https://github.com/FranGuh",
      },
    },
    footer: {
      builtWith: "Construido con React + Vite + TypeScript",
      license: "Licencia MIT",
      orgLink: "Plynte Labs en GitHub",
    },
    seo: {
      title: "Plynte Labs — Open-Source Software Laboratory",
      description:
        "An open-source software laboratory dedicated to engineering high-performance productivity tooling and localized AI-driven audio infrastructure under the MIT license.",
    },
    notFound: {
      title: "Página no encontrada",
      description:
        "Esta ruta no existe. ¿Quizás quisiste ir a nuestro GitHub?",
      btnGithub: "Ir a GitHub",
    },
  },
  en: {
    banner: {
      text: "↗ FranGuh's Portfolio → franguh.plynte.com",
    },
    navbar: {
      inicio: "Home",
      proyectos: "Projects",
      contribuir: "Contribute",
      langToggle: "ES",
      maintainer: "by FranGuh",
    },
    hero: {
      tagline:
        "An open-source software laboratory dedicated to engineering high-performance productivity tooling and localized AI-driven audio infrastructure, tools for artists and streamers under the MIT license.",
      subtagline: "Forge, create, share. No strings attached.",
      cta: "Explore Projects",
      mitBadge: "MIT Licensed",
    },
    ecosystem: {
      heading: "Our Projects",
      "brick-draw": {
        name: "Brick Draw",
        desc: "High-performance drawing app built with TypeScript, Canvas, and React. Designed for artists and streamers who need fast, frictionless tools.",
      },
      liveaudio: {
        name: "LiveAudio",
        desc: "Real-time audio processing with Whisper, Python, and OBS integration. Local AI-driven audio infrastructure for live streaming.",
      },
      opencohost: {
        name: "OpenCohost",
        desc: "Local voice assistant for streamers built with TypeScript, Ollama, Python, and Tauri. 100% local natural language processing.",
      },
      comingSoon: "Coming Soon",
      viewOnGithub: "View on GitHub",
    },
    architecture: {
      heading: "How We Build",
      "local-first": {
        title: "Local First",
        desc: "Everything runs on your machine. No cloud dependency, no latency, full privacy.",
      },
      "mit-license": {
        title: "MIT License",
        desc: "All our projects are open source under the MIT license. Use them, fork them, build with them.",
      },
      "ci-cd": {
        title: "CI/CD",
        desc: "Automated testing, building, and deployment pipelines for every project.",
      },
      "hardware-acceleration": {
        title: "Hardware Acceleration",
        desc: "Leveraging GPU and local AI hardware for maximum performance.",
      },
    },
    contribute: {
      heading: "Contribute",
      step1: "Fork the repository on GitHub",
      step2: "Create a branch for your feature or fix",
      step3: "Open a Pull Request with conventional commits",
      step4: "The team reviews, discusses, and merges",
      codeExample: "feat(opencohost): add streaming response buffer",
      githubLink: "Explore our repositories on GitHub",
    },
    mission: {
      heading: "Our Mission",
      statement:
        "We believe in open-source software as an engine for innovation. Every line of code we publish under the MIT license is an invitation to build together, without barriers or fine print. Our commitment is to the community: free tools, clear documentation, and an ecosystem where anyone can learn, contribute, and create.",
      mitNotice:
        "All our projects are published under the MIT license. Use them, modify them, share them.",
      maintainer: {
        name: "Gustavo Francisco (FranGuh)",
        role: "Lead Maintainer & Software Engineer",
        github: "https://github.com/FranGuh",
      },
    },
    footer: {
      builtWith: "Built with React + Vite + TypeScript",
      license: "MIT License",
      orgLink: "Plynte Labs on GitHub",
    },
    seo: {
      title: "Plynte Labs — Open-Source Software Laboratory",
      description:
        "An open-source software laboratory dedicated to engineering high-performance productivity tooling and localized AI-driven audio infrastructure under the MIT license.",
    },
    notFound: {
      title: "Page not found",
      description:
        "This route doesn't exist. Maybe you meant to visit our GitHub?",
      btnGithub: "Go to GitHub",
    },
  },
};
