# 🌙 Give It a Memory! (HackCamp Workshop 3: Databases with Supabase)

A tiny music app (think Spotify, but mini). It starts with **no memory**: add a song, refresh, and it's gone.
Over the workshop you give it a real database with [Supabase](https://supabase.com).

## Run it

```bash
git clone <this-repo-url>
cd give-it-a-memory
npm install
npm run start
```

Open the URL it prints (usually http://localhost:5173). You should see the starter page.

## Connect your Supabase project (phase 1)

1. In Supabase, open your project → **Project Settings → API**. (Button names change over time, so ask a TA if you can't find it.)
2. Copy `.env.example` to `.env`.
3. Paste in your **Project URL** and your **public key** (the `anon` / publishable key).
4. Restart `npm run start`.

🟢 The Project URL and public key are safe in a frontend.
🔴 The **secret / service_role key** is never safe: not in your frontend, not on GitHub.

## Follow along with branches

Every branch builds on the one before it. If you get stuck, jump to the next checkpoint.

| Branch | What it adds | Slide |
|---|---|---|
| `main` | Starter: songs live in a JS array (no memory) | Spotify with no memory · Set up |
| `phase-1-connect` | `.env`, Supabase client, missing-keys warning | Keys: the front door |
| `phase-2-tables` | SQL for the `songs` table, seed rows, read policy | Boxes → Table · Insert rows · Ask in SQL |
| `phase-3-fetch` | `fetchSongs()`: the list comes from your database | Show it in the app |
| `phase-4-filter` | Search by artist with `.eq`, then `.ilike` | Translate to JavaScript · Your turn (A) |
| `phase-5-insert` | Add songs that are really saved with `.insert` | Your turn (C) |
| `solution` | Same as `phase-5-insert` | |

Switch checkpoints:

```bash
git stash            # park your unfinished changes (optional)
git switch phase-3-fetch
```

To compare what a phase changed: `git diff main..phase-1-connect` or `git log --oneline phase-2-tables`.

## Your turn

- **A. Filter:** search by a different artist with `.eq('artist', ...)` (see `phase-4-filter`).
- **B. New column:** add a `year` column in Table Editor, then show it on each song.
- **C. Save for real:** make the "Add a song" form write to the database (see `phase-5-insert`).
- **Stretch:** sort with `.order('title')`. Then sketch the tables for *your* favorite app.

## When it breaks

| You see | Likely cause | Fix |
|---|---|---|
| Empty list `[]` | No read policy (RLS), or the table is empty | Run `sql/03_read_policy.sql`, check Table Editor |
| "Invalid API key" | Wrong key, or URL and key swapped | Re-copy from Project Settings → API |
| Filter returns nothing | `'drake'` vs `'Drake'` | Match the case, or use `.ilike` |
| Weird `Promise` output | Missing `await` | Add `await` |
| `relation "songs" does not exist` | Table name typo | Check the table name |
| Changed `.env` and nothing happens | Vite reads it at startup | Restart `npm run start` |

More: [`docs/CHEATSHEET.md`](docs/CHEATSHEET.md) has SQL ↔ supabase-js equivalents.
