# Mkombozi Driving School

NTSA-registered driving school marketing site (Kakamega / Lumakanda). Built with **Next.js** (App Router) for a static-first marketing experience and a clear path to API routes, forms, and future product features.

## Stack

- Next.js 15 + React 19 + TypeScript
- Global CSS design system (tokens in `src/app/globals.css`)
- `next/font` — Barlow Condensed (display) + Figtree (body)
- Client islands: header/menu, Journey Spine, FAQ, contact form, counters

## Signature

**Journey Spine** — a dashed centre-line with kilometre posts that tracks scroll and encodes the licence journey as navigation structure (not decoration).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Project layout

```
src/app/           # App Router (layout, page, globals)
src/components/    # UI sections + interactive islands
src/lib/site.ts    # Shared content (phone, courses, FAQs…)
public/images/     # Founder photo + future fleet shots
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
