-- Reading is allowed (03_read_policy.sql). Writing needs its own policy.
-- WORKSHOP ONLY: this lets anyone with the public key add songs.
-- In a real app you'd require a logged-in user (auth).

create policy "Anyone can add songs"
  on songs for insert
  to anon, authenticated
  with check (true);
