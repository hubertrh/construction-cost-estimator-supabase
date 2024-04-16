import { SupabaseClient } from "@supabase/supabase-js";

// API call to fetch user role
export async function fetchUserRole(
  supabaseClient: SupabaseClient,
  userId: string,
) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("app_role")
    .eq("id", userId)
    .single();
  if (error) throw new Error("Failed to fetch user role");
  return data.app_role;
}
