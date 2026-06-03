export interface NavigationItem {
  label: string;
  translationKey?: string;
  href: string;
}

export const NAV_ITEMS: NavigationItem[] = [
  {
    label: "INICIO",
    translationKey: "navbar.inicio",
    href: "#hero",
  },
  {
    label: "PROYECTOS",
    translationKey: "navbar.proyectos",
    href: "#ecosystem",
  },
  {
    label: "CONTRIBUIR",
    translationKey: "navbar.contribuir",
    href: "#contribute",
  },
];
