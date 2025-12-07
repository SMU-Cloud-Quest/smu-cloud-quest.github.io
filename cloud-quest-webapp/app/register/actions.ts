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
  warning?: string; // For non-critical issues like resume upload failure
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
  // Use getUser() instead of getClaims() for more reliable auth in server actions
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

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
      
      // Check if the error is due to missing bucket
      const errorMessage = uploadError.message || "";
      const isBucketNotFound = 
        errorMessage.includes("Bucket not found") ||
        errorMessage.includes("404") ||
        (uploadError as any)?.status === 404 ||
        (uploadError as any)?.statusCode === "404";
      
      if (isBucketNotFound) {
        console.error(
          "Storage bucket 'resumes' not found. Please create it in Supabase Dashboard > Storage."
        );
        // Store warning to return to user
        // We'll handle this after registration succeeds
      } else {
        console.error("Resume upload failed:", errorMessage);
      }
      // Continue with registration even if resume upload fails
    } else {
      resumePath = fileName;
    }
  }

  // Normalize email to lowercase for consistent matching
  const normalizedEmail = validatedData.data.email.toLowerCase().trim();

  // Insert the registration
  const { error: insertError, data: insertedData } = await supabase
    .from("registrations")
    .insert({
      user_id: userId || null, // null for guest registrations
      first_name: validatedData.data.firstName,
      last_name: validatedData.data.lastName,
      email: normalizedEmail,
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
    })
    .select()
    .single();

  // Log for debugging
  if (insertedData) {
    console.log("Registration created successfully:", {
      id: insertedData.id,
      user_id: insertedData.user_id,
      email: insertedData.email,
    });
  }

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
