import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config/site";
import { Cloud, Users, Award, BookOpen } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About the Event
          </h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Main About Text */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              SMU Cloud Quest is a new university-wide cloud computing
              competition created in partnership with Amazon Web Services and
              hosted by SMU Lyle School of Engineering students. Designed for
              beginners and advanced students alike, Cloud Quest transforms
              cloud learning into an interactive, challenge-driven experience
              where participants earn points through hands-on AWS quests.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This competition is open exclusively to current SMU students.
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">
                Over the course of the week, students will:
              </h3>
              <ul className="space-y-3">
                {[
                  "Work inside the AWS Cloud Quest environment to solve real-world cloud engineering, security, DevOps, and architecture challenges.",
                  "Attend AWS-led workshops featuring live demos, best practices, Q&A sessions, and resume-building guidance from industry professionals.",
                  "Participate in campus events that deepen cloud knowledge, introduce new tools, and give bonus points toward the final leaderboard.",
                  "Build in-demand skills that translate directly to internships, technical interviews, and cloud certifications.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-blue flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed pt-4">
              The competition concludes with a closing ceremony where top
              participants are recognized and prizes are awarded. Whether
              you&apos;re exploring cloud computing for the first time or
              sharpening existing skills, SMU Cloud Quest offers a unique
              opportunity to learn, connect, and compete in a supportive
              community of peers.
            </p>
          </div>

          {/* AWS Cloud Quest Card */}
          <div className="space-y-6">
            <Card className="border-2 border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-transparent">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Cloud className="h-8 w-8 text-brand-blue" />
                  <h3 className="text-2xl font-bold">About AWS Cloud Quest</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  AWS Cloud Quest is a 3D role-playing game to help you build
                  practical AWS Cloud skills. Choose your role—Cloud
                  Practitioner, Generative AI specialist, Serverless Developer,
                  Solutions Architect, Machine Learning Specialist, Security
                  Specialist, Data Analytics Specialist, or Networking
                  Specialist—then learn and apply cloud skills to help the
                  citizens of your virtual city.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Once you finish all the assignments in your role, showcase
                  your achievement with a digital badge. Whether you&apos;re
                  starting your cloud learning journey or diving into
                  specialized skills, AWS Cloud Quest helps you learn in an
                  interactive, engaging way.
                </p>
                <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark">
                  <a
                    href={siteConfig.awsCloudQuestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  title: "Open to All SMU Students",
                  description: "Beginners to advanced",
                },
                {
                  icon: Award,
                  title: "Win Prizes",
                  description: "Recognition & rewards",
                },
                {
                  icon: BookOpen,
                  title: "Learn AWS",
                  description: "Hands-on experience",
                },
                {
                  icon: Cloud,
                  title: "Build Skills",
                  description: "Career-ready expertise",
                },
              ].map((feature, index) => (
                <Card key={index} className="text-center p-4">
                  <feature.icon className="h-8 w-8 text-brand-blue mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
