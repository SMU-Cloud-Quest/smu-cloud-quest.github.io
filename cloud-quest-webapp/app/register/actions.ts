"use server";

import { createClient } from "@/lib/supabase/server";
import {
  registrationSchema,
  type RegistrationFormData,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
} from "@/lib/validation/registration-schema";

interface SubmitRegistrationResult {
  success: boolean;
  error?: string;
}

export async function submitRegistration(
  data: RegistrationFormData,
  resumeFile?: File | null
): Promise<SubmitRegistrationResult> {
  const supabase = await createClient();

  // Validate the data
  const validatedData = registrationSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  // Get the current user (optional - guest registrations are allowed)
  const { data: userData } = await supabase.auth.getClaims();
  const userId = userData?.claims?.sub as string | undefined;

  // Check if authenticated user has already registered
  if (userId) {
    const { data: existingRegistration } = await supabase
      .from("registrations")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existingRegistration) {
      return {
        success: false,
        error: "You have already registered for this event.",
      };
    }
  } else {
    // For guest registrations, check by email
    const { data: existingGuestRegistration } = await supabase
      .from("registrations")
      .select("id")
      .eq("email", validatedData.data.email)
      .is("user_id", null)
      .single();

    if (existingGuestRegistration) {
      return {
        success: false,
        error: "This email has already been used to register. Please sign in if this is your account.",
      };
    }
  }

  let resumePath: string | null = null;

  // Handle resume upload if provided
  if (resumeFile) {
    // Validate file
    if (!ACCEPTED_FILE_TYPES.includes(resumeFile.type)) {
      return {
        success: false,
        error: "Invalid file type. Please upload a PDF file.",
      };
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: "File too large. Maximum size is 5MB.",
      };
    }

    // Generate unique filename
    const fileExt = resumeFile.name.split(".").pop();
    // Use userId for authenticated users, or guest-{email-hash} for guests
    const folderName = userId
      ? userId
      : `guest-${Buffer.from(validatedData.data.email).toString("base64url").slice(0, 20)}`;
    const fileName = `${folderName}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, resumeFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload error:", uploadError);
      // Don't fail registration if resume upload fails
      // Just log and continue
    } else {
      resumePath = fileName;
    }
  }

  // Insert the registration
  const { error: insertError } = await supabase.from("registrations").insert({
    user_id: userId || null, // null for guest registrations
    first_name: validatedData.data.firstName,
    last_name: validatedData.data.lastName,
    email: validatedData.data.email,
    university: validatedData.data.university,
    major: validatedData.data.major,
    grade_level: validatedData.data.gradeLevel,
    tshirt_size: validatedData.data.tshirtSize,
    age: validatedData.data.age,
    dietary_restrictions: validatedData.data.dietaryRestrictions || null,
    additional_comments: validatedData.data.additionalComments || null,
    consent_data_storage: validatedData.data.consentDataStorage,
    consent_share_with_employers: validatedData.data.consentShareWithEmployers,
    consent_terms: validatedData.data.consentTerms,
    resume_path: resumePath,
  });

  if (insertError) {
    console.error("Registration error:", insertError);
    return {
      success: false,
      error: "Failed to submit registration. Please try again.",
    };
  }

  // Update the user profile with their name (only if authenticated)
  if (userId) {
    await supabase
      .from("profiles")
      .update({
        first_name: validatedData.data.firstName,
        last_name: validatedData.data.lastName,
      })
      .eq("id", userId);
  }

  return { success: true };
}
