# Implementation Plan for SMU AWS Cloud Quest Website (Next.js, TypeScript, Tailwind, shadcn/ui, Supabase, Vercel)

## Feature Analysis

### Identified Features

- **Home / About page**
  - Hero section with SMU + AWS Cloud Quest branding, event title, and date.
  - Primary CTAs: **Register Now** and **View Schedule**.
  - Overview of SMU Cloud Quest and what makes the event unique.
  - Highlight of in‑person components (opening/closing ceremonies, workshops, prizes).
  - Link or reference to AWS Cloud Quest learning platform.
  - Countdown / sense of urgency to event start.

- **Event Details / Schedule**
  - High-level event overview for the week.
  - Daily schedule or calendar view (Opening Ceremony, Workshops, Career Fair, Closing Ceremony, etc.).
  - Linkage between events and speakers/topics where applicable.

- **Speakers Page**
  - Speaker cards including:
    - Name, title, company/organization.
    - Photo/headshot.
    - Talk/workshop title and brief description.

- **Team Page**
  - Bios and headshots for student organizers and faculty/advisors.
  - Roles for each team member (Tech, Marketing, Operations, etc.).

- **Sponsors Page**
  - Logos for AWS (title sponsor) and other partners.
  - Optional links to sponsor sites.
  - Sponsor tiers (title sponsor vs. supporting sponsors) if needed.

- **Contact Page**
  - Contact form or contact info for questions.
  - Possibly a shared event email address or form that writes to Supabase.

- **Calendar / Schedule Page**
  - Dedicated view of event schedule (by day, with times).
  - Links back to registration or relevant pages.

- **Authentication & Registration Flow**
  - Sign-in / sign-up experience (Supabase Auth) before accessing the registration form.
  - Registration button on the home page that:
    - Redirects to sign-in/sign-up if the user is not authenticated.
    - Takes authenticated users directly to the registration form.
  - Registration form backed by Supabase with the following fields:
    - First Name (required)
    - Last Name (required)
    - Email (required)
    - University (required)
    - Major (required)
    - Grade / Level (required)
    - T-Shirt Size (required)
    - Resume Upload (optional, file upload)
    - Dietary Restrictions (optional, text)
    - Age (required)
    - Consent checkboxes:
      - I consent to my information being stored securely for event purposes. (required)
      - I consent to share my resume and contact information with participating employers. (optional)
      - I have read and agree to the event's terms and conditions. (required)
    - Additional Comments (optional)
  - Validation and friendly error messages on the registration form.

- **Post-Submission Experience**
  - Confirmation screen (e.g., “You’re registered!”) after successful registration.
  - Optional confirmation email (via Supabase + external email provider or Supabase Edge Functions).
  - Optional basic account dashboard with view of registration status.

- **QR Code / Event Check-in (Nice-to-have)**
  - Generate QR code for participant check-in.
  - Associate QR code with the registration record in Supabase.
  - Optional dashboard showing number of events attended.

- **Admin / Organizer Tools (Nice-to-have)**
  - Admin-only view to list registrations and export data (CSV).
  - Search and filter registrants.
  - View consent flags and resume links.

- **General UX / Visuals / Animations**
  - Modern, responsive layout with similar structure and feel to the current site.
  - Smooth transitions and micro-animations for navigation, hero, and content sections.
  - Strong branding consistent with SMU + AWS Cloud Quest (colors, typography, imagery).
  - Mobile-first, accessible design.

### Feature Categorization

- **Must-Have Features**
  - Marketing site pages:
    - Home / About
    - Event Details / Calendar
    - Speakers
    - Team
    - Sponsors
    - Contact
  - Authentication (Supabase Auth) and account creation for students.
  - Registration flow gated behind authentication.
  - Registration form with all required fields and validation.
  - Registration data stored in Supabase (Postgres).
  - Confirmation screen after registration submission.
  - Responsive layout and navigation similar to current static site.
  - Deployment to Vercel with environment-specific configuration for Supabase.

