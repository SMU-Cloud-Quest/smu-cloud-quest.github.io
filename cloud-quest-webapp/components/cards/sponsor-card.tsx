import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Sponsor } from "@/types/models";

interface SponsorCardProps {
  sponsor: Sponsor;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}

const sizeClasses = {
  sm: "h-16 p-4",
  md: "h-24 p-6",
  lg: "h-32 p-8",
};

export function SponsorCard({ sponsor, size = "md", showBadge = true }: SponsorCardProps) {
  const content = (
    <Card
      className={`relative flex items-center justify-center ${sizeClasses[size]} hover:shadow-lg transition-all duration-300 group bg-white border border-gray-200 rounded`}
    >
      <div className="relative w-full h-full">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {sponsor.badge && showBadge && (
        <div className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold uppercase tracking-wider px-3 py-2 rounded">
          {sponsor.badge}
        </div>
      )}
    </Card>
  );

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
