"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/bg-home-1.jpg"
          alt="SMU Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center text-white">
        <div className="animate-fade-in space-y-6">
          {/* SMU Title */}
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold tracking-wide text-white drop-shadow-lg">
            SMU
          </h1>

          {/* AWS Cloud Quest Title */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase">
              AWS Cloud Quest
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider uppercase text-brand-blue">
              Competition
            </h3>
          </div>

          {/* Date */}
          <div className="space-y-2 pt-4">
            <p className="text-lg md:text-xl font-medium">
              Starting {siteConfig.eventDate}
            </p>
            <p className="text-base md:text-lg text-gray-300">
              Hosted by Southern Methodist University
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              asChild
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:scale-105"
            >
              <Link href="/register">Register Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-white text-gray-900 hover:bg-white/90 hover:text-gray-900 px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
            >
              <Link href="/calendar">View Schedule</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
