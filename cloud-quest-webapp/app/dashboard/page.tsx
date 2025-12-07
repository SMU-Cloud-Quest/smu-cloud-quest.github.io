import { Metadata } from "next";
import { redirect } from "next/navigation";

// This page requires authentication, so it can't be statically generated
export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  School,
  BookOpen,
  Shirt,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your SMU Cloud Quest registration status.",
};

interface Registration {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
  major: string;
  grade_level: string;
  tshirt_size: string;
  age: number;
  dietary_restrictions: string | null;
  resume_path: string | null;
  consent_share_with_employers: boolean;
  created_at: string;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getClaims();

  if (userError || !userData?.claims) {
    redirect("/auth/login?redirectTo=/dashboard");
  }

  const userId = userData.claims.sub as string;
  const userEmail = userData.claims.email as string;

  // Get registration data - check by user_id first, then by email (for guest registrations)
  let { data: registration, error: registrationError } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle<Registration>();

  // Log error for debugging (but don't fail - might just be no registration found)
  // PGRST116 is the code for "no rows returned" which is expected when user hasn't registered
  if (registrationError && Object.keys(registrationError).length > 0 && registrationError.code !== "PGRST116") {
    console.error("Error fetching registration by user_id:", registrationError);
  }

  // If no registration found by user_id, check by email (guest registration or email match)
  if (!registration && userEmail) {
    const normalizedEmail = userEmail.toLowerCase().trim();
    
    // First check for guest registrations (user_id is null)
    let { data: guestRegistration, error: guestError } = await supabase
      .from("registrations")
      .select("*")
      .eq("email", normalizedEmail)
      .is("user_id", null)
      .maybeSingle<Registration>();
    
    // Only log if it's a real error, not "no rows found"
    if (guestError && Object.keys(guestError).length > 0 && guestError.code !== "PGRST116") {
      console.error("Error fetching guest registration:", guestError);
    }

    // If still not found, check by email regardless of user_id (in case of data inconsistency)
    if (!guestRegistration) {
      const { data: emailRegistration, error: emailError } = await supabase
        .from("registrations")
        .select("*")
        .eq("email", normalizedEmail)
        .maybeSingle<Registration>();
      
      // Only log if it's a real error, not "no rows found"
      if (emailError && Object.keys(emailError).length > 0 && emailError.code !== "PGRST116") {
        console.error("Error fetching registration by email:", emailError);
      }

      // If found by email but user_id doesn't match or is null, update it
      if (emailRegistration) {
        if (emailRegistration.user_id !== userId) {
          const { data: updatedRegistration, error: updateError } = await supabase
            .from("registrations")
            .update({ user_id: userId })
            .eq("id", emailRegistration.id)
            .select()
            .maybeSingle<Registration>();
          
          if (updateError) {
            console.error("Error updating registration user_id:", updateError);
            // Still use the registration even if update fails
            registration = emailRegistration;
          } else {
            registration = updatedRegistration;
          }
        } else {
          registration = emailRegistration;
        }
      }
    } else {
      // Found guest registration, update it to link to the current user
      const { data: updatedRegistration, error: updateError } = await supabase
        .from("registrations")
        .update({ user_id: userId })
        .eq("id", guestRegistration.id)
        .select()
        .maybeSingle<Registration>();
      
      if (updateError) {
        console.error("Error updating guest registration user_id:", updateError);
        // Still use the guest registration even if update fails
        registration = guestRegistration;
      } else {
        registration = updatedRegistration;
      }
    }
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome{registration ? `, ${registration.first_name}` : ""}!
          </h1>
          <p className="text-lg text-white/80">
            Manage your SMU Cloud Quest registration
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        {registration ? (
          <div className="space-y-8">
            {/* Registration Status */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-green-800">
                      Registration Complete
                    </h2>
                    <p className="text-sm text-green-700">
                      You&apos;re all set for SMU Cloud Quest starting{" "}
                      {siteConfig.eventDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Details */}
            <Card>
              <CardHeader>
                <CardTitle>Your Registration Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">
                        {registration.first_name} {registration.last_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{registration.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <School className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="font-medium">{registration.university}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Major</p>
                      <p className="font-medium">{registration.major}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Grade Level
                      </p>
                      <p className="font-medium">{registration.grade_level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Shirt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        T-Shirt Size
                      </p>
                      <p className="font-medium">{registration.tshirt_size}</p>
                    </div>
                  </div>
                </div>

                {/* Resume Status */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Resume</p>
                      {registration.resume_path ? (
                        <Badge className="bg-green-100 text-green-800">
                          Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not uploaded</Badge>
                      )}
                    </div>
                  </div>

                  {registration.consent_share_with_employers && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Your resume will be shared with participating employers.
                    </p>
                  )}
                </div>

                {/* Registered Date */}
                <div className="border-t pt-6 text-sm text-muted-foreground">
                  Registered on{" "}
                  {new Date(registration.created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="outline">
                    <Link href="/calendar">View Schedule</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/speakers">Meet the Speakers</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={siteConfig.awsCloudQuestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AWS Cloud Quest
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Not Registered */
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                You Haven&apos;t Registered Yet
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Complete your registration to participate in SMU Cloud Quest and
                gain access to workshops, competitions, and prizes!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-dark"
              >
                <Link href="/register">Register Now</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
