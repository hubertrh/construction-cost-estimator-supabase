import { AuthError, SupabaseClient, User } from "@supabase/supabase-js";
import Link from "next/link";
import ProjectLink from "./ProjectLink";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";

type SidebarProjectsQueryOptions = {
  order: string;
  orderDirection: { ascending: boolean };
  limit: number;
  filterColumn?: string;
  filterValue?: string;
};

// API call to fetch projects based on query options
async function fetchProjects(
  supabaseClient: SupabaseClient,
  queryOptions: SidebarProjectsQueryOptions,
) {
  const { data, error } = await supabaseClient
    .from("projects")
    .select("*")
    .match(
      queryOptions.filterColumn
        ? { [queryOptions.filterColumn]: queryOptions.filterValue }
        : {},
    )
    .order(queryOptions.order, queryOptions.orderDirection)
    .limit(queryOptions.limit);
  if (error) return { projects: [], message: "Failed to fetch projects" };
  if (data.length === 0)
    return { projects: [], message: "You have no projects yet" };
  return { projects: data, message: null };
}

type SidebarRecentProjectsProps = {
  userData:
    | {
        user: User;
      }
    | {
        user: null;
      };
  userError: AuthError | null;
};

// Main sidebar component
export default async function SidebarRecentProjects({
  userData,
  userError,
}: SidebarRecentProjectsProps) {
  try {
    if (userError || !userData?.user)
      return (
        <div className="bg-accent-primary-dark p-4 font-ubuntu">
          <p className="mb-2 text-lg font-normal">Recent Projects</p>
          <p>
            <Link
              href={"/auth/login"}
              className="underline underline-offset-4 transition-all duration-300 hover:underline-offset-8"
            >
              Sign in
            </Link>{" "}
            to see your projects
          </p>
        </div>
      );

    const supabase = await createClient();
    const userRole = await fetchUserRole(supabase, userData.user.id);

    const sidebarProjectsQueryOptions = {
      order: "updated_at",
      orderDirection: { ascending: false },
      limit: 7,
      filterColumn: userRole === "client" ? "user_id" : "project_status",
      filterValue: userRole === "client" ? userData.user.id : "pending",
    };

    const { projects, message: projectsMessage } = await fetchProjects(
      supabase,
      sidebarProjectsQueryOptions,
    );

    if (projectsMessage)
      return (
        <div className="bg-accent-primary-dark p-4 font-ubuntu">
          <p className="mb-2 text-lg font-normal">Recent Projects</p>
          <p>{projectsMessage}</p>
        </div>
      );

    return (
      <div className="flex flex-col bg-accent-primary-dark p-4 font-ubuntu">
        <Link href={"/projects"} className="mb-2 text-lg font-normal">
          {userRole === "client" ? "Recent Projects" : "Pending Requests"}
        </Link>
        <ul>
          {projects.map((project, index) => (
            <ProjectLink key={index} project={project} />
          ))}
        </ul>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="bg-accent-primary-dark p-4 font-ubuntu">
        <p className="mb-2 text-lg font-normal">Recent Projects</p>
        <p>{error.message}</p>
      </div>
    );
  }
}
