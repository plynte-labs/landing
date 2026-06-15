export interface NavigationItem {
  translationKey: string;
  hash: string;
}

// In-page section anchors on the landing. Navbar prefixes them with the
// locale's home base so they work from any route.
export const NAV_ITEMS: NavigationItem[] = [
  { translationKey: 'navbar.inicio', hash: '#hero' },
  { translationKey: 'navbar.proyectos', hash: '#ecosystem' },
  { translationKey: 'navbar.contribuir', hash: '#contribute' },
];
