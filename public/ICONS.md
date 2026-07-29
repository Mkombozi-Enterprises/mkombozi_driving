# Brand icons / favicon

Default Next.js SVG assets and `src/app/favicon.ico` were removed.  
Drop **your** files into `public/` with these exact names:

| Your file | Save as (exact path) | Purpose |
|-----------|----------------------|---------|
| `.ico` | `public/favicon.ico` | Browser tab (classic) |
| `.png` | `public/icon.png` | Modern tab / PWA-style icon |
| `.png` (same or 180×180) | `public/apple-touch-icon.png` | iOS home screen |

## Steps

```bash
cd ~/software/mkombozi_driving

# Examples — adjust source paths to your downloads:
cp /path/to/your-icon.ico  public/favicon.ico
cp /path/to/your-icon.png  public/icon.png
cp /path/to/your-icon.png  public/apple-touch-icon.png
```

Then delete the marker files if still present:

```bash
rm -f public/*.PLACEHOLDER
```

Hard-refresh the browser (or clear cache) so the old favicon is not sticky.

## Optional sizes

- **favicon.ico** — multi-size ICO is fine (16 / 32 / 48).
- **icon.png** — square; 192×192 or 512×512 is ideal (site can downscale).
- **apple-touch-icon.png** — ideally 180×180, no transparency if possible.

## Wired in code

`src/app/layout.tsx` → `metadata.icons` points at:

- `/favicon.ico`
- `/icon.png`
- `/apple-touch-icon.png`

No other renames needed after you place the files.
