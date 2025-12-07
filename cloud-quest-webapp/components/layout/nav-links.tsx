"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/lib/config/navigation";

interface NavLinksProps {
  items: NavItem[];
}

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors hover:text-brand-blue",
            pathname === item.href ? "text-brand-blue" : "text-foreground/80"
          )}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}
