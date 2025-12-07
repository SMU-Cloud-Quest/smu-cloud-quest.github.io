"use client";

import { useState } from "react";
import { ScheduleItem } from "@/types/models";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";
import { EventDetailModal } from "./event-detail-modal";

interface CalendarTableViewProps {
  items: ScheduleItem[];
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

export function CalendarTableView({ items }: CalendarTableViewProps) {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group items by date
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, ScheduleItem[]>
  );

  const sortedDates = Object.keys(groupedItems).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const handleRowClick = (item: ScheduleItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
      {sortedDates.map((date) => (
        <div key={date}>
          <div className="sticky top-20 z-10 bg-background py-4 mb-6">
            <h2 className="text-xl font-bold text-brand-blue">{date}</h2>
            <div className="w-16 h-1 bg-brand-blue mt-2" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Time</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Event</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Type</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Location</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Speaker</th>
                </tr>
              </thead>
              <tbody>
                {groupedItems[date].map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className={`border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                      index === groupedItems[date].length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.startTime}</div>
                          {item.endTime && (
                            <div className="text-sm text-muted-foreground">
                              to {item.endTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-lg mb-1">{item.title}</div>
                        {item.description && (
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={typeColors[item.type]}>
                        {typeLabels[item.type]}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{item.location}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {item.speaker ? (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{item.speaker}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      </div>
      <EventDetailModal
        item={selectedItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
