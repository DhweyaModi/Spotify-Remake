const listEl = document.querySelector('#song-list');
const statusEl = document.querySelector('#status');

export function setStatus(message) {
  statusEl.textContent = message;
}

// Draws the list of songs on the page.
// We use textContent (not innerHTML) so song titles can't inject HTML.
export function renderSongs(songs) {
  listEl.replaceChildren();

  if (songs.length === 0) {
    setStatus('No songs here yet.');
    return;
  }
  setStatus(`${songs.length} song${songs.length === 1 ? '' : 's'}`);

  for (const song of songs) {
    const li = document.createElement('li');
    li.className = 'song';

    const cover = document.createElement('div');
    cover.className = 'cover';
    cover.textContent = song.title.charAt(0).toUpperCase();

    const text = document.createElement('div');
    text.className = 'song-text';

    const title = document.createElement('span');
    title.className = 'song-title';
    title.textContent = song.title;

    const meta = document.createElement('span');
    meta.className = 'song-meta';
    // TODO (Option B): after adding the `year` column in Supabase, add
    // ` · ${song.year ?? ''}` inside the template string below.
    meta.textContent = `${song.artist} · ${song.album ?? 'Single'}`;

    text.append(title, meta);
    li.append(cover, text);
    listEl.append(li);
  }
}

// Shows a friendly warning when .env isn't filled in yet.
export function showBanner() {
  if (document.querySelector('.banner')) return;
  const banner = document.createElement('p');
  banner.className = 'banner';
  banner.textContent =
    '⚠️ Supabase keys missing. Copy .env.example to .env, paste your Project URL and public key, then restart npm run start.';
  document.querySelector('header').after(banner);
}
