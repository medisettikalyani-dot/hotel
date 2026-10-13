import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role admin client for secure server-side operations.
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the client.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