- **Should-Have Features**
  - Resume upload stored in Supabase Storage with link in the DB.
  - Confirmation email upon registration.
  - Basic user dashboard to review registration info.
  - Organizer-friendly data model (e.g., simple views for export).
  - Smooth section-based animations (hero fade, scroll reveals, button hover states).

- **Nice-to-Have Features**
  - QR code generation and check-in scanning flow.
  - Analytics dashboard (registrations per day, majors, universities).
  - Admin interface within the same app for managing registrants.
  - More advanced animations (e.g., background slideshows, parallax) if performance remains good.

## Recommended Tech Stack

### Frontend

- **Framework:** Next.js (with App Router) + React + TypeScript  
  - Strong support for server-side rendering (SSR) and static site generation (SSG) for marketing pages.  
  - First-class Vercel deployment, good developer experience, and excellent TypeScript support.  
  - Easy integration with Supabase via server components / server actions / route handlers.
  - **Documentation:**  
    - Next.js Docs: <https://nextjs.org/docs>

- **Language:** TypeScript  
  - Type safety for components, data models, and Supabase API interactions.  
  - Better maintainability and fewer runtime bugs.
  - **Documentation:**  
    - TypeScript Handbook: <https://www.typescriptlang.org/docs/>

- **Styling:** Tailwind CSS  
  - Utility-first CSS framework with great ergonomics for modern responsive UIs.  
  - Works seamlessly with Next.js and shadcn/ui.  
  - **Documentation:**  
    - Tailwind CSS Docs: <https://tailwindcss.com/docs>

- **Component Library:** shadcn/ui  
  - Headless but styled components built on top of Radix UI + Tailwind.  
  - Easily themeable to match SMU + AWS Cloud Quest branding.  
  - Ideal for building forms, navigation, dialogs, and dashboard components quickly.  
  - **Documentation:**  
    - shadcn/ui Docs: <https://ui.shadcn.com>

- **Optional Animations:** Framer Motion or Tailwind transitions  
  - For hero transitions, scroll animations, and micro-interactions.  
  - **Documentation:**  
    - Framer Motion: <https://www.framer.com/motion/>

### Backend / API

- **Backend Runtime:** Next.js API Routes / Route Handlers (App Router)  
  - Lightweight backend directly in the Next.js app for handling form submissions and secure server-side operations with Supabase.  
  - Can leverage server actions for registration forms if using the latest app router capabilities.

- **Auth & Data Layer:** Supabase (Auth + Postgres + Storage)  
  - Managed Postgres database with full SQL and row-level security.  
  - Supabase Auth provides email/password, magic links, and OAuth if needed.  
  - Supabase Storage for resume file uploads tied to registration records.  
  - **Documentation:**  
    - Supabase Docs: <https://supabase.com/docs>  
    - Supabase JavaScript Client: <https://supabase.com/docs/reference/javascript>

### Database

- **Database:** Supabase Postgres  
  - Cloud-hosted Postgres instance managed by Supabase.  
  - Central store for users and registration data.  
  - Supports analytics queries and exports for organizers.
  - **Documentation:**  
    - Supabase Database: <https://supabase.com/docs/guides/database>

### Additional Tools

- **Form Handling & Validation:**  
  - `react-hook-form` + `zod` for type-safe form validation in TypeScript.  
  - **Docs:**  
    - React Hook Form: <https://react-hook-form.com/>  
    - Zod: <https://zod.dev/>

- **Deployment:** Vercel  
  - Zero-config deployment for Next.js with previews and environment variable management.  
  - Integration with GitHub for CI/CD.  
  - **Documentation:**  
    - Vercel Next.js Deployment: <https://vercel.com/docs/frameworks/nextjs>

- **Email (Optional):**  
  - Supabase Edge Functions + a provider like Resend or SendGrid.  
  - Used for registration confirmation emails.  

## Implementation Stages

### Stage 1: Foundation & Setup

**Duration:** ~2–3 days  
**Dependencies:** None

