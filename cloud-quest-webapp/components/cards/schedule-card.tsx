import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScheduleItem } from "@/types/models";
import { Clock, MapPin, User } from "lucide-react";

interface ScheduleCardProps {
  item: ScheduleItem;
}

const typeColors: Record<ScheduleItem["type"], string> = {
  workshop: "bg-brand-blue text-white",
  ceremony: "bg-brand-red text-white",
  networking: "bg-purple-600 text-white",
  competition: "bg-green-600 text-white",
  panel: "bg-blue-600 text-white",
  social: "bg-amber-600 text-white",
};

const typeLabels: Record<ScheduleItem["type"], string> = {
  workshop: "Workshop",
  ceremony: "Ceremony",
  networking: "Networking",
  competition: "Competition",
  panel: "Panel",
  social: "Social",
};

export function ScheduleCard({ item }: ScheduleCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Date Column */}
          <div className="flex-shrink-0 text-center md:text-left md:w-32">
            <p className="text-sm text-muted-foreground">{item.date}</p>
            <p className="font-semibold text-brand-blue">{item.startTime}</p>
            {item.endTime && (
              <p className="text-xs text-muted-foreground">to {item.endTime}</p>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <Badge className={typeColors[item.type]}>
                {typeLabels[item.type]}
              </Badge>
            </div>
            <p className="text-muted-foreground">{item.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              {item.speaker && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{item.speaker}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
