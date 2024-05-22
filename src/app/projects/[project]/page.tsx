import { UUID } from "crypto";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectPostcodeValidator from "@/components/project/ProjectPostcodeValidator";
import { fetchUserRole } from "@/utils/supabase/userCalls";

type ProjectProps = {
  params: { project: UUID };
};

export default async function Project({ params }: ProjectProps) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  const { data: fetchedProject, error: fetchedProjectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.project)
    .single();

  if (fetchedProjectError || !fetchedProject) {
    console.error(fetchedProjectError);
    return <p>Failed to fetch project</p>;
  }

  // ask for postcode if user is not the owner of the project
  if (userError || !user?.user) {
    return (
      // TODO: Create a fallback component for the Suspense component
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectPostcodeValidator fetchedProject={fetchedProject} />
      </Suspense>
    );
  }

  let userRole = null;
  let isProjectOwner = false;

  if (user?.user) {
    userRole = await fetchUserRole(supabase, user.user.id);
    isProjectOwner = user?.user.id === fetchedProject.user_id;

    if (userRole !== "admin" && !isProjectOwner) {
      return (
        <Suspense>
          <ProjectPostcodeValidator fetchedProject={fetchedProject} />
        </Suspense>
      );
    }
  }

  return (
    <ProjectContent
      fetchedProject={fetchedProject}
      userRole={userRole}
      isProjectOwner={isProjectOwner}
    />
  );
}
