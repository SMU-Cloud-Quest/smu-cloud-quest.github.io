# Project Structure – SMU AWS Cloud Quest Website (Next.js, TypeScript)

## Root Directory

```text
smu-aws-cloud-quest/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                 # Home / About
│   │   ├── speakers/
│   │   │   └── page.tsx
│   │   ├── our-team/
│   │   │   └── page.tsx
│   │   ├── calendar/
│   │   │   └── page.tsx
│   │   ├── sponsors/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── (components)/            # Marketing-only section components
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── layout.tsx               # Shared auth layout
│   ├── (app)/
│   │   ├── register/
│   │   │   └── page.tsx             # Protected registration form
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Optional user dashboard
│   │   └── layout.tsx               # Shared app layout for authenticated routes
│   ├── api/
│   │   ├── registrations/
│   │   │   └── route.ts             # REST-style API (optional, if not using server actions)
│   │   └── contact/
│   │       └── route.ts             # Contact form handler (optional)
│   ├── layout.tsx                   # Root layout (navigation + footer)
│   └── globals.css                  # Tailwind base + global styles
├── components/
│   ├── layout/
│   │   ├── main-nav.tsx             # Top navigation
│   │   ├── mobile-nav.tsx           # Mobile drawer/nav
│   │   ├── site-footer.tsx          # Footer
│   │   └── providers.tsx            # Global providers (e.g. theme, Toaster)
│   ├── sections/
│   │   ├── hero.tsx                 # Home hero section
│   │   ├── about.tsx                # About content block
│   │   ├── venue.tsx                # Venue block
│   │   ├── event-banner.tsx         # Date/Time/Venue banner
│   │   └── countdown.tsx            # Optional countdown component
│   ├── registration/
│   │   ├── registration-form.tsx    # Full registration form
│   │   └── registration-summary.tsx # Confirmation / summary
│   ├── cards/
│   │   ├── speaker-card.tsx
│   │   ├── team-card.tsx
│   │   └── sponsor-card.tsx
│   └── ui/                          # shadcn/ui components (generated)
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── checkbox.tsx
│       ├── select.tsx
│       ├── form.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── alert.tsx
│       └── ...                      # additional shadcn/ui primitives
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # Browser/client Supabase client
│   │   ├── server-client.ts         # Server-side Supabase client helper
│   │   ├── auth.ts                  # Auth helpers (get user, require auth)
│   │   └── types.ts                 # Supabase-generated types (if using codegen)
│   ├── validation/
│   │   ├── registration-schema.ts   # Zod schema for registration
│   │   └── contact-schema.ts        # Zod schema for contact form
│   ├── utils/
│   │   ├── env.ts                   # Runtime-safe env var access
│   │   ├── formatting.ts            # Shared formatting helpers
│   │   └── date.ts                  # Date / countdown helpers
│   └── config/
│       ├── site.ts                  # Site-wide constants (title, URLs)
│       └── navigation.ts            # Navigation links config
├── public/
│   ├── images/
│   │   ├── hero/                    # Background hero images
│   │   ├── logos/                   # Logos (SMU, AWS, sponsors)
│   │   ├── speakers/                # Speaker headshots
│   │   ├── team/                    # Team photos
│   │   └── misc/                    # Other event images
│   └── favicon.ico
├── types/
│   ├── index.d.ts                   # Global TS types if needed
│   └── models.ts                    # Shared app-level type definitions
├── Docs/
│   ├── Implementation.md
│   ├── project_structure.md
│   └── UI_UX_doc.md
├── .env.local                       # Local env vars (Supabase keys, etc.)
├── next.config.mjs                  # Next.js configuration
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Detailed Structure

### `app/` – Routing and Pages

- **`app/layout.tsx`**
  - Defines the root HTML structure and wraps all routes.
  - Includes the main navigation, footer, and any global providers (e.g., theme, Toaster).

- **`app/(marketing)/`**
  - Contains all public-facing marketing pages:
    - `page.tsx`: Home / About page with hero and section components.
    - `speakers/page.tsx`: Speakers listing page.
    - `our-team/page.tsx`: Team page.
    - `calendar/page.tsx`: Schedule or calendar.
    - `sponsors/page.tsx`: Sponsors showcase.
    - `contact/page.tsx`: Contact page with form or contact info.
  - Uses components from `components/sections`, `components/cards`, and `components/ui`.

- **`app/(auth)/`**
  - Authentication-related routes:
    - `sign-in/page.tsx`: Login form integrated with Supabase Auth.
    - `sign-up/page.tsx`: Account creation form.
    - `layout.tsx`: Lightweight layout for auth pages (centered card, minimal nav).

- **`app/(app)/`**
  - Authenticated application routes:
    - `register/page.tsx`: Registration form route (protected).
    - `dashboard/page.tsx`: Optional dashboard summarizing user registration and QR code.
    - `layout.tsx`: Layout for “app” area (may differ slightly from marketing layout).

- **`app/api/`**
  - Route handlers for API-style endpoints (if not solely using server actions):
    - `registrations/route.ts`: Create/read registration records via JSON HTTP calls.
    - `contact/route.ts`: Handle contact form submissions.
  - All routes here can use the Supabase server client to perform secure database operations.

### `components/` – Reusable Components

- **Layout Components (`components/layout/`)**
  - `main-nav.tsx`: Top navigation bar referencing `lib/config/navigation.ts`.
  - `mobile-nav.tsx`: Mobile drawer/slide-over for navigation.
  - `site-footer.tsx`: Global footer with logos and social links.
  - `providers.tsx`: Wraps the app in providers (e.g. theme, Toaster, Supabase context if needed).

- **Section Components (`components/sections/`)**
  - `hero.tsx`: Hero banner for the home page with title, subtitle, and CTAs.
  - `about.tsx`: About SMU Cloud Quest text and layout.
  - `venue.tsx`: Venue section (location, map link).
  - `event-banner.tsx`: Date/Time/Venue info banner.
  - `countdown.tsx`: Optional countdown to the event.

- **Registration Components (`components/registration/`)**
  - `registration-form.tsx`: Encapsulates all registration fields, validation, and layout.
  - `registration-summary.tsx`: Displays a “You’re registered!” summary and important details.

- **Card Components (`components/cards/`)**
  - `speaker-card.tsx`: Used across speakers pages to display speaker info.
  - `team-card.tsx`: Used across team page.
  - `sponsor-card.tsx`: Display sponsor logo and metadata (tier, link).

- **UI Components (`components/ui/`)**
  - Auto-generated by shadcn/ui.
  - Used as the building blocks for all other components (buttons, inputs, dialogs, etc.).
  - Should remain unmodified when possible; customization done via tokens, Tailwind classes, or wrapper components.

### `lib/` – Application Libraries and Helpers

- **`lib/supabase/`**
  - `client.ts`: Browser-safe Supabase client for client components.
  - `server-client.ts`: Helper that returns a Supabase client bound to the current request context on the server.
  - `auth.ts`: Authentication helpers (e.g., `getCurrentUser`, `requireUser`).
  - `types.ts`: Optional TypeScript types generated from the Supabase schema.

- **`lib/validation/`**
  - `registration-schema.ts`: Zod schema for registration form validation. Shared between client and server.
  - `contact-schema.ts`: Zod schema for the contact form.

- **`lib/utils/`**
  - `env.ts`: Centralized access and validation for environment variables (throws on missing keys in dev).
  - `formatting.ts`: Shared formatting helpers (e.g. name formatting, text truncation).
  - `date.ts`: Date/time helpers (e.g. countdown calculations).

- **`lib/config/`**
  - `site.ts`: Site metadata constants (title, description, URLs, social links).
  - `navigation.ts`: Configuration of primary navigation items and their routes.

### `public/` – Static Assets

- **Images**
  - Hero background imagery in `public/images/hero/`.
  - Logos in `public/images/logos/` (SMU, AWS, sponsors).
  - Headshots for speakers under `public/images/speakers/`.
  - Team member photos under `public/images/team/`.

- **Favicon and Meta Assets**
  - `favicon.ico` and any other necessary PWA/OG imagery.

### `types/` – Shared TypeScript Types

- `models.ts`
  - Core app-level interfaces/types such as `Speaker`, `TeamMember`, `Sponsor`, `ScheduleItem`, `Registration`.
  - Types should align with Supabase DB schema where applicable.

- `index.d.ts`
  - Global TypeScript declarations if required (e.g. custom env types, module declarations).

### Configuration and Build

- **`tsconfig.json`**
  - TypeScript compiler configuration, strictness, and path aliases.

- **`tailwind.config.ts`**
  - Tailwind theme configuration, including brand colors, fonts, spacing, and shadcn presets.

- **`next.config.mjs`**
  - Next.js configuration (e.g., image domains, experimental flags).

- **`postcss.config.mjs`**
  - PostCSS configuration for Tailwind.

- **`.env.local`**
  - Local environment variables, not committed to Git.
  - Expected keys:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never exposed to client)

### Documentation Placement

- **`Docs/Implementation.md`**
  - Overall implementation plan: feature breakdown, tech stack, implementation stages, and resource links.

- **`Docs/project_structure.md`**
  - This file: complete description of the folder and module hierarchy.

- **`Docs/UI_UX_doc.md`**
  - UI/UX guidelines, design system, user flows, and accessibility requirements.

### Tests (Optional / Future)

- A potential testing structure can be:

```text
tests/
├── unit/
│   ├── components/
│   └── lib/
└── integration/
    └── registration-flow.test.tsx
```

- Testing setup can be added later using tools like Jest or Vitest + React Testing Library.


