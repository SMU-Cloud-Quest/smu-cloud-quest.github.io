# SMU Cloud Quest Website

A modern Next.js web application for the SMU AWS Cloud Quest Competition, featuring user registration, event information, and cloud computing resources.

## Features

- **Marketing Pages**: Home, Speakers, Team, Calendar, Sponsors, Contact
- **User Authentication**: Sign up, login, password reset via Supabase Auth
- **Registration System**: Multi-step form with validation, resume upload support
- **User Dashboard**: View registration status and details
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Authentication & Database**: Supabase
- **Form Validation**: React Hook Form + Zod
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloud-quest-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` (if exists) or create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Run the SQL in `lib/db/schema.sql` in your Supabase SQL Editor to create:
   - `profiles` table
   - `registrations` table
   - `contact_messages` table
   - Required RLS policies
   - Triggers for auto-profile creation

5. **Set up Storage (for resume uploads)**
   
   **IMPORTANT**: The resume upload feature requires a storage bucket to be created.
   
   In Supabase Dashboard > Storage:
   1. Click "Create bucket"
   2. Name it exactly: `resumes`
   3. Set it as **Private** (not public)
   4. Click "Create bucket"
   5. Go to the SQL Editor and run the storage RLS policies from `lib/db/schema.sql` (lines 187-225)
   
   **Note**: If the bucket is not created, registrations will still work but resume uploads will fail silently. The registration will complete successfully without the resume.

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
cloud-quest-webapp/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── calendar/          # Schedule page
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   ├── our-team/          # Team page
│   ├── register/          # Registration flow
│   ├── speakers/          # Speakers page
│   └── sponsors/          # Sponsors page
├── components/
│   ├── cards/             # Card components (speaker, team, etc.)
│   ├── layout/            # Layout components (nav, footer)
│   ├── registration/      # Registration form components
│   ├── sections/          # Page sections (hero, about)
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── config/            # Site and navigation config
│   ├── data/              # Static data (team, sponsors, etc.)
│   ├── db/                # Database schema
│   ├── supabase/          # Supabase client setup
│   └── validation/        # Zod validation schemas
├── public/images/         # Static images
└── types/                 # TypeScript type definitions
```

## Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. Deploy

### Manual

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/publishable key |

## Database Setup

Run the SQL from `lib/db/schema.sql` in your Supabase SQL Editor. This creates:

- **profiles**: User profiles linked to auth
- **registrations**: Competition registration data
- **contact_messages**: Contact form submissions

All tables include Row Level Security (RLS) policies.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Contact

For questions about SMU Cloud Quest, email smucloudquest@gmail.com
