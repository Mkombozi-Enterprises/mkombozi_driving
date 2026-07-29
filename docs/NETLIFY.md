# Deploy Mkombozi to Netlify (Free tier)

This app is **Next.js App Router** with SSR/API routes and an optional Supabase CMS. Netlify Free supports this via the official Next.js plugin.

## 1. Prerequisites

- GitHub/GitLab/Bitbucket repo (or Netlify CLI drag-and-drop from a built folder — Git is recommended)
- Supabase project (for CMS + photo uploads on serverless)
- Run SQL once: `supabase/cms-setup.sql` in the Supabase SQL Editor

## 2. Connect the site

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Pick the `mkombozi_driving` repository
3. Build settings should pick up `netlify.toml` automatically:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (plugin handles this)
   - **Plugin:** `@netlify/plugin-nextjs`

## 3. Environment variables (Site settings → Environment variables)

| Variable | Notes |
|----------|--------|
| `CMS_BACKEND` | `supabase` |
| `SUPABASE_URL` | e.g. `https://aojhvlcesnviqnytguge.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_…` |
| `SUPABASE_SECRET_KEY` | `sb_secret_…` (secret — never commit) |
| `SUPABASE_JWKS_URL` | `https://…supabase.co/auth/v1/.well-known/jwks.json` |
| `ADMIN_PASSWORD` | CMS login password |
| `CMS_SECRET` | Long random string for session cookies |
| `RESEND_API_KEY` | Optional enquiry email |
| `ENQUIRY_NOTIFY_TO` | Optional staff email |

Scopes: set for **Production** (and **Preview** if you want CMS on deploy previews).

## 4. Deploy

- Push to `main` → Netlify builds automatically, **or**
- Netlify CLI:

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify env:import .env.local   # careful: only if secrets are intended for Netlify
netlify deploy --prod
```

## 5. Free-tier notes

| Feature | Free tier behaviour |
|---------|---------------------|
| Next.js SSR / App Router | Supported via plugin |
| API routes (`/api/enquiry`) | Work as serverless functions |
| CMS admin (`/admin`) | Works if Supabase env is set |
| File writes (`content/site.json`, `data/*.jsonl`) | **Not durable** on serverless — use **Supabase** for CMS |
| Build minutes / bandwidth | Subject to Netlify Free quotas |
| Custom domain | Supported (free tier includes HTTPS) |

## 6. After first deploy

1. Open `https://<yoursite>.netlify.app`
2. Open `/admin` → log in → **Save changes** once so Supabase has the latest content (including Hudson + resources)
3. Test enquiry form and resource PDF download

## 7. Local vs production content

- Local may use `content/site.json` as a mirror when Supabase is configured
- Production should rely on **Supabase** (`CMS_BACKEND=supabase`)

## 8. Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build fails on Next | Check Node 20 in `netlify.toml`; clear cache & retry |
| Blank / 500 on `/` | Check function logs; ensure Supabase URL/keys valid |
| CMS save fails | Secret key + `site_content` table exist? |
| Photo upload fails | `cms-media` bucket public + PDF/image MIME types |
| Old content on site | Save from `/admin` or revalidate by redeploying |
