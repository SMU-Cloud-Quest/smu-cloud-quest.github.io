import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RegistrationForm } from "@/components/registration/registration-form";

// This page can be accessed by anyone, authenticated or not
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for SMU Cloud Quest competition.",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  // If authenticated, check if already registered
  if (data?.claims) {
    const userId = data.claims.sub as string;
    const { data: existingRegistration } = await supabase
      .from("registrations")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existingRegistration) {
      redirect("/register/success");
    }
  }

  // Get user email if authenticated, otherwise null
  const userEmail = data?.claims?.email as string | undefined;

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Register for SMU Cloud Quest
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Complete your registration below to participate in the competition.
            All fields marked with * are required.
            {!userEmail && (
              <span className="block mt-2 text-sm">
                You can register without creating an account, or{" "}
                <a
                  href="/auth/sign-up"
                  className="underline hover:text-white"
                >
                  sign up
                </a>{" "}
                to manage your registration later.
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="container mx-auto max-w-3xl px-4 py-12">
        <RegistrationForm userEmail={userEmail} />
      </section>
    </div>
  );
}
