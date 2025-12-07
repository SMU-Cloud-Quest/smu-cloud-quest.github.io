import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamMember } from "@/types/models";

interface TeamCardProps {
  member: TeamMember;
}

const teamColors: Record<TeamMember["team"], string> = {
  Fundraising: "bg-brand-red text-white",
  Logistics: "bg-green-600 text-white",
  Marketing: "bg-purple-600 text-white",
  Tech: "bg-brand-blue text-white",
};

export function TeamCard({ member }: TeamCardProps) {
  const isPlaceholder = member.photo.includes("placeholder");
  
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 text-center">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {isPlaceholder ? (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <svg
              className="w-3/4 h-3/4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        ) : (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition: "center top" }}
          />
        )}
      </div>
      <CardContent className="p-4">
        <Badge className={`mb-2 ${teamColors[member.team]}`}>
          {member.team}
        </Badge>
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p className="text-sm text-brand-blue font-medium">{member.role}</p>
        {member.bio && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {member.bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
