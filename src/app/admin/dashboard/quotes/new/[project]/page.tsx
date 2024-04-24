import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";
import QuoteTitleWithRef from "@/components/dashboard/QuoteTitleWithRef";
import QuoteForm from "@/components/dashboard/QuoteForm";

type NewQuoteProps = {
  params: { project: UUID };
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
    .order("flag_1")
    .order("flag_2")
    .order("flag_3")
    .order("flag_4");

  if (nrmError) {
    console.error(nrmError);
    return <p>Failed to fetch NRM data</p>;
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
    <div>
      <p className="-mb-3 text-left font-bold text-gray">
        {"// "}
        {projectData[0].project_name}
      </p>
      <QuoteTitleWithRef projectReference={params.project.slice(-6)} />
      <QuoteForm nrmData={nrmData} />
    </div>
  );
}
