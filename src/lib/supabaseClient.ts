import { createClient } from "@supabase/supabase-js";

// Client Supabase pour DEVIA Site.
// Les clés viennent de .env.local (voir .env.local.example).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
