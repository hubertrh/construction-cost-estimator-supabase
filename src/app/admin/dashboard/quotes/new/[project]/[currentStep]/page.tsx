import { UUID } from "crypto";
import { createClient } from "@/utils/supabase/server";
import QuoteTitleWithRef from "@/components/dashboard/quote/QuoteTitleWithRef";
import QuoteForm from "@/components/dashboard/quote/QuoteForm";
import QuoteBreadcrumbs from "@/components/dashboard/quote/QuoteBreadcrumbs";
import QuotePagination from "@/components/dashboard/quote/QuotePagination";
import QuoteStepInfoAccordion from "@/components/dashboard/quote/QuoteStepInfoAccordion";

type NewQuoteProps = {
  params: { project: UUID; currentStep: string };
};

export default async function NewQuote({ params }: NewQuoteProps) {
  const supabase = createClient();

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

  return (
    <div className="min-h-[calc(100vh-20dvh-6rem)] w-[40rem] [&_*]:text-pretty">
      <QuoteTitleWithRef
        projectName={projectData[0].project_name}
        projectReference={params.project.slice(-6)}
      />
      <QuoteBreadcrumbs steps={steps} currentStep={params.currentStep} />
      <QuoteStepInfoAccordion steps={steps} currentStep={params.currentStep} />
      <QuoteForm nrmData={nrmData} />
      <QuotePagination steps={steps} currentStep={params.currentStep} />
    </div>
  );
}
