import { supabase } from './supabaseClient.js';

// SQL:  SELECT * FROM songs ORDER BY id;
// Every Supabase call gives back { data, error }. You get one or the other.
export async function fetchSongs() {
  const { data, error } = await supabase.from('songs').select('*').order('id');
  if (error) throw error;
  return data;
}

// TODO: filter songs by artist.
// SQL:  SELECT * FROM songs WHERE artist = 'Drake';
// Hints:
//   1. Start like fetchSongs: supabase.from('songs').select('*')
//   2. Add .eq('artist', artist) to keep only matching rows
//   3. await it, throw the error if there is one, return data
// Stretch: 'drake' finds nothing with .eq. Try .ilike('artist', `%${artist}%`).
export async function fetchSongsByArtist(artist) {
  return [];
}
