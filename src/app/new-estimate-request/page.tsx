import { EstimateRequestForm } from "@/components/estimateRequestForm/EstimateRequestForm";
import { createClient } from "@/utils/supabase/server";

export default async function newEstimateRequest() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  return <EstimateRequestForm user={user?.user ? user.user : null} />;
}
