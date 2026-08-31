import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default / fallback credentials or read from LocalStorage / Env
const DEFAULT_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://mxqhvfopceusvbmewkwn.supabase.co';
const DEFAULT_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cWh2Zm9wY2V1c3ZibWV3a3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxOTQyNzIsImV4cCI6MjEwMzc3MDI3Mn0.hE6npPiRrj4pQOmKHq9ITDJwwecTkmnMMK1a2akoJK0';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = localStorage.getItem('supabase_project_url') || DEFAULT_URL;
  const key = localStorage.getItem('supabase_anon_key') || DEFAULT_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance || (supabaseInstance as any).supabaseUrl !== url) {
    try {
      supabaseInstance = createClient(url, key);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
}

export function saveSupabaseConfig(url: string, key: string) {
  localStorage.setItem('supabase_project_url', url.trim());
  localStorage.setItem('supabase_anon_key', key.trim());
  supabaseInstance = null; // reset instance
}
