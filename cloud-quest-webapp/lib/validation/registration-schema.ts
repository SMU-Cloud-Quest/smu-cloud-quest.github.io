import { z } from "zod";

export const gradeLevels = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate",
  "PhD",
] as const;

export const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const registrationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),
  email: z.string().email("Invalid email address"),
  university: z
    .string()
    .min(1, "University is required")
    .max(200, "University name is too long"),
  major: z
    .string()
    .min(1, "Major is required")
    .max(200, "Major is too long"),
  gradeLevel: z.enum(gradeLevels, {
    message: "Please select your grade level",
  }),
  tshirtSize: z.enum(tshirtSizes, {
    message: "Please select your t-shirt size",
  }),
  age: z
    .number()
    .min(16, "You must be at least 16 years old")
    .max(100, "Please enter a valid age"),
  dietaryRestrictions: z.string().max(500).optional(),
  additionalComments: z.string().max(1000).optional(),
  consentDataStorage: z.boolean().refine((val) => val === true, {
    message: "You must consent to data storage to register",
  }),
  consentShareWithEmployers: z.boolean().optional().default(false),
  consentTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type RegistrationFormData = z.input<typeof registrationSchema>;

export const registrationDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  university: "Southern Methodist University",
  major: "",
  dietaryRestrictions: "",
  additionalComments: "",
  consentShareWithEmployers: false,
} satisfies Partial<RegistrationFormData>;
