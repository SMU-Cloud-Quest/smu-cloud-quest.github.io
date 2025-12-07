export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  talkTitle?: string;
  bio?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Tech" | "Marketing" | "Fundraising" | "Logistics";
  photo: string;
  bio?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: "title" | "gold" | "silver" | "bronze" | "partner" | "association" | "acknowledgment";
  website?: string;
  badge?: string; // e.g., "Food Partner", "Gift Partners"
}

export interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address?: string; // Full address for map display
  type: "workshop" | "ceremony" | "networking" | "competition" | "panel" | "social";
  speaker?: string;
  points?: number;
  freeFood?: boolean;
  mandatory?: boolean;
  image?: string;
  secondaryTypes?: string[]; // Additional event types like "REMINDER", "START", "END", etc.
  host?: string; // Event host/organizer
}

export interface Registration {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  major: string;
  gradeLevel: string;
  tshirtSize: string;
  age: number;
  dietaryRestrictions?: string;
  resumePath?: string;
  consentDataStorage: boolean;
  consentShareWithEmployers: boolean;
  consentTerms: boolean;
  additionalComments?: string;
  createdAt: string;
  updatedAt: string;
}
