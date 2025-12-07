import { Sponsor } from "@/types/models";

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Title Sponsor",
    logo: "/images/sponsors/title_sponsor.png",
    tier: "title",
  },
  {
    id: "2",
    name: "Sponsor 1",
    logo: "/images/sponsors/cie-jmi.jpg",
    tier: "association",
  },
  {
    id: "3",
    name: "Sponsor 2",
    logo: "/images/sponsors/jamia_cooperative.jpg",
    tier: "association",
    badge: "Food Partner",
  },
  {
    id: "4",
    name: "Sponsor 3",
    logo: "/images/sponsors/rupa_aleph.jpg",
    tier: "association",
    badge: "Gift Partners",
  },
  {
    id: "5",
    name: "Sponsor 4",
    logo: "/images/sponsors/thc.png",
    tier: "association",
  },
  {
    id: "6",
    name: "Hart Center for Engineering Leadership",
    logo: "/images/sponsors/HartCenter.jpeg",
    tier: "acknowledgment",
    website: "https://www.smu.edu/lyle/centers-and-institutes/hart-center-for-engineering-leadership",
  },
];
