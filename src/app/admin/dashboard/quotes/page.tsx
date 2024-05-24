import { createClient } from "@/utils/supabase/server";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import { adminQuotesColumns } from "@/components/projectsDataTable/AdminQuotesColumns";
import DashboardMenu from "@/components/dashboard/DashboardMenu";

export default async function Quotes() {
  const supabase = createClient();

  const { data: quotes, error: quotesError } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (quotesError) {
    console.error(quotesError);
    return <p>Failed to fetch quotes</p>;
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, name");

  if (profilesError) {
    console.error(profilesError);
    return <p>Failed to fetch profiles</p>;
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, project_name");

  if (projectsError) {
    console.error(projectsError);
    return <p>Failed to fetch projects</p>;
  }

  const enrichedQuotes = quotes.map((quote) => {
    const quoteContractor = profiles.find(
      (profile) => profile.id === quote.contractor_id,
    );
    const quoteProject = projects.find(
      (project) => project.id === quote.project_id,
    );

    return {
      ...quote,
      contractor_name: quoteContractor ? quoteContractor.name : null,
      project_name: quoteProject ? quoteProject.project_name : null,
    };
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl">Dashboard</h1>
      <DashboardMenu defaultValue="quotes" />
      <div className="container mx-auto min-w-[50rem] py-4">
        <DataTable
          columns={adminQuotesColumns}
          data={enrichedQuotes}
          tableVariant="quotes"
        />
      </div>
    </div>
  );
}
