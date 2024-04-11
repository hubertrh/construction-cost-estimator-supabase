import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import projectIcon from "/public/icons/project.svg";

export default async function SidebarRecentProjects() {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user) {
    return <p>Sign in to see your projects</p>;
  }

  const { data: fetchedProjects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("user", user.user.email)
    .order("updated_at", { ascending: false })
    .limit(5);

  if (projectsError) {
    console.log(projectsError);
    return <p>Failed to fetch projects</p>;
  }

  if (!fetchedProjects.length) {
    return <p>You have no projects yet</p>;
  }

  return (
    <ul>
      {fetchedProjects.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="mb-2 flex items-center justify-start gap-2 transition-all duration-300 hover:translate-x-1"
        >
          <Image src={projectIcon} alt="Project icon" width={18} height={18} />
          <p>{project.project_name}</p>
        </Link>
      ))}
    </ul>
  );
}
