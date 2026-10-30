# Caldren Technologies website

Marketing site and quote system for Caldren Technologies.

## How it runs

- **Hosting:** Cloudflare Workers, project `screenshot-to-spark-1719`. Every push to `main` on GitHub rebuilds and deploys the site.
- **Database and admin login:** Supabase project `pvetybdqnedaupiwngcv`. The table setup is in `drizzle/migrations/`.
- **Quote emails:** Resend.

## Settings

Secrets are stored in Cloudflare under **Workers & Pages > screenshot-to-spark-1719 > Settings > Variables and Secrets**:

| Name | What it is |
|---|---|
| `SUPABASE_URL` | Supabase project address |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key (server only) |
| `RESEND_API_KEY` | Resend key for quote emails |
| `EMAIL_FROM` | Sender shown on quote emails |

The browser uses the `VITE_SUPABASE_*` values in `.env`, which are public.

## Editing content

Company info, services, projects and navigation live in `src/content/site.ts`.

## Local development

You need Node.js 22+ or Bun.

```sh
git clone https://github.com/J1towing1980/screenshot-to-spark-1719.git
cd screenshot-to-spark-1719
bun install
bun run dev
```
