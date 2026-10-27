-- Table Editor builds this for you. This is the same thing written as SQL.
-- Table = a box for one kind of thing. Columns = fields. Each row = one song.

create table songs (
  id         bigint generated always as identity primary key,  -- unique number per song
  title      text not null,
  artist     text not null,
  album      text,
  created_at timestamptz not null default now()
);
