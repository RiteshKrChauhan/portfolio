export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/RiteshKrChauhan", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/riteshkumarchauhan", icon: "linkedin" },
  { label: "Email", href: "mailto:riteshkumarchauhan9@gmail.com", icon: "mail" },
];
