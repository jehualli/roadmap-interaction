create extension if not exists pgcrypto;

create table if not exists roadmaps (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  level text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roadmap_topics (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references roadmaps(id) on delete cascade,
  title text not null,
  theme text not null,
  stage text not null,
  summary text not null,
  outcomes text[] not null default '{}',
  practice_prompts text[] not null default '{}',
  position_x integer not null,
  position_y integer not null,
  sort_order integer not null default 0
);
