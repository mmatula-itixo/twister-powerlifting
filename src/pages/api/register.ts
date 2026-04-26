import type { APIRoute } from 'astro';
import { registrationSchema } from '../../lib/schemas';
import { getSupabaseAdmin } from '../../lib/supabase.server';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    const result = registrationSchema.safeParse(body);
    if (!result.success) {
        return new Response(
            JSON.stringify({ error: result.error.flatten() }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const { fullName, age, email, gender } = result.data;
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
        .from('registrations')
        .insert({
            full_name: fullName,   // snake_case for Postgres
            age,
            email,
            gender,
        });

    if (error) {
        // Unique violation — email already registered
        if (error.code === '23505') {
            return new Response(
                JSON.stringify({ error: 'Tento e-mail je již zaregistrován.' }),
                { status: 409, headers: { 'Content-Type': 'application/json' } }
            );
        }
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({ success: true }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
};