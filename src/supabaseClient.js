import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True only when both values are filled in .env (and not the placeholders).
export const isConfigured = Boolean(
  url && key && !url.includes('your-project-id') && !key.includes('your-public'),
);

// The one client the whole app uses to talk to your database.
// (Placeholder values keep the app from crashing before you add your keys.)
export const supabase = createClient(
  isConfigured ? url : 'http://localhost:54321',
  isConfigured ? key : 'missing-key',
);
