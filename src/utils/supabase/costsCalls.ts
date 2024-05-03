import { SupabaseClient } from "@supabase/supabase-js";

// API call to fetch costs
export async function fetchCosts(
  supabaseClient: SupabaseClient,
  userId: string,
  userRole: string,
) {
  if (userRole === "admin") {
    const { data, error } = await supabaseClient
      .from("builder_costs")
      .select("*");

    if (error) throw new Error("Failed to fetch user role");
    return data;
  }

  if (userRole === "builder") {
    const { data, error } = await supabaseClient
      .from("builder_costs")
      .select("*")
      .eq("builder_id", userId)
      .single();

    if (error) throw new Error("Failed to fetch user role");
    return data;
  }
}

export async function fetchAllBuilders(
  supabaseClient: SupabaseClient,
  userRole: string,
) {
  if (userRole === "admin") {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id, name")
      .eq("app_role", "builder");

    if (error) throw new Error("Failed to fetch builders");
    return data;
  }
}
