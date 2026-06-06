export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Project {
    key: string;
    name: string;
    description: string;
    github?: string;
    website?: string;
    status: 'live' | 'coming-soon';
    tech: string[];
}

export interface Pillar {
    key: string;
    icon: string;
    title: string;
    description: string;
}
