# UI & UX Design Guidelines – SMU AWS Cloud Quest Website

## Design System Overview

The goal is to replicate the **spirit and flow** of the current static site while modernizing the implementation and visual polish using Next.js, Tailwind CSS, and shadcn/ui. The experience should feel:

- Bold and collegiate (SMU branding).
- Tech-forward and modern (AWS + cloud focus).
- Energetic and approachable (hackathon-style event).

## Branding, Colors, and Typography

### Color Palette

- **Primary Red (SMU):**
  - Used for key headings, accents, and some buttons.
  - Example: `#cc0000` (from existing site hero).

- **Primary Blue (AWS / Action):**
  - Used for primary CTAs like “Register Now”.
  - Example: `#1E4F9C`.

- **Neutrals:**
  - **Dark Gray:** For main body text and some backgrounds (e.g., `#1f2933` / Tailwind `gray-800`).
  - **Light Gray / Off-White:** For backgrounds and dividers (`#f7fafc` / Tailwind `gray-50`).

- **Accent Colors:**
  - Subtle use of another blue/teal for tags or badges if needed.

Tailwind’s theme should be extended to include these as named colors (e.g. `brand.red`, `brand.blue`).

### Typography

- **Primary Display Font:** Serif-like hero font similar to the existing site’s "SMU" heading.
  - Keep large serif heading for the “SMU” text in hero (e.g., `EB Garamond`).

- **Body & UI Font:** Modern sans-serif for legibility and UI components.
  - Use a system such as `Inter`, `SF Pro`, or Tailwind’s default sans.

- **Hierarchy:**
  - Hero H1: Very large, bold, uppercase serif (SMU).
  - H2/H3: Sans-serif, uppercase or small-caps for sections.
  - Body: Sans-serif, relaxed line height for readability.

## Layout & Page Structure

### Navigation

- **Desktop:**
  - Top fixed navigation bar with the SMU Cloud Quest logo on the left.
  - Navigation links on the right: About, Speakers, Our Team, Calendar, Sponsors, Contact, Register.
  - “Register” styled as a primary button.

- **Mobile:**
  - Collapsed hamburger menu on the right.
  - Slide-out or dropdown navigation using shadcn/ui `Sheet` or `Dialog`.
  - “Register” remains visually emphasized in the mobile menu.

### Home / About Page

- **Hero Section:**
  - Full-height hero with background image (campus or abstract cloud graphic).
  - Overlaid content centered both vertically and horizontally:
    - “SMU” large serif text.
    - “AWS CLOUD QUEST COMPETITION” in all caps sans-serif.
    - Event date text (e.g., “Starting February 15, 2026”).
    - “Hosted by Southern Methodist University” line.
    - Two CTAs: **Register Now** (primary), **View Schedule** (secondary).
  - Mobile behavior: maintain readability by reducing font sizes and stacking CTAs vertically.

- **About Section:**
  - Two-column layout on desktop:
    - Left: text explaining SMU Cloud Quest (from scope).
    - Right: card-style panel summarizing AWS Cloud Quest with a “Learn More” button.
  - Stacked vertically on mobile.

- **Venue & Event Banner:**
  - A banded section highlighting:
    - Date & Time.
    - Venue (SMU, Dallas, TX 75205).
    - A CTA to view the flyer or map.

- **Countdown / Parallax (Optional):**
  - A simplified countdown section can be implemented using a clean, minimal layout rather than heavy parallax.

### Content Pages

- **Speakers Page:**
  - Grid of speaker cards with photo, name, role, and session title.
  - Cards should be easily scannable and maintain consistent aspect ratios for images.

- **Team Page:**
  - Grid or grouped sections by role (Tech, Marketing, etc.).
  - Emphasis on faces and names; short bios in smaller type.

- **Sponsors Page:**
  - Sections grouped by tier (e.g. “Title Sponsor”, “Supporting Sponsors”).
  - Logos should be displayed on neutral backgrounds with consistent sizing.
  - Optional hover effects to subtly elevate or scale logos.

- **Calendar Page:**
  - Simple chronological list or calendar-like grid of events for the week.
  - Each item: title, date, time, brief description, location.

- **Contact Page:**
  - Structured contact form with clear labels and helper text.
  - Alternatively, a simple section with email + social links for quick access.

## Registration & Auth Flows (UX)

### Entry Points

- **Home Page CTA:**
  - “Register Now” must be prominently placed in the hero.
  - On click:
    - If unauthenticated: route to sign-in/sign-up, then forward to `/register`.
    - If authenticated: route directly to `/register`.

- **Navigation “Register” Link:**
  - Same behavior as hero CTA.

### Authentication UX

- Provide clear options for:
  - Sign-in with existing account.
  - Create new account (sign-up).

- Use friendly messaging and error states:
  - “Check your email for a login link” (if using magic link).
  - Clear validation messages for incorrect credentials or missing fields.

### Registration Form UX

- **Form Layout:**
  - Use stepwise grouping or logical sections:
    - Personal Info (Name, Email, University, Major, Grade).
    - Event Details (T-shirt size, Dietary Restrictions, Age).
    - Resume Upload.
    - Consents and Additional Comments.

