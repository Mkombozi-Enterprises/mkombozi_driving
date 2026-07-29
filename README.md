# Mkombozi Driving School

NTSA-registered driving school marketing site (Kakamega / Lumakanda). Built with **Next.js** (App Router) for a static-first marketing experience and a clear path to API routes, forms, and future product features.

## Stack

- Next.js 16 + React 19 + TypeScript
- Global CSS design system (tokens in `src/app/globals.css`)
- `next/font` — Barlow Condensed (display) + Figtree (body)
- Client islands: header/menu, Journey Spine, FAQ, contact form, counters
- CMS + optional Supabase (`@supabase/server`)
- Netlify deploy config (`netlify.toml` + `@netlify/plugin-nextjs`)

## Signature

**Journey Spine** — a dashed centre-line with kilometre posts that tracks scroll and encodes the licence journey as navigation structure (not decoration).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### CMS (Next.js admin + optional Supabase)

Edit site content at **[http://localhost:3000/admin](http://localhost:3000/admin)**.

- Default password: `mkombozi-admin` (set `ADMIN_PASSWORD` in `.env.local`)
- File store: `content/site.json` (fallback)
- **Supabase**: run `supabase/cms-setup.sql`, set `SUPABASE_URL` + `SUPABASE_SECRET_KEY` in `.env.local`
- Instructor photos: upload in Admin → Instructors (Storage bucket `cms-media`)
- Docs: `docs/CMS.md`

```bash
npm run build
npm start
```

## Deploy on Netlify (Free tier)

1. Push this repo to GitHub/GitLab/Bitbucket  
2. Netlify → **Import project** → select the repo  
3. Build settings are in `netlify.toml` (command `npm run build`, Next.js plugin)  
4. Set environment variables (Supabase + `ADMIN_PASSWORD` + `CMS_SECRET`) — see **[docs/NETLIFY.md](docs/NETLIFY.md)**  
5. Deploy  

**Important on Netlify:** use `CMS_BACKEND=supabase` so CMS saves and enquiries don’t rely on ephemeral disk.

## Project layout

```
src/app/           # App Router (layout, page, admin, API)
src/components/    # UI sections + interactive islands
src/lib/cms/       # CMS store (file + Supabase), auth, uploads
content/site.json  # File-based content mirror
public/images/     # Founders, manager, hero, etc.
public/documents/  # Resource centre PDFs
supabase/          # SQL setup for CMS + storage
netlify.toml       # Netlify Free-tier build config
_legacy/           # Previous static HTML/CSS/JS (reference)
```

## Mobile conversion

On viewports ≤980px: sticky bottom bar (**Book Lesson** + **WhatsApp**) and a compact journey progress strip (not a second nav). WhatsApp links pre-fill a message ending with *Safari njema*.

## Staff notifications

Optional email when an enquiry arrives — set in `.env.local`:

```
RESEND_API_KEY=re_...
ENQUIRY_NOTIFY_TO=you@example.com
```

Without these, enquiries still save to `data/enquiries.jsonl`.

## Enquiry API

`POST /api/enquiry` accepts JSON:

```json
{
  "name": "Judith Wasike",
  "phone": "0720575778",
  "email": "optional@email.com",
  "course": "Class B – Automatic (Standard)",
  "message": "Weekend mornings preferred"
}
```

Valid submissions are appended to `data/enquiries.jsonl` (gitignored). Check the terminal for `[enquiry] received` logs. Swap the persist step for email/CRM later without changing the form.

## Hero photography

Drop a plate-safe yard or dual-control photo at:

```
public/images/hero.jpg
```

The home page detects the file and fills the media stage automatically. Until then, the stage uses road geometry + the founder photo inset.

## Next steps

1. Add `public/images/hero.jpg` + plate-safe fleet photos
2. Confirm live pricing and graduate reviews
3. Optional: email notify from the enquiry route
