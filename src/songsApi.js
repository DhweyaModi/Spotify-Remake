import { supabase } from './supabaseClient.js';

// SQL:  SELECT * FROM songs ORDER BY id;
// Every Supabase call gives back { data, error }. You get one or the other.
export async function fetchSongs() {
  const { data, error } = await supabase.from('songs').select('*').order('id');
  if (error) throw error;
  return data;
}
