import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import Link from "next/link";

export function VenueBanner() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3 text-center">
          {/* Date & Time */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue/10">
              <Calendar className="h-7 w-7 text-brand-blue" />
            </div>
            <h3 className="text-lg font-semibold">Date & Time</h3>
            <p className="text-muted-foreground">
              One Week Starting
              <br />
              <span className="font-semibold text-foreground">
                {siteConfig.eventDate}
              </span>
            </p>
          </div>

          {/* Venue */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue/10">
              <MapPin className="h-7 w-7 text-brand-blue" />
            </div>
            <h3 className="text-lg font-semibold">Venue</h3>
            <p className="text-muted-foreground">
              Southern Methodist University,
              <br />
              Dallas, TX 75205
            </p>
            <a
              href="https://maps.google.com/?q=Southern+Methodist+University+Dallas+TX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-brand-blue hover:underline"
            >
              View location on map
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue/10">
              <ExternalLink className="h-7 w-7 text-brand-blue" />
            </div>
            <h3 className="text-lg font-semibold">Full Schedule</h3>
            <p className="text-muted-foreground">
              View the complete event
              <br />
              calendar and workshops
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/calendar">Check Schedule</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
