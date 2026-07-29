# CMS content (file-based)

All editable site copy lives in **`site.json`**.

## How it works

- Public pages call `loadContent()` → reads `content/site.json`
- Admin UI at **`/admin`** saves the same file (Next.js Server Actions)
- No separate backend process
- First run seeds `site.json` from code defaults if missing

## Admin

1. Set a password (recommended):

```bash
# .env.local
ADMIN_PASSWORD=your-strong-password
CMS_SECRET=long-random-string
```

2. Run the app and open:

```
http://localhost:3000/admin
```

Default dev password if unset: **`mkombozi-admin`**

## What you can edit

| Section | Examples |
|---------|----------|
| Site & contact | phone, email, address, map |
| Founders & yard | quote, portraits, yard note, today’s board |
| Hero & about | hero subcopy, about, origin story |
| Nav & journey | header links, spine steps |
| Route stops | six licence path stops |
| Categories A & B | codes, descriptions, requirements |
| Add-ons | defensive driving, first aid, … |
| Pricing | 16,000 package text & inclusions |
| Instructors | add / remove / edit quotes & roles |
| FAQ | add / remove / edit Q&A |
| Fleet | vehicle cards |
| Wall of passes | graduates |
| Form options | enquiry dropdown |

## Production note (Vercel etc.)

Serverless filesystems are **ephemeral**. For cloud hosting:

1. Keep using file CMS on a VPS / Node host with persistent disk, **or**
2. Set `CMS_BACKEND=supabase` and connect Supabase (see `docs/CMS.md`)

## Git

Commit `content/site.json` after important edits so content is versioned.
