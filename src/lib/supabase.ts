import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidHttpUrl = (value: string | undefined): value is string => {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const hasSupabaseUrl = isValidHttpUrl(rawSupabaseUrl);
const hasSupabaseAnonKey = !!rawSupabaseAnonKey && rawSupabaseAnonKey !== 'your_supabase_anon_public_key_here';

if (!hasSupabaseUrl || !hasSupabaseAnonKey) {
  console.error(
    '⚠️  Invalid or missing Supabase environment variables.\n' +
    'Please copy .env.example to .env and fill in your Supabase project URL and anon key.\n' +
    'Get your keys at: https://app.supabase.com → Project → Settings → API'
  );
}

const supabaseUrl = hasSupabaseUrl ? rawSupabaseUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = hasSupabaseAnonKey ? rawSupabaseAnonKey : 'placeholder-anon-key';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
