import { supabase } from './supabaseClient.js';

// SQL:  SELECT * FROM songs ORDER BY id;
// Every Supabase call gives back { data, error }. You get one or the other.
export async function fetchSongs() {
  const { data, error } = await supabase.from('songs').select('*').order('id');
  if (error) throw error;
  return data;
}

// SQL:  SELECT * FROM songs WHERE artist ILIKE '%drake%';
// .eq('artist', 'Drake') is case-sensitive: 'drake' finds nothing.
// .ilike ignores case and the % signs mean "anything before/after".
export async function fetchSongsByArtist(artist) {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('artist', `%${artist}%`);
  if (error) throw error;
  return data;
}

// SQL:  INSERT INTO songs (title, artist, album) VALUES (...);
export async function addSong({ title, artist, album }) {
  const { data, error } = await supabase
    .from('songs')
    .insert({ title, artist, album })
    .select()
    .single();
  if (error) throw error;
  return data;
}
