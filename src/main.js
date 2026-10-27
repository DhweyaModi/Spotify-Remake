import './style.css';
import { renderSongs, setStatus, showBanner } from './render.js';
import { isConfigured } from './supabaseClient.js';
import { fetchSongs } from './songsApi.js';

// PHASE 3: songs now come from your database, not a hardcoded array.
let songs = [];

const addForm = document.querySelector('#add-form');

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

// STILL LOCAL ONLY: this adds to the browser's memory, not the database.
// Refresh and the songs from Supabase stay... but your new song vanishes.
// YOUR TURN (option C): make this save to Supabase. See phase-5-insert.
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
