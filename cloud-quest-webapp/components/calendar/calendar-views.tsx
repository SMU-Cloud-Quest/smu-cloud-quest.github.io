"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarCardView } from "./calendar-card-view";
import { CalendarTableView } from "./calendar-table-view";
import { ScheduleItem } from "@/types/models";

interface CalendarViewsProps {
  items: ScheduleItem[];
}

export function CalendarViews({ items }: CalendarViewsProps) {
  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="card">Card View</TabsTrigger>
        <TabsTrigger value="table">Table View</TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <CalendarCardView items={items} />
      </TabsContent>
      <TabsContent value="table">
        <CalendarTableView items={items} />
      </TabsContent>
    </Tabs>
  );
}
