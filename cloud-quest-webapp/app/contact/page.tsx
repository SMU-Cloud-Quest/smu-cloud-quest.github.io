import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the SMU Cloud Quest team.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Have questions about SMU Cloud Quest? We&apos;d love to hear from
            you. Reach out to our team!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-brand-blue" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${siteConfig.socialLinks.email}`}
                  className="text-brand-blue hover:underline text-lg"
                >
                  {siteConfig.socialLinks.email}
                </a>
                <p className="text-muted-foreground mt-2">
                  For general inquiries, sponsorship opportunities, or any
                  questions about the competition.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-blue" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">
                  Southern Methodist University
                </p>
                <p className="text-muted-foreground">
                  Lyle School of Engineering
                  <br />
                  Dallas, TX 75205
                </p>
                <a
                  href="https://maps.google.com/?q=Southern+Methodist+University+Dallas+TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-blue hover:underline mt-2"
                >
                  View on Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>@smucloudquest</span>
                </a>
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>SMU Cloud Quest</span>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-blue" />
                Find Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px] rounded-lg overflow-hidden border shadow-sm">
                <iframe
                  src="https://www.google.com/maps?q=Southern+Methodist+University,+Dallas,+TX+75205&output=embed&hl=en&z=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Southern Methodist University Location"
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                <a
                  href="https://maps.google.com/?q=Southern+Methodist+University+Dallas+TX+75205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  Open in Google Maps
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
            <div className="space-y-6">
              {[
                {
                  question: "Who can participate in SMU Cloud Quest?",
                  answer:
                    "SMU Cloud Quest is open to all current SMU students, regardless of major or year. Whether you're a beginner or have cloud experience, there's something for everyone!",
                },
                {
                  question: "Do I need prior cloud experience?",
                  answer:
                    "No! AWS Cloud Quest is designed for learners at all levels. The platform includes beginner-friendly paths, and our workshops will help you get started.",
                },
                {
                  question: "Is there a registration fee?",
                  answer:
                    "No, registration is completely free for SMU students. All you need is your SMU email address to sign up.",
                },
                {
                  question: "What do I need to participate?",
                  answer:
                    "You'll need a laptop, internet connection, and an AWS account (free tier). We'll provide detailed setup instructions after registration.",
                },
                {
                  question: "What prizes can I win?",
                  answer:
                    "Prizes include AWS credits, tech gadgets, certification vouchers, and more! Details will be announced closer to the event.",
                },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
      </section>
    </div>
  );
}
