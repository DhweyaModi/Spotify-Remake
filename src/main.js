import './style.css';
import { renderSongs, setStatus, showBanner } from './render.js';
import { isConfigured } from './supabaseClient.js';
import { fetchSongs, fetchSongsByArtist } from './songsApi.js';

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

// PHASE 4: the filtering now happens in the DATABASE, not in JavaScript.
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

// STILL LOCAL ONLY (see phase-5-insert).
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(addForm);
  songs.push({
    id: Date.now(),
    title: form.get('title').trim(),
    artist: form.get('artist').trim(),
    album: form.get('album').trim() || null,
  });
  addForm.reset();
  renderSongs(songs);
});

loadSongs();
