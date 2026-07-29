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
 content/site.json    Hosted DB (jsonb document)
 (fallback / local)   + object storage (photos / PDFs)
```

Still **100% Next.js**. The remote backend is optional storage, not a second app.

## File mode

- Set the CMS backend env to file mode, or omit remote credentials
- Writes `content/site.json`

## Hosted mode (Supabase)

Uses **`@supabase/server`** (`createAdminClient` from `@supabase/server/core`) with the **new** API keys:

| Env | Purpose |
|-----|---------|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key |
| `SUPABASE_SECRET_KEY` | Secret key (CMS write + Storage) |
| `SUPABASE_JWKS_URL` | Optional JWKS URL |
| `CMS_BACKEND` | Prefer remote when set appropriately with keys present |

### 1) Run SQL once

In your project SQL Editor, run:

[`supabase/cms-setup.sql`](../supabase/cms-setup.sql)

Creates:

- `public.site_content` (single-row JSON CMS)
- Public bucket `cms-media` for instructor images and resources

### 2) Env (`.env.local` or host UI)

```bash
# Required for admin login
ADMIN_PASSWORD=<min-8-char-password>
CMS_SECRET=<long-random-string>

# Hosted CMS (example shape only — use your project values)
CMS_BACKEND=<remote-or-file>
SUPABASE_URL=<your-project-url>
SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
SUPABASE_SECRET_KEY=<your-secret-key>
SUPABASE_JWKS_URL=<your-jwks-url>
```

When URL + secret are set, the app can use the hosted store (unless forced to file mode).

### 3) Instructor photo / resource upload

1. Open `/admin`
2. Instructors or Resource centre → choose a file  
3. Upload stores under the media bucket (or `public/documents` in file mode)  
4. Click **Save changes** to persist the CMS document  

## Security

- `/admin` is password-gated (HTTP-only cookie, HMAC)
- **Never** hardcode passwords or secret keys in source or docs
- Never commit `.env.local`
- Admin has `robots: noindex`

## Adding new editable fields

1. Extend `SiteContent` in `src/lib/cms/types.ts`
2. Add default in `default-content.ts`
3. Add form fields in `AdminDashboard.tsx`
4. Use via `useSiteContent()` on the public site
