import { EstimateRequestForm } from "@/components/estimateRequestForm/EstimateRequestForm";
import { createClient } from "@/utils/supabase/server";

export default async function newEstimateRequest() {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError && userError?.status !== 403) {
    throw new Error("Failed to fetch user");
  }

  return <EstimateRequestForm user={user?.user ? user.user : null} />;
}
