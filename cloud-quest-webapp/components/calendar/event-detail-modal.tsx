"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScheduleItem } from "@/types/models";
import { Clock, MapPin, Calendar, Link2, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EventDetailModalProps {
  item: ScheduleItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

// Format date to "Monday, February 16, 2026" format
function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Generate Google Calendar link
function generateCalendarLink(item: ScheduleItem): string {
  const startDate = new Date(`${item.date} ${item.startTime}`);
  const endDate = item.endTime
    ? new Date(`${item.date} ${item.endTime}`)
    : new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: item.title,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: item.description,
    location: item.address || item.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Get Google Maps embed URL (using iframe embed which doesn't require API key)
function getGoogleMapsEmbed(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
}

// Get Google Maps directions URL
function getGoogleMapsDirections(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
}

export function EventDetailModal({
  item,
  open,
  onOpenChange,
}: EventDetailModalProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  if (!item) return null;

  const eventTypes: string[] = [];
  if (item.type === "ceremony" && item.title.includes("Kickoff")) {
    eventTypes.push("ORIENTATION");
  } else if (item.type === "ceremony" && item.title.includes("Award")) {
    eventTypes.push("CEREMONY");
  } else {
    eventTypes.push(typeLabels[item.type] || item.type.toUpperCase());
  }
  if (item.secondaryTypes) {
    eventTypes.push(...item.secondaryTypes);
  }

  const fullDate = formatFullDate(item.date);
  const calendarLink = generateCalendarLink(item);
  const eventUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareLink = `${eventUrl}?event=${item.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleEmailInvite = () => {
    const subject = encodeURIComponent(`Invitation: ${item.title}`);
    const body = encodeURIComponent(
      `You're invited to ${item.title}\n\n${item.description}\n\nDate: ${fullDate}\nTime: ${item.startTime}${item.endTime ? ` - ${item.endTime}` : ""}\nLocation: ${item.location}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const defaultAddress = "3140 Dyer St, Dallas, TX 75205";
  const address = item.address || defaultAddress;
  const showMap = !item.location.toLowerCase().includes("virtual") && 
                  !item.location.toLowerCase().includes("zoom") && 
                  !item.location.toLowerCase().includes("platform");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {/* Event Categories */}
          <div className="flex flex-wrap gap-2 mb-2">
            {eventTypes.map((type, idx) => {
              const typeKey = type.toLowerCase();
              const colorClass = typeColors[typeKey] || "text-gray-600";
              return (
                <span key={idx} className={`text-sm font-semibold ${colorClass}`}>
                  {type}
                  {idx < eventTypes.length - 1 && (
                    <span className="mx-1 text-gray-400">·</span>
                  )}
                </span>
              );
            })}
          </div>

          <DialogTitle className="text-2xl font-bold text-left">
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overview Section */}
          <div className="space-y-2">
            {(item.points || item.freeFood || item.mandatory) && (
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {item.mandatory && <span>Mandatory</span>}
                {item.points && (
                  <span>
                    + {item.points} Points
                    {item.freeFood && <span className="mx-1">·</span>}
                  </span>
                )}
                {item.freeFood && <span>Free Food</span>}
              </div>
            )}
            <p className="text-muted-foreground">{item.description}</p>
            {!item.location.toLowerCase().includes("platform") && (
              <div className="text-sm text-muted-foreground">
                Register here:{" "}
                <a
                  href="https://smu360.smu.edu/home_login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  https://smu360.smu.edu/home_login
                </a>
              </div>
            )}
          </div>

          {/* When and Where Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* WHEN */}
            <div>
              <h3 className="font-semibold mb-2">WHEN</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {fullDate} {item.startTime}
                      {item.endTime && ` - ${item.endTime}`}
                    </div>
                  </div>
                </div>
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  Add to Calendar
                </a>
              </div>
            </div>

            {/* WHERE */}
            {showMap && (
              <div>
                <h3 className="font-semibold mb-2">WHERE</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{item.location}</div>
                      {address && (
                        <div className="text-muted-foreground">{address}</div>
                      )}
                    </div>
                  </div>
                  <a
                    href={getGoogleMapsDirections(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          {showMap && address && (
            <div className="w-full h-64 rounded-lg overflow-hidden border">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getGoogleMapsEmbed(address)}
              />
            </div>
          )}

          {/* Host and Share Section */}
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
            {/* HOST */}
            {item.host && (
              <div>
                <h3 className="font-semibold mb-2">HOST</h3>
                <p className="text-sm text-muted-foreground">{item.host}</p>
              </div>
            )}

            {/* SHARE */}
            <div>
              <h3 className="font-semibold mb-2">SHARE</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2"
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      COPY LINK
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmailInvite}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  INVITE VIA EMAIL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
