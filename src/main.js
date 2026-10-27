import './style.css';
import { renderSongs, showBanner } from './render.js';
import { isConfigured } from './supabaseClient.js';

// PHASE 0: every song lives in this array, inside the browser's memory.
// Add a song, refresh the page... and it's gone. Where did it go?
let songs = [
  { id: 1, title: 'One Dance', artist: 'Drake', album: 'Views' },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours' },
  { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia' },
  { id: 4, title: 'Hotline Bling', artist: 'Drake', album: 'Views' },
  { id: 5, title: 'Cruel Summer', artist: 'Taylor Swift', album: 'Lover' },
];

const addForm = document.querySelector('#add-form');

addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(addForm);
  songs.push({
    id: songs.length + 1,
    title: form.get('title').trim(),
    artist: form.get('artist').trim(),
    album: form.get('album').trim() || null,
  });
  addForm.reset();
  renderSongs(songs);
});

renderSongs(songs);

// PHASE 1: check the connection details are in place.
console.log('Supabase keys found?', isConfigured);
if (!isConfigured) showBanner();
