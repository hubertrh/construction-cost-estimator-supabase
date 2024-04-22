import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import { adminProjectsColumns } from "@/components/projectsDataTable/AdminProjectsColumns";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) {
    redirect("/auth/login");
  }

  const userRole = await fetchUserRole(supabase, user.user.id);
  if (userRole !== "admin") {
    return <p>Sorry, you don&apos;t have access to this page</p>;
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select(
      "id, project_status, project_name, google_drive_folder_link, project_postcode, client_name, created_at",
    )
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.error(projectsError);
    return <p>Failed to fetch projects</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">My Projects</h1>
      <div className="container mx-auto min-w-[50rem] py-4">
        <DataTable columns={adminProjectsColumns} data={projects} />
      </div>
    </div>
  );
}
