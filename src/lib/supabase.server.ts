import { createClient } from '@supabase/supabase-js';

let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
    if (!client) {
        client = createClient(
            import.meta.env.PUBLIC_SUPABASE_URL,
            import.meta.env.SUPABASE_SERVICE_ROLE_KEY
        );
    }
    return client;
}