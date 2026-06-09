# Carbon Nexus

Premium Next.js frontend prototype for sustainability, ESG, carbon credits, and dMRV workflows.

## Stack

- Next.js 15 App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- React Hook Form
- Zod
- Lucide React

## Routes

- `/` Landing page
- `/login` Mock authentication
- `/signup` Signup flow
- `/dashboard` User dashboard
- `/admin` Admin dashboard
- `/dmrv` dMRV monitoring
- `/calculator` Carbon calculator
- `/marketplace` Carbon marketplace
- `/projects/register` Project registration wizard
- `/projects/verification` Verification workflow
- `/esg` ESG analytics
- `/leaderboard` Performance rankings
- `/profile` User profile
- `/settings` Settings

## Notes

- Authentication is mock client-side state stored in `localStorage`.
- Users only see their own portfolio context in the dashboard and profile screens.
- All charts and tables are powered by realistic mock data in `data/mock-data.ts`.
- The UI is styled to resemble a premium enterprise SaaS product.
- If you deploy from a GitHub repo, set the Vercel root directory to this folder: `outputs/premium-sustainability-dmrv-platform`.
- Optional: set `NEXT_PUBLIC_SITE_URL` in Vercel to your deployed URL so metadata and preview links resolve cleanly.
