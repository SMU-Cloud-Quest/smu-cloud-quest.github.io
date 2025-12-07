import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Home, UserPlus } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Registration Complete",
  description: "You have successfully registered for SMU Cloud Quest!",
};

export default async function RegistrationSuccessPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = !!data?.claims;
  return (
    <div className="py-12">
      <section className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="text-center border-2 border-green-200 bg-green-50/50">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-green-800 mb-4">
              You&apos;re Registered!
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Thank you for registering for SMU Cloud Quest! We&apos;re excited
              to have you join us.
            </p>

            <div className="bg-white rounded-lg p-6 mb-8 text-left">
              <h2 className="font-semibold text-lg mb-4">
                What&apos;s Next?
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </span>
                  <span>
                    Check your email for confirmation and setup instructions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </span>
                  <span>
                    Create your free AWS account if you don&apos;t have one
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </span>
                  <span>
                    Mark your calendar for {siteConfig.eventDate}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    4
                  </span>
                  <span>
                    Follow us on social media for updates and announcements
                  </span>
                </li>
              </ul>
            </div>

            {!isAuthenticated && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <UserPlus className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Want to manage your registration?
                    </h3>
                    <p className="text-sm text-blue-800 mb-3">
                      Sign up for an account to view your registration details,
                      update your information, and access your dashboard.
                    </p>
                    <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-blue-dark">
                      <Link href="/auth/sign-up">Create Account</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark">
                <Link href="/calendar">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
