import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Speaker } from "@/types/models";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={speaker.photo}
          alt={speaker.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg">{speaker.name}</h3>
          <p className="text-sm text-gray-200">{speaker.title}</p>
          <p className="text-sm text-brand-blue font-medium">{speaker.company}</p>
        </div>
      </div>
      <CardContent className="p-4">
        {speaker.talkTitle && (
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase text-brand-blue">
              Session
            </span>
            <p className="font-medium text-sm">{speaker.talkTitle}</p>
          </div>
        )}
        {speaker.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {speaker.bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
