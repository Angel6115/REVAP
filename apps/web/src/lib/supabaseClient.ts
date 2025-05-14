// src/lib/supabaseClient.ts
<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnon);
export default supabase;
=======
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL !
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !

export const supabase = createClient(supabaseUrl, supabaseKey)
>>>>>>> mvp-supabase