- **Validation & Feedback:**
  - Required fields visually indicated (e.g., asterisk or label styling).
  - Inline validation errors near each field.
  - Form-level error summary at the top if submission fails.
  - Disable submit button while submitting; show a subtle loading indicator.

- **Resume Upload:**
  - Clear size and format guidance (e.g., “PDF only, max 5MB”).
  - Display filename and allow re-upload before submit.

- **Consent Checkboxes:**
  - Short labels plus optional tooltips or helper text.
  - Block submission if required consents are unchecked and explain why.

- **Confirmation:**
  - After successful submission, route to a confirmation screen.
  - Display:
    - Success state (“You’re registered!”).
    - Key details (date, venue).
    - Link to dashboard (if implemented) and to the home page.

## Components and Interaction Patterns

### Component Library (shadcn/ui)

- **Buttons:**
  - Primary: solid blue, used for main CTAs like “Register Now”, “Submit Registration”.
  - Secondary: outlined or neutral, used for secondary actions (“View Schedule”).
  - Ghost/Text: minimal style for less critical actions (e.g., “Back to home”).

- **Forms:**
  - Use shadcn `Form`, `Input`, `Textarea`, `Select`, `Checkbox` components.
  - Maintain consistent spacing and max-width for form containers.
  - Labels and helper text should have consistent typography and color.

- **Cards:**
  - Reuse card styling for speakers, team, sponsors, and event info blocks.
  - Provide hover elevation or subtle scale transform on desktop.

- **Modals/Dialogs (Optional):**
  - Use for confirmation steps or details (e.g., event flyer preview, QR code preview).

### Animations & Motion

Focus on **subtle, performant** animations:

- **Hero:**
  - Fade-in and slight upward motion for text elements on load.
  - Smooth hover and focus states on CTAs.

- **Scroll-based reveals:**
  - Sections fade/slide into view as they enter the viewport (e.g., using Framer Motion or a lightweight intersection observer).

- **Buttons & Cards:**
  - Short transitions on hover for background color, border, or scale.

Avoid:

- Overly heavy parallax or long-running animations that could harm performance.
- Animations that interfere with readability or accessibility.

## Responsive Design

- **Mobile-first approach:**
  - Design layouts starting from small screens upwards.

- **Breakpoints:**
  - Use Tailwind defaults (`sm`, `md`, `lg`, `xl`) with careful layout changes:
    - Stacked vertical layouts on small screens.
    - Two-column layouts (text + card) at `md` and above.
    - Multi-column grids for speakers and sponsors at `lg` and above.

- **Navigation:**
  - Ensure the mobile nav is easy to use with one hand.
  - Avoid tiny tap targets or overly dense menus.

## Accessibility Standards

- **Color Contrast:**
  - Ensure text over background images maintains WCAG AA contrast.
  - Avoid using color alone to convey meaning.

- **Keyboard Navigation:**
  - All interactive elements must be reachable and activatable via keyboard.
  - Visible focus outlines must be preserved or custom-tailored (but never removed).

- **ARIA & Semantics:**
  - Use landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) for page structure.
  - Use `aria-label`s where icon-only buttons are present (e.g., hamburger menu).
  - Associate every form input with a label.

- **Forms:**
  - Provide descriptive error messages and associate them with input controls via `aria-describedby`.
  - Use native elements where possible for maximum compatibility.

## User Journey Maps (High-Level)

### Primary Journey: Learn → Register

1. **Landing on Home Page**
   - User sees hero (title, date, CTAs).
   - Scrolls through About and event details.
2. **Decision to Register**
   - Clicks “Register Now”.
3. **Authentication**
   - If new user: sign-up (email + password or magic link), then redirected to registration.
   - If existing: sign-in, then redirected to registration.
4. **Registration**
   - Completes multi-section form.
   - Uploads optional resume.
   - Agrees to required consents.
   - Submits and sees confirmation screen.

### Secondary Journey: Explore Content

1. **Home → Speakers**
   - Browses speaker list to gauge value.
2. **Home → Calendar**
   - Reviews schedule to see how it fits their week.
3. **Home → Sponsors / Team**
   - Gains trust seeing professional backing and student organizers.
4. **Then returns to “Register Now” CTA.**

### Organizer Journey (If Admin Tools Implemented)

1. **Organizer signs in with admin account.**
2. **Navigates to admin dashboard.**
3. **Views registrations, filters, and exports data.**
4. **Uses data to plan logistics (t-shirts, catering, etc.).**

## Design Tool Integration

If a Figma (or similar) design file is created:

- Maintain:
  - Components for shared elements (buttons, cards, nav, forms).
  - Typography and color styles mapped to Tailwind tokens.
  - Layout grids for major breakpoints.

- Ensure:
  - Naming in Figma corresponds to React component names where practical.
  - Any design updates are reflected in Tailwind theme and shadcn/ui configuration.

## Alignment with Implementation

- The **Implementation Plan** and **Project Structure** documents should be used together with this UI/UX guide:
  - New components must follow the color, typography, and motion guidelines defined here.
  - New routes or flows should fit within the established navigation and user journeys.
  - Accessibility and responsive behavior must be considered from the start for each new feature.


