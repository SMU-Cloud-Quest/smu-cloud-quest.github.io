"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const difference = siteConfig.eventDateObj.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Competition Starts In
        </h2>
        <div className="flex justify-center gap-4 md:gap-8">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 md:p-6 min-w-[70px] md:min-w-[100px]">
                <span className="text-3xl md:text-5xl font-bold">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-sm md:text-base mt-2 block text-white/80 uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
