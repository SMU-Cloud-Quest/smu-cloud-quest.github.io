import { Metadata } from "next";
import { TeamCard } from "@/components/cards/team-card";
import { teamMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the SMU students organizing the Cloud Quest competition.",
};

export default function OurTeamPage() {
  // Group team members by their team
  const groupedMembers = teamMembers.reduce(
    (acc, member) => {
      if (!acc[member.team]) {
        acc[member.team] = [];
      }
      acc[member.team].push(member);
      return acc;
    },
    {} as Record<string, typeof teamMembers>
  );

  const teamOrder = ["Fundraising", "Logistics", "Marketing", "Tech"] as const;

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            SMU Cloud Quest is organized by passionate students from the Lyle
            School of Engineering who are dedicated to bringing cloud computing
            education to the SMU community.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        {teamOrder.map((team) => {
          const members = groupedMembers[team];
          if (!members || members.length === 0) return null;

          return (
            <div key={team} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold mb-8 text-center">
                {team.toUpperCase()} TEAM
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {members.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
