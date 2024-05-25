import DashboardMenu from "@/components/dashboard/DashboardMenu";
import { adminClientsColumns } from "@/components/projectsDataTable/AdminClientsColumns";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import { createClient } from "@/utils/supabase/server";

export default async function Clients() {
  const supabase = createClient();

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("client_name, client_email, user_id")
    .order("client_name");

  if (projectsError) {
    console.error(projectsError);
    return <div>Error loading clients</div>;
  }

  const key = "client_email";

  type ProjectCount = {
    [key: string]: number;
  };

  const projectCounts: ProjectCount = projects.reduce((acc, project) => {
    const emailKey = project[key];
    if (acc[emailKey]) {
      acc[emailKey] += 1;
    } else {
      acc[emailKey] = 1;
    }
    return acc;
  }, {} as ProjectCount);

  const uniqueClients = [
    ...new Map(
      projects.map((item) => [
        item[key],
        { ...item, project_count: projectCounts[item[key]] },
      ]),
    ).values(),
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl">Dashboard</h1>
      <DashboardMenu defaultValue="clients" />
      <div className="container mx-auto min-w-[50rem] py-4">
        <DataTable
          columns={adminClientsColumns}
          data={uniqueClients}
          tableVariant="clients"
        />
      </div>
    </div>
  );
}
