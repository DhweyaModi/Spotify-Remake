# SQL ↔ supabase-js cheat sheet

| Goal | SQL | supabase-js |
|---|---|---|
| Everything | `SELECT * FROM songs;` | `.from('songs').select('*')` |
| Some columns | `SELECT title, artist FROM songs;` | `.select('title, artist')` |
| Exact match | `WHERE artist = 'Drake'` | `.eq('artist', 'Drake')` |
| Not equal | `WHERE artist <> 'Drake'` | `.neq('artist', 'Drake')` |
| Greater than | `WHERE year > 2020` | `.gt('year', 2020)` |
| Contains, any case | `WHERE artist ILIKE '%drake%'` | `.ilike('artist', '%drake%')` |
| Sort | `ORDER BY title` | `.order('title')` |
| First N | `LIMIT 5` | `.limit(5)` |
| Add a row | `INSERT INTO songs (title, artist) VALUES ('X', 'Y');` | `.from('songs').insert({ title: 'X', artist: 'Y' })` |

Every call returns `{ data, error }`. You get one or the other, so check `error` first. Don't forget `await`.
