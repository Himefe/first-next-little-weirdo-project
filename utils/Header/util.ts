type NavLinks = {
  label: string;
  path: string[];
};

export const navLinks: NavLinks[] = [
  { label: "Home", path: ["/"] },
  { label: "Sobre", path: ["/sobre", "/sobre/[id]"] },
  { label: "Blog", path: ["/blog"] },
  { label: "Exemplo", path: ["/exemplo"] },
];
