import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type ProjectProps = {
  params: { project: UUID };
};

export default async function Project({ params }: ProjectProps) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user) {
    redirect("/auth/login");
  }

  const { data: fetchedProject, error: fetchedProjectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.project)
    .single();

  if (fetchedProjectError) {
    console.log(fetchedProjectError);
    return <p>Failed to fetch project</p>;
  }

  if (user?.user.email !== fetchedProject?.user) {
    return <p>You do not have access to this project</p>;
  }

  console.log(fetchedProject);

  return (
    <>
      <h1>{fetchedProject.project_name}</h1>
      <p>{fetchedProject.project_short_description}</p>
    </>
  );
}
