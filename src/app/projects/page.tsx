import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import { columns } from "@/components/projectsDataTable/Columns";

export default async function Projects() {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user) {
    redirect("/auth/login");
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, project_status, project_name, project_postcode")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.log(projectsError);
    return <p>Failed to fetch projects</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">My Projects</h1>
      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  );
}
