import { createClient } from "@/utils/supabase/server";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import { adminQuoteRequestsColumns } from "@/components/projectsDataTable/AdminQuoteRequestsColumns";
import DashboardMenu from "@/components/dashboard/DashboardMenu";

export default async function QuoteRequests() {
  const supabase = await createClient();

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select(
      "id, project_status, project_name, google_drive_folder_link, project_postcode, client_name, client_email, created_at",
    )
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.error(projectsError);
    return <p>Failed to fetch projects</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">Dashboard</h1>
      <DashboardMenu defaultValue="quoteRequests" />
      <div className="container mx-auto min-w-[50rem] py-4">
        <DataTable
          columns={adminQuoteRequestsColumns}
          data={projects}
          tableVariant="quoteRequests"
        />
      </div>
    </div>
  );
}
