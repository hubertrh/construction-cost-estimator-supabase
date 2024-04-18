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
    console.error(fetchedProjectError);
    return <p>Failed to fetch project</p>;
  }

  if (user?.user.id !== fetchedProject?.user_id) {
    return <p>You do not have access to this project</p>;
  }

  return (
    <>
      <h1>{fetchedProject.project_name}</h1>
      <p>{fetchedProject.project_description}</p>
    </>
  );
}
