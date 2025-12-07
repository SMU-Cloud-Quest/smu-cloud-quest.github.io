import { Metadata } from "next";
import { SponsorCard } from "@/components/cards/sponsor-card";
import { sponsors } from "@/lib/data/sponsors";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Sponsors",
  description: "Sponsor SMU Cloud Quest.",
};

export default function SponsorsPage() {
  // Group sponsors by tier
  const titleSponsors = sponsors.filter((s) => s.tier === "title");
  const associationSponsors = sponsors.filter((s) => s.tier === "association");
  const acknowledgmentSponsors = sponsors.filter((s) => s.tier === "acknowledgment");

  return (
    <div className="py-12">
      {/* Sponsors Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Sponsors</h1>
            <div className="w-16 h-1 bg-brand-red mt-2 mb-8" />

            {/* Title Sponsor */}
            {titleSponsors.length > 0 && (
              <div className="mb-12">
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-6">
                  Title sponsor
                </h2>
                <div className="flex justify-center">
                  <div className="w-full max-w-2xl">
                    {titleSponsors.map((sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} size="lg" showBadge={false} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* In Association With */}
            {associationSponsors.length > 0 && (
              <div className="mb-12">
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-6">
                  In association with
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {associationSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} size="md" />
                  ))}
                </div>
              </div>
            )}

            {/* Acknowledgment Section */}
            {acknowledgmentSponsors.length > 0 && (
              <div className="mb-12">
                <p className="text-lg text-muted-foreground mb-6">
                  Our event wouldn&apos;t have been possible without the valuable contribution from:
                </p>
                <div className="flex justify-center">
                  <div className="w-full max-w-xl">
                    {acknowledgmentSponsors.map((sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} size="md" showBadge={false} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl md:text-2xl font-light tracking-wider mb-6">
                  Looking for sponsorship opportunities at SMU Cloud Quest?
                </h3>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-muted-foreground">
                    Drop us an e-mail and let&apos;s talk!
                  </p>
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-brand-red" />
                    <a
                      href="mailto:smucloudquest@gmail.com"
                      className="text-lg text-muted-foreground hover:text-brand-blue transition-colors"
                    >
                      smucloudquest@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
