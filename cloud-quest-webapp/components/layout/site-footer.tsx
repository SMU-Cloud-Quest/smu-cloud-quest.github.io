import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logos/Logo_icon.png"
                alt="SMU Cloud Quest"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-semibold text-lg">
                SMU<span className="text-brand-blue">x</span>AWS Cloud Quest
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              A university-wide cloud computing competition created in
              partnership with Amazon Web Services and hosted by SMU Lyle School
              of Engineering students.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#about" className="hover:text-brand-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-brand-blue transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-brand-blue transition-colors">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-brand-blue transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.awsCloudQuestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors"
                >
                  AWS Cloud Quest
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${siteConfig.socialLinks.email}`}
                  className="hover:text-brand-blue transition-colors"
                >
                  {siteConfig.socialLinks.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors"
                >
                  @smucloudquest
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors"
                >
                  SMU Cloud Quest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 SMU Cloud Quest. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Hosted by</span>
            <span className="font-semibold text-brand-red">
              Southern Methodist University
            </span>
            <span>•</span>
            <span>In partnership with</span>
            <span className="font-semibold text-brand-blue">AWS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
