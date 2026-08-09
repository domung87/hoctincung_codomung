import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default mock credentials (can be overridden by user in settings or env vars)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://demo-skillset.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key-skillset-2026';

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  }
  return supabaseClient;
};

// Realtime Broadcast Channel Helper for multi-tab synchronization
export const realtimeChannel = new BroadcastChannel('skillset-realtime-channel');
