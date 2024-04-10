import { createClient } from "@/utils/supabase/client";

export async function useSignOut() {
  const supabase = createClient();

  await supabase.auth.signOut();
  window.location.reload();
}
