# Deploy Mkombozi to Netlify (Free tier)

This app is **Next.js App Router** with SSR/API routes and an optional hosted CMS. Netlify Free supports this via the official Next.js plugin.

## 1. Prerequisites

- GitHub/GitLab/Bitbucket repo  
- Hosted database project with `supabase/cms-setup.sql` applied  
- Env secrets ready (do not put them in git)

## 2. Connect the site

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Pick the `mkombozi_driving` repository
3. Build settings come from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (plugin handles this)
   - **Node:** **22** (required for current hosted client libraries)
   - **Plugin:** `@netlify/plugin-nextjs`

## 3. Environment variables

Site settings → Environment variables (Production + Preview as needed):

| Variable | Notes |
|----------|--------|
| `ADMIN_PASSWORD` | CMS login (min 8 chars; unique) |
| `CMS_SECRET` | Long random string for session cookies |
| `CMS_BACKEND` | Hosted mode (see CMS docs) |
| `SUPABASE_URL` | Project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key |
| `SUPABASE_SECRET_KEY` | Secret key |
| `SUPABASE_JWKS_URL` | JWKS URL |
| `RESEND_API_KEY` | Optional enquiry email |
| `ENQUIRY_NOTIFY_TO` | Optional staff email |

**Never** put secret values in README, source, or `netlify.toml`.

`netlify.toml` omits non-secret config keys from secrets scanning (`CMS_BACKEND`, public URL env names). Real secrets must not appear in the repo.

## 4. Deploy

- Push to `main` → Netlify builds automatically, **or**
- Netlify CLI:

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 5. Free-tier notes

| Feature | Free tier behaviour |
|---------|---------------------|
| Next.js SSR / App Router | Supported via plugin |
| API routes (`/api/enquiry`) | Work as serverless functions |
| CMS admin (`/admin`) | Works if env is set |
| File writes (`content/site.json`, `data/*.jsonl`) | **Not durable** — use hosted CMS |
| Build minutes / bandwidth | Subject to Free quotas |

## 6. After first deploy

1. Open the site URL  
2. Open `/admin` → log in → **Save changes** once so remote content is seeded  
3. Test enquiry form and resource PDF download  

## 7. Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build fails on secrets scan | Ensure no password/URL secrets are hardcoded in repo; Node 22 + omit keys already set |
| Build fails on Next | Clear cache & retry; confirm Node 22 |
| CMS save fails | Secret key + `site_content` table exist? |
| Photo upload fails | `cms-media` bucket public + allowed MIME types |
