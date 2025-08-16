import { UUID } from "crypto";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";
import QuoteClientWrapper from "@/components/dashboard/quote/QuoteClientWrapper";
import { fetchCosts } from "@/utils/supabase/costsCalls";
import { Database } from "@/types/supabase";
import isValidUUID from "@/utils/uuidHelpers";

type NewQuoteProps = {
  params: Promise<{ projectId: UUID; quoteId: UUID; currentStep: string }>;
};

export default async function NewQuote({ params }: NewQuoteProps) {
  const { projectId, quoteId, currentStep } = await params;

  if (!isValidUUID(projectId)) {
    console.error("Invalid project ID");
    console.error(`Invalid project ID: ${projectId}`);
    return <p>Invalid project ID</p>;
  }

  if (!isValidUUID(quoteId)) {
    console.error("Invalid quote ID");
    console.error(`Invalid quote ID: ${quoteId}`);
    return <p>Invalid quote ID</p>;
  }

  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("Failed to fetch user");
    return <p>Failed to fetch user</p>;
  }

  const userRole = await fetchUserRole(supabase, userData.user.id);

  const { data: nrmData, error: nrmError } = await supabase
    .from("nrm")
    .select("*")
    .eq("flag_1", parseInt(currentStep) - 1)
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
    .eq("flag_2", 0)
    .eq("flag_3", 0)
    .eq("flag_4", 0)
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
    .eq("id", projectId);

  if (projectError) {
    console.error(projectError);
    return <p>Failed to fetch project data</p>;
  }

  if (!projectData || projectData.length === 0) {
    console.error("Project not found");
    console.error(`Project not found: ${projectId}`);
    return <p>Project not found</p>;
  }

  const { data: quoteData, error: quoteError } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", quoteId);

  if (quoteError) {
    console.error(quoteError);
    return <p>Failed to fetch quote data</p>;
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
        params={{ projectId, quoteId, currentStep }}
        projectData={projectData}
        nrmData={nrmData}
        steps={steps}
        contractorsComboboxList={contractorsComboboxList}
        costsData={typedCostsData}
        quoteData={quoteData}
      />
    </div>
  );
}
