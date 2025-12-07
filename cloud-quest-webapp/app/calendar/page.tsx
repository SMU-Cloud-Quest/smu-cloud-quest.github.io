import { Metadata } from "next";
import { scheduleItems } from "@/lib/data/schedule";
import { CalendarViews } from "@/components/calendar/calendar-views";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "View the complete schedule of events, workshops, and ceremonies for SMU Cloud Quest.",
};

export default function CalendarPage() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Calendar
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            A full week of workshops, networking, and cloud computing
            challenges. Mark your calendars and don&apos;t miss out!
          </p>
        </div>
      </section>

      {/* Schedule with Tabs */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <CalendarViews items={scheduleItems} />
      </section>

      {/* Note */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-muted-foreground">
            * Schedule is subject to change. Check back regularly for updates.
          </p>
        </div>
      </section>
    </div>
  );
}
