import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { mainNavItems, registerNavItem } from "@/lib/config/navigation";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logos/Logo_icon.png"
            alt="SMU Cloud Quest"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="hidden font-semibold text-lg sm:inline-block">
            SMU<span className="text-brand-blue">x</span>AWS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLinks items={mainNavItems} />
          <Button asChild className="ml-2 bg-brand-blue hover:bg-brand-blue-dark">
            <Link href={registerNavItem.href}>{registerNavItem.title}</Link>
          </Button>
          <div className="ml-2">
            <Suspense fallback={<div className="w-20 h-8" />}>
              <AuthButton />
            </Suspense>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}
