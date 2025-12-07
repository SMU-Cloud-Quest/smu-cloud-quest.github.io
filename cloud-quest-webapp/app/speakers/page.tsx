import { Metadata } from "next";
import { SpeakerCard } from "@/components/cards/speaker-card";
import { speakers } from "@/lib/data/speakers";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet the AWS professionals and industry experts presenting at SMU Cloud Quest.",
};

export default function SpeakersPage() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Speakers</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Learn from AWS experts and industry professionals who will share
            their knowledge and experience during our workshops and sessions.
          </p>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>

        {/* More Speakers Coming */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            More speakers will be announced soon. Stay tuned!
          </p>
        </div>
      </section>
    </div>
  );
}
