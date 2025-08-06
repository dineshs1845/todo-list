import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryiiajdvkpxmbvqvzjvl.supabase.co';  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aWlhamR2a3B4bWJ2cXZ6anZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MTA0NTksImV4cCI6MjA2OTk4NjQ1OX0.VRDs7LltqLXqGKghv0RILinyt36U44kMDQpHLfA8zS8';                 // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);