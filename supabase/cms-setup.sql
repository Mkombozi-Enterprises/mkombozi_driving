-- Mkombozi CMS: run this in Supabase SQL Editor once
-- Project: aojhvlcesnviqnytguge

-- 1) Content document (single-row JSON CMS)
create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  version int not null default 1,
  updated_at timestamptz not null default now()
);

-- Optional seed empty row (app will upsert full defaults on first load)
insert into public.site_content (id, data, version)
values (1, '{}'::jsonb, 1)
on conflict (id) do nothing;

-- 2) Storage bucket for instructor / CMS images (public read)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 3) RLS: public read on site_content is optional (app uses secret key / admin client).
-- Keep RLS enabled; secret key bypasses RLS. No public policies required for writes.

alter table public.site_content enable row level security;

-- Allow anonymous read of published content (optional — useful if you ever use publishable client)
drop policy if exists "Public read site_content" on public.site_content;
create policy "Public read site_content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

-- Storage: public read of cms-media
drop policy if exists "Public read cms-media" on storage.objects;
create policy "Public read cms-media"
  on storage.objects
  for select
  to public
  using (bucket_id = 'cms-media');

-- Writes only via service/secret key (bypasses RLS) — no insert/update policies for anon.
