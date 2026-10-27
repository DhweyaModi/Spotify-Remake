import './style.css';
import { renderSongs, setStatus, showBanner } from './render.js';
import { isConfigured } from './supabaseClient.js';
import { fetchSongs, fetchSongsByArtist, addSong } from './songsApi.js';

let songs = [];

const addForm = document.querySelector('#add-form');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const clearBtn = document.querySelector('#clear-btn');

async function loadSongs() {
  if (!isConfigured) {
    showBanner();
    renderSongs([]);
    return;
  }
  setStatus('Loading songs...');
  try {
    songs = await fetchSongs();
    renderSongs(songs);
  } catch (error) {
    console.error(error);
    setStatus(`Could not load songs: ${error.message}`);
  }
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const artist = searchInput.value.trim();
  if (!artist) return loadSongs();
  if (!isConfigured) return showBanner();

  setStatus(`Searching for ${artist}...`);
  try {
    songs = await fetchSongsByArtist(artist);
    renderSongs(songs);
  } catch (error) {
    console.error(error);
    setStatus(`Search failed: ${error.message}`);
  }
});

clearBtn.addEventListener('click', () => {
  searchForm.reset();
  loadSongs();
});

// PHASE 5: new songs are saved to the database, so refresh and they're still here.
addForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!isConfigured) return showBanner();

  const form = new FormData(addForm);
  try {
    await addSong({
      title: form.get('title').trim(),
      artist: form.get('artist').trim(),
      album: form.get('album').trim() || null,
    });
    addForm.reset();
    searchForm.reset();
    await loadSongs();
  } catch (error) {
    console.error(error);
    setStatus(`Could not add song: ${error.message}`);
  }
});

loadSongs();
