import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";
import QuoteTitleWithRef from "@/components/dashboard/quote/QuoteTitleWithRef";
import QuoteForm from "@/components/dashboard/quote/QuoteForm";
import QuoteBreadcrumbs from "@/components/dashboard/quote/QuoteBreadcrumbs";

type NewQuoteProps = {
  params: { project: UUID; currentStep: string };
};

export default async function NewQuote({ params }: NewQuoteProps) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user) {
    redirect("/auth/login");
  }

  const userRole = await fetchUserRole(supabase, user.user.id);
  if (userRole !== "admin") {
    return <p>Sorry, you don&apos;t have access to this page</p>;
  }

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
    .select("el_1")
    .neq("el_1", null)
    .order("flag_1")
    .order("flag_2")
    .order("flag_3")
    .order("flag_4");

  if (stepsError) {
    console.error(stepsError);
    return <p>Failed to fetch steps data</p>;
  }

  console.log(steps);
  console.log(
    `steps[parseInt(params.formStep) - 2].el_1 = ${steps[parseInt(params.currentStep) - 2]?.el_1}`,
  );

  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.project);

  if (projectError) {
    console.error(projectError);
    return <p>Failed to fetch project data</p>;
  }

  return (
    <div className="w-[40rem] [&_*]:text-pretty">
      <p className="-mb-3 text-left font-bold text-gray">
        {"// "}
        {projectData[0].project_name}
      </p>
      <QuoteTitleWithRef projectReference={params.project.slice(-6)} />
      <QuoteBreadcrumbs steps={steps} currentStep={params.currentStep} />
      <QuoteForm nrmData={nrmData} />
    </div>
  );
}
