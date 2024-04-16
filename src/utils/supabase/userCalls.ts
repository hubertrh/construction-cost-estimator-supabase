import { SupabaseClient } from "@supabase/supabase-js";

// API call to fetch user data
export async function fetchUserData(supabaseClient: SupabaseClient) {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) return { user: null, message: "Sign in to see your projects" };
  return { user: data.user, message: null };
}

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
  console.log(data?.app_role);
  return data.app_role;
}
