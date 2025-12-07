"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleItem } from "@/types/models";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { EventDetailModal } from "./event-detail-modal";

interface CalendarCardViewProps {
  items: ScheduleItem[];
}

const typeColors: Record<string, string> = {
  workshop: "text-green-600",
  ceremony: "text-brand-red",
  networking: "text-sky-500",
  competition: "text-sky-500",
  panel: "text-sky-500",
  social: "text-amber-600",
  reminder: "text-orange-600",
  start: "text-green-600",
  end: "text-orange-600",
  orientation: "text-brand-red",
  "keynote speaker": "text-gray-600",
};

const typeLabels: Record<ScheduleItem["type"], string> = {
  workshop: "WORKSHOP",
  ceremony: "ORIENTATION",
  networking: "NETWORKING",
  competition: "START",
  panel: "PANEL",
  social: "SOCIAL",
};

// Format date to "FEB 15 SUN" format
function formatDateCard(dateString: string): { month: string; day: string; dayOfWeek: string } {
  const date = new Date(dateString);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  return {
    month: months[date.getMonth()],
    day: date.getDate().toString(),
    dayOfWeek: daysOfWeek[date.getDay()],
  };
}

export function CalendarCardView({ items }: CalendarCardViewProps) {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort all items by date and time
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateA !== dateB) return dateA - dateB;
    // If same date, sort by start time
    return a.startTime.localeCompare(b.startTime);
  });

  const handleCardClick = (item: ScheduleItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {sortedItems.map((item) => {
        const dateInfo = formatDateCard(item.date);
        
        // Build event types array
        const eventTypes: string[] = [];
        
        // Add primary type label
        if (item.type === "ceremony" && item.title.includes("Kickoff")) {
          eventTypes.push("ORIENTATION");
        } else if (item.type === "ceremony" && item.title.includes("Award")) {
          eventTypes.push("CEREMONY");
        } else {
          eventTypes.push(typeLabels[item.type] || item.type.toUpperCase());
        }
        
        // Add secondary types
        if (item.secondaryTypes) {
          eventTypes.push(...item.secondaryTypes);
        }

        return (
          <Card 
            key={item.id} 
            className="bg-gray-50 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => handleCardClick(item)}
          >
            <CardContent className="p-6 flex-1 flex flex-col">
              {/* Image if present */}
              {item.image && (
                <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex gap-4 mb-4">
                {/* Date Block */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-800 text-white px-4 py-3 rounded text-center min-w-[90px]">
                    <div className="text-xs font-semibold">{dateInfo.month}</div>
                    <div className="text-2xl font-bold leading-none mt-1">{dateInfo.day}</div>
                    <div className="text-xs font-medium mt-1">{dateInfo.dayOfWeek}</div>
                  </div>
                </div>

                {/* Event Type Tags */}
                <div className="flex-1 flex flex-wrap items-start gap-1.5">
                  {eventTypes.map((type, idx) => {
                    const typeKey = type.toLowerCase();
                    const colorClass = typeColors[typeKey] || "text-gray-600";
                    
                    return (
                      <span key={idx} className={`text-sm font-semibold ${colorClass}`}>
                        {type}
                        {idx < eventTypes.length - 1 && <span className="mx-1 text-gray-400">·</span>}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Event Title */}
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>

              {/* Mandatory, Points, Free Food */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.mandatory && (
                  <span className="text-sm text-muted-foreground">Mandatory</span>
                )}
                {item.points && (
                  <span className="text-sm text-muted-foreground">
                    + {item.points} Points
                    {item.freeFood && <span className="mx-1 text-gray-400">·</span>}
                  </span>
                )}
                {item.freeFood && (
                  <span className="text-sm text-muted-foreground">Free Food</span>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {item.description}
                </p>
              )}

              {/* Time and Location - styled as pills */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-gray-200 px-3 py-1 rounded-full text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {item.startTime}
                      {item.endTime && ` - ${item.endTime}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-gray-200 px-3 py-1 rounded-full text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Registration Info - only show for non-platform events */}
              {!item.location.toLowerCase().includes("platform") && (
                <div className="pt-3 border-t text-sm text-muted-foreground mt-auto">
                  <div>
                    Register here:{" "}
                    <a
                      href="https://smu360.smu.edu/home_login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline break-all"
                    >
                      https://smu360.smu.edu/home_login
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      </div>
      <EventDetailModal
        item={selectedItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
