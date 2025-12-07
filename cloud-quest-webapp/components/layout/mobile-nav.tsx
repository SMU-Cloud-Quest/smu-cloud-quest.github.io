"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems, registerNavItem } from "@/lib/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Toggle menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Image
              src="/images/logos/Logo_icon.png"
              alt="SMU Cloud Quest"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span>
              SMU<span className="text-brand-blue">x</span>AWS
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-brand-blue",
                pathname === item.href
                  ? "bg-accent text-brand-blue"
                  : "text-foreground/80"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Button
            asChild
            className="mt-4 w-full bg-brand-blue hover:bg-brand-blue-dark"
          >
            <Link href={registerNavItem.href} onClick={() => setOpen(false)}>
              {registerNavItem.title}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
