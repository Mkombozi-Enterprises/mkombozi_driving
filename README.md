# Mkombozi Driving School

NTSA-registered driving school marketing site (Kakamega / Lumakanda). Built with **Next.js** (App Router) for a static-first marketing experience and a clear path to API routes, forms, and future product features.

## Stack

- Next.js 16 + React 19 + TypeScript
- Global CSS design system (tokens in `src/app/globals.css`)
- `next/font` — Barlow Condensed (display) + Figtree (body)
- Client islands: header/menu, Journey Spine, FAQ, contact form, counters
- CMS + optional hosted database/storage
- Netlify deploy config (`netlify.toml` + `@netlify/plugin-nextjs`)

## Signature

**Journey Spine** — a dashed centre-line with kilometre posts that tracks scroll and encodes the licence journey as navigation structure (not decoration).

## Develop

```bash
npm install
cp .env.example .env.local   # then fill ADMIN_PASSWORD, CMS_SECRET, etc.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### CMS

Edit site content at **`/admin`**.

- Set `ADMIN_PASSWORD` and `CMS_SECRET` in `.env.local` (required; no defaults in source)
- File store: `content/site.json` (fallback)
- Hosted CMS + photo uploads: see **[docs/CMS.md](docs/CMS.md)**
- Docs: `content/README.md`

```bash
npm run build
npm start
```

## Deploy on Netlify (Free tier)

1. Push this repo to GitHub/GitLab/Bitbucket  
2. Netlify → **Import project** → select the repo  
3. Build settings are in `netlify.toml` (command `npm run build`, Next.js plugin, **Node 22**)  
4. Set environment variables — see **[docs/NETLIFY.md](docs/NETLIFY.md)**  
5. Deploy  

**Important on Netlify:** configure the hosted CMS backend (not local file writes) so saves and uploads persist. See deploy docs.

## Project layout

```
src/app/           # App Router (layout, page, admin, API)
src/components/    # UI sections + interactive islands
src/lib/cms/       # CMS store (file + remote), auth, uploads
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
RESEND_API_KEY=...
ENQUIRY_NOTIFY_TO=...
```

Without these, enquiries still save to `data/enquiries.jsonl` on hosts with writable disk.

## Enquiry API

`POST /api/enquiry` accepts JSON:

```json
{
  "name": "Judith Wasike",
  "phone": "0720575778",
  "email": "optional@email.com",
  "course": "B1 – Light vehicle",
  "message": "Weekend mornings preferred"
}
```

## Hero photography

Drop a plate-safe yard or dual-control photo at:

```
public/images/hero.jpg
```

## Next steps

1. Confirm live pricing and graduate reviews  
2. Add fleet photos under `public/images/`  
3. Configure production env vars on your host  