#### Sub-steps

- [ ] **Project scaffolding**
  - Initialize a new Next.js app using TypeScript and the App Router.
  - Configure base `tsconfig.json`, ESLint, and Prettier for a consistent code style.
  - Set up environment variables for Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, service role key for server-side operations).

- [ ] **Tailwind CSS and shadcn/ui setup**
  - Install and configure Tailwind CSS, including base styles and `globals.css`.
  - Initialize shadcn/ui, set up base theme, and generate fundamental components (`Button`, `Input`, `Textarea`, `Card`, `Navbar`, `Dialog`, `Toaster`).
  - Create a theme file that encodes SMU + AWS color palette and typography.

- [ ] **Supabase project and schema foundation**
  - Create a Supabase project and configure Auth (email-based sign-up/sign-in).
  - Define the core database tables:
    - `profiles` (user profile linked to Supabase auth user).
    - `registrations` with all form fields and consent flags.
    - `files` or a field on `registrations` to store resume storage path.
  - Implement basic Row-Level Security (RLS) policies allowing users to read/write only their own data and admins to read all records.

- [ ] **Supabase client integration**
  - Set up a reusable Supabase client for server components (and a separate one for client components if needed).
  - Implement helper utilities for protected server actions and API routes.

- [ ] **Core layout and navigation shell**
  - Implement the main layout (`app/layout.tsx`) with:
    - Top navigation bar with logo and links matching the current site (Home, Speakers, Our Team, Calendar, Sponsors, Contact, Register).
    - Global footer with social media icons and SMU Cloud Quest branding.
  - Ensure mobile navigation (hamburger menu / sheet) is functional.

### Stage 2: Core Features

**Duration:** ~4–6 days  
**Dependencies:** Stage 1 completion

#### Sub-steps

- [ ] **Home / About page**
  - Recreate the hero section in Next.js with responsive typography and CTAs (Register Now, View Schedule).
  - Implement the “About the event” content with modern, readable layout using shadcn components and Tailwind utilities.
  - Add the venue highlight and event banner sections with cards or feature blocks.
  - Implement a simple countdown or static “Starting February 15, 2026” highlight.

- [ ] **Speakers page**
  - Design a speaker card component (photo, name, title, company, session topic).
  - Implement the `/speakers` route pulling data from a local JSON file or static data first (can be moved to Supabase later if needed).
  - Ensure grid is responsive and accessible.

- [ ] **Team page**
  - Implement the `/our-team` route with team member cards (photo, role, short bio).
  - Group by role (e.g., Tech, Marketing) if helpful.

- [ ] **Sponsors page**
  - Implement the `/sponsors` route with sponsor tier sections.
  - Display sponsor logos using the `public/` image assets migrated from the existing `res/images` directory.
  - Add links to sponsor sites where applicable.

- [ ] **Calendar / Schedule page**
  - Implement `/calendar` route that displays events in a structured list or simple calendar layout.
  - Show date, time, title, and location per event.
  - Optionally link to additional details or associated speaker.

- [ ] **Contact page**
  - Implement `/contact` route with a simple contact form or clear contact information.
  - Optionally wire the form to Supabase (e.g., `contact_messages` table) or send an email to organizers.

- [ ] **Auth pages and flow**
  - Implement sign-in and sign-up flows using Supabase Auth (email + password or magic link).
  - Ensure authenticated state is accessible in layouts and components (e.g., via `cookies()` and Supabase server client).
  - Add “Sign in” / “Account” entry point in the navigation or register CTA flow.

- [ ] **Registration page and form**
  - Implement `/register` route that:
    - Redirects unauthenticated users to sign-in/sign-up.
    - Shows the registration form for authenticated users.
  - Build the registration form using shadcn form components, `react-hook-form`, and `zod` validation.
  - Support all required fields and checkboxes, with clear error messages.
  - Wire the form submission to a server action or route handler that:
    - Creates or updates the user’s record in `profiles`.
    - Inserts a row in `registrations` with all captured data.

