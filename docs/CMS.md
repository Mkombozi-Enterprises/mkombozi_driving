# Mkombozi CMS

## Architecture

```
Browser  →  Next.js /admin UI
                │
                ▼
         Server Actions (password cookie)
                │
        ┌───────┴────────┐
        ▼                ▼
 content/site.json    Supabase site_content (jsonb)
 (fallback / local)   + Storage cms-media (photos)
```

Still **100% Next.js**. Supabase is the database/storage layer, not a second app.

## File mode

- Set `CMS_BACKEND=file` or omit Supabase secret
- Writes `content/site.json`

## Supabase mode (implemented)

Uses **`@supabase/server`** (`createAdminClient` from `@supabase/server/core`) with **new** API keys:

| Env | Purpose |
|-----|---------|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_…`) |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_…`) for CMS write + Storage |
| `SUPABASE_JWKS_URL` | Optional JWKS URL |

### 1) Run SQL once

In Supabase → **SQL Editor**, run:

[`supabase/cms-setup.sql`](../supabase/cms-setup.sql)

Creates:

- `public.site_content` (single-row JSON CMS)
- Public bucket `cms-media` for instructor images

### 2) Env (`.env.local`)

```bash
CMS_BACKEND=supabase
SUPABASE_URL=https://aojhvlcesnviqnytguge.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...          # full key from dashboard
SUPABASE_JWKS_URL=https://aojhvlcesnviqnytguge.supabase.co/auth/v1/.well-known/jwks.json
ADMIN_PASSWORD=your-strong-password
CMS_SECRET=long-random-string
```

When URL + secret are set, the app prefers Supabase (unless `CMS_BACKEND=file`).

### 3) Instructor photo upload

1. Open `/admin` → **Instructors**
2. Choose an image (JPEG/PNG/WebP/GIF, max 5 MB)
3. File is uploaded to Storage `cms-media/instructors/…`
4. Public URL is filled into the instructor `photo` field
5. Click **Save changes** to write the CMS document

Public site shows the photo when `photo` is set; otherwise the silhouette fallback.

## Security

- `/admin` is password-gated (HTTP-only cookie, HMAC)
- Never commit `.env.local` or secret keys
- Admin has `robots: noindex`

## Adding new editable fields

1. Extend `SiteContent` in `src/lib/cms/types.ts`
2. Add default in `default-content.ts`
3. Add form fields in `AdminDashboard.tsx`
4. Use via `useSiteContent()` on the public site
