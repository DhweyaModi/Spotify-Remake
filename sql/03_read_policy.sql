-- Row Level Security (RLS) is a lock on the table.
-- Tables made in Table Editor have it ON by default.
-- With RLS on and no policy, every query returns an empty list [].
-- This policy says: anyone using the public key may READ songs.

alter table songs enable row level security;

create policy "Anyone can read songs"
  on songs for select
  to anon, authenticated
  using (true);