- [ ] **Post-submission confirmation**
  - Display a “You’re registered!” confirmation page or modal.
  - Provide a clear route back to the home page or dashboard.

### Stage 3: Advanced Features

**Duration:** ~3–5 days  
**Dependencies:** Stage 2 completion

#### Sub-steps

- [ ] **Resume upload via Supabase Storage**
  - Extend the registration form to accept an optional resume file upload.
  - Upload the file to Supabase Storage in a per-user folder.
  - Store the file URL or path on the registration record.
  - Add file size/type validation and basic security checks.

- [ ] **User dashboard**
  - Implement a `/dashboard` route for authenticated users.
  - Show registration status, submitted information, and a link to re-download their uploaded resume.
  - Provide an option to edit or update registration before a certain cutoff date (if desired).

- [ ] **QR code generation (optional)**
  - Generate a unique registration ID or token per registrant.
  - Use a QR code library (e.g., `qrcode.react`) to generate a scannable code linked to that ID.
  - Display the QR code on the dashboard for event check-in.

- [ ] **Organizer / admin tooling (optional)**
  - Implement admin-only routes guarded by an “admin” flag in the `profiles` table.
  - Create a basic admin list view of registrations with filters and CSV export.
  - Add search by name, email, and major.

- [ ] **Confirmation emails (optional)**
  - Implement a Supabase Edge Function or background job to send a registration confirmation email.
  - Include event details and link to the user dashboard in the email.

### Stage 4: Polish, Optimization, and Deployment

**Duration:** ~2–3 days  
**Dependencies:** Stage 3 completion (or after core Stage 2 if timeline is constrained)

#### Sub-steps

- [ ] **UI/UX polish and animations**
  - Add smooth hover states, transitions, and scroll-based animations using Tailwind and/or Framer Motion.
  - Ensure visual hierarchy and spacing are refined across breakpoints.
  - Double-check that the design closely matches the look and feel of the current static site, with a modernized aesthetic.

- [ ] **Accessibility improvements**
  - Add proper semantic HTML tags, aria attributes, labels, and focus states.
  - Ensure all interactive elements are keyboard navigable.
  - Perform basic screen reader tests for major flows (navigation, registration).

- [ ] **Performance and SEO**
  - Optimize image assets via Next.js Image component and appropriate sizes.
  - Configure metadata (title, description, Open Graph tags) per page.
  - Evaluate Lighthouse scores and address major performance or accessibility warnings.

- [ ] **Testing and quality assurance**
  - Implement basic unit tests for key components and utilities (e.g., validation schemas).
  - Add a few integration tests for registration flow (if time permits).
  - Manually test all core flows on mobile and desktop browsers.

- [ ] **Vercel deployment and environment configuration**
  - Connect the GitHub repository to Vercel and set up automatic deployments from the main branch.
  - Configure environment variables for Supabase in Vercel.
  - Verify that all flows work correctly in the Vercel environment.

- [ ] **Handover and documentation**
  - Document key environment variables, Supabase schema, and deployment steps.
  - Update `/Docs` to reflect any changes to architecture or flows made during implementation.

## Resource Links

- **Next.js**
  - Next.js Docs: <https://nextjs.org/docs>

- **TypeScript**
  - TypeScript Docs: <https://www.typescriptlang.org/docs/>

- **Tailwind CSS**
  - Tailwind Docs: <https://tailwindcss.com/docs>

- **shadcn/ui**
  - shadcn/ui Docs: <https://ui.shadcn.com>

- **Supabase**
  - Supabase Docs: <https://supabase.com/docs>
  - Supabase JavaScript Client Docs: <https://supabase.com/docs/reference/javascript>

- **React Hook Form & Zod**
  - React Hook Form: <https://react-hook-form.com/>
  - Zod: <https://zod.dev/>

- **Vercel**
  - Vercel Next.js Guide: <https://vercel.com/docs/frameworks/nextjs>


