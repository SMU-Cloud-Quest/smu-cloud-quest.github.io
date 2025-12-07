export const siteConfig = {
  name: "SMU Cloud Quest",
  title: "SMU AWS Cloud Quest Competition",
  description:
    "SMU Cloud Quest is a university-wide cloud computing competition created in partnership with Amazon Web Services and hosted by SMU Lyle School of Engineering students.",
  url: "https://smu-cloud-quest.github.io",
  eventDate: "February 15, 2026",
  eventDateObj: new Date("2026-02-15T09:00:00"),
  location: "Southern Methodist University, Dallas, TX 75205",
  socialLinks: {
    instagram: "https://instagram.com/smucloudquest",
    linkedin: "https://linkedin.com/company/smucloudquest",
    email: "smucloudquest@gmail.com",
  },
  awsCloudQuestUrl: "https://aws.amazon.com/training/digital/aws-cloud-quest/",
} as const;

export type SiteConfig = typeof siteConfig;
