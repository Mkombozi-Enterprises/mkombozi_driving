# CMS content (file-based)

All editable site copy lives in **`site.json`**.

## How it works

- Public pages call `loadContent()` → reads `content/site.json` or the hosted store
- Admin UI at **`/admin`** saves the same document
- First run can seed `site.json` from code defaults if missing

## Admin

1. Set env (required):

```bash
# .env.local
ADMIN_PASSWORD=<min-8-characters>
CMS_SECRET=<long-random-string>
```

2. Run the app and open `/admin`.

## Production note

Serverless filesystems are **ephemeral**. For cloud hosting:

1. Keep using file CMS on a VPS with persistent disk, **or**
2. Configure the hosted CMS backend (see `docs/CMS.md`)

## Git

Commit `content/site.json` after important local edits so content is versioned (or rely on the hosted store in production).
