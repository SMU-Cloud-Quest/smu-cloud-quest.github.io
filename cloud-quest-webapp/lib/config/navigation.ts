export interface NavItem {
  title: string;
  href: string;
  isExternal?: boolean;
  isPrimary?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Speakers",
    href: "/speakers",
  },
  {
    title: "Our Team",
    href: "/our-team",
  },
  {
    title: "Calendar",
    href: "/calendar",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const registerNavItem: NavItem = {
  title: "Register",
  href: "/register",
  isPrimary: true,
};
