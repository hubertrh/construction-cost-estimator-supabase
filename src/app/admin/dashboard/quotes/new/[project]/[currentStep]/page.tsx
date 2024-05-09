import { UUID } from "crypto";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";
import QuoteClientWrapper from "@/components/dashboard/quote/QuoteClientWrapper";
import { fetchCosts } from "@/utils/supabase/costsCalls";
import { Database } from "@/types/supabase";

type NewQuoteProps = {
  params: { project: UUID; currentStep: string };
};

export default async function NewQuote({ params }: NewQuoteProps) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("Failed to fetch user");
    return <p>Failed to fetch user</p>;
  }

  const userRole = await fetchUserRole(supabase, userData.user.id);

  const { data: nrmData, error: nrmError } = await supabase
    .from("nrm")
    .select("*")
    .eq("flag_1", `${parseInt(params.currentStep) - 1}`)
    .order("flag_1")
    .order("flag_2")
    .order("flag_3")
    .order("flag_4");

  if (nrmError) {
    console.error(nrmError);
    return <p>Failed to fetch NRM data</p>;
  }

  const { data: steps, error: stepsError } = await supabase
    .from("nrm")
    .select("el_1, el_3_note")
    .eq("flag_2", "0")
    .eq("flag_3", "0")
    .eq("flag_4", "0")
    .order("flag_1")
    .order("flag_2")
    .order("flag_3")
    .order("flag_4");

  if (stepsError) {
    console.error(stepsError);
    return <p>Failed to fetch steps data</p>;
  }

  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.project);

  if (projectError) {
    console.error(projectError);
    return <p>Failed to fetch project data</p>;
  }

  const { contractorsComboboxList, costsData } = await fetchCosts(
    supabase,
    userData.user.id,
    userRole,
  );

  const typedCostsData: Database["public"]["Tables"]["contractor_costs"]["Row"][] =
    costsData;

  return (
    <div className="min-h-[calc(100vh-20dvh-6rem)] w-[45rem] [&_*]:text-pretty">
      <QuoteClientWrapper
        userId={userData.user.id as UUID}
        params={params}
        projectData={projectData}
        nrmData={nrmData}
        steps={steps}
        contractorsComboboxList={contractorsComboboxList}
        costsData={typedCostsData}
      />
    </div>
  );
}
