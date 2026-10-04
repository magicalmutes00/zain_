-- ZAIN Technical CMS schema for Supabase Postgres
-- Run in Supabase Dashboard → SQL Editor (new query). Safe to re-run:
-- tables are created IF NOT EXISTS; policies are dropped + recreated.

-- ---------- helpers ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- projects ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text not null default '',
  year text not null default '',
  client text not null default '',
  scope text not null default '',
  status text not null default 'completed' check (status in ('completed', 'ongoing')),
  image_url text not null default '',
  image_public_id text not null default '',
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------- certifications (gallery) ----------
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text not null default '',
  image_public_id text not null default '',
  orientation text not null default 'portrait' check (orientation in ('portrait', 'landscape')),
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_certifications_updated on public.certifications;
create trigger trg_certifications_updated before update on public.certifications
  for each row execute function public.set_updated_at();

-- ---------- services ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  icon text not null default 'Flame',
  features jsonb not null default '[]',
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_services_updated on public.services;
create trigger trg_services_updated before update on public.services
  for each row execute function public.set_updated_at();

-- ---------- products ----------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default '',
  brand text not null default '',
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated before update on public.products
  for each row execute function public.set_updated_at();

-- ---------- faqs ----------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_faqs_updated on public.faqs;
create trigger trg_faqs_updated before update on public.faqs
  for each row execute function public.set_updated_at();

-- ---------- site_content (hero, brands, misc singletons) ----------
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_site_content_updated on public.site_content;
create trigger trg_site_content_updated before update on public.site_content
  for each row execute function public.set_updated_at();

-- ---------- inquiries (contact / quote requests) ----------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  company text not null default '',
  service text not null default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_inquiries_updated on public.inquiries;
create trigger trg_inquiries_updated before update on public.inquiries
  for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------
alter table public.projects enable row level security;
alter table public.certifications enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.faqs enable row level security;
alter table public.site_content enable row level security;
alter table public.inquiries enable row level security;

-- Public read: published content only. Writes go through the Node API
-- with the service-role key, which bypasses RLS.
drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects
  for select using (is_published = true);

drop policy if exists "public read published certifications" on public.certifications;
create policy "public read published certifications" on public.certifications
  for select using (is_published = true);

drop policy if exists "public read published services" on public.services;
create policy "public read published services" on public.services
  for select using (is_published = true);

drop policy if exists "public read published products" on public.products;
create policy "public read published products" on public.products
  for select using (is_published = true);

drop policy if exists "public read published faqs" on public.faqs;
create policy "public read published faqs" on public.faqs
  for select using (is_published = true);

drop policy if exists "public read site content" on public.site_content;
create policy "public read site content" on public.site_content
  for select using (true);

-- inquiries: no public policies at all (insert/select via service role in API only)
