import { createClient } from '@supabase/supabase-js';
import { env } from 'cloudflare:workers';

export function getSupabaseAdmin() {
    return createClient(env.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}
