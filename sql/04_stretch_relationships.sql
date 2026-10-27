-- STRETCH: how tables connect. Don't copy the song, store its id.
-- Run this, then open the Schema Visualizer. It looks like your paper sketch.

create table users (
  id   bigint generated always as identity primary key,
  name text not null
);

create table likes (
  user_id bigint not null references users(id) on delete cascade,
  song_id bigint not null references songs(id) on delete cascade,
  primary key (user_id, song_id)   -- a user can like a song once
);

-- RLS is on by default for tables made in the dashboard. For these new tables
-- you'd add policies the same way as in 03_read_policy.sql when you need them.
alter table users enable row level security;
alter table likes enable row level security;
