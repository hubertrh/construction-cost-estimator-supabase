import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Projects() {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user) {
    redirect("/auth/login");
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("user", user.user.id);

  if (projectsError) {
    console.log(projectsError);
    return <p>Failed to fetch projects</p>;
  }

  return (
    <div>
      <h1>My Projects</h1>
      {projects?.map((project) => (
        <div key={project.id}>
          <h2>{project.project_name}</h2>
          <p>{project.project_short_description}</p>
          <a href={`/projects/${project.id}`}>View Project</a>
        </div>
      ))}
    </div>
  );
}
