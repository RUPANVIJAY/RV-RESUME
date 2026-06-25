import { createClient } from '@supabase/supabase-js'

// Provide dummy values as a fallback to prevent the app from crashing
// if the user hasn't set up their Supabase environment variables yet.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
