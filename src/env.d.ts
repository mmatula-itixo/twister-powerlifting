/// <reference types="astro/client" />

declare module "cloudflare:workers" {
  const env: {
    PUBLIC_SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    PUBLIC_SUPABASE_ANON_KEY: string;
  };
  export { env };
}
