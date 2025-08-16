import Divider from "../ui/Divider";
import SidebarArrow from "./SidebarArrow";
import SidebarHeader from "./SidebarHeader";
import SidebarRecentProjects from "./SidebarRecentProjects";
import SidebarUserMenu from "./SidebarUserMenu";
import { createClient } from "@/utils/supabase/server";

export default async function Sidebar() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  return (
    <div className="sidebar fixed z-10 flex h-dvh w-80 flex-col justify-between bg-accent-primary p-5 text-sm font-light text-background-light transition-all duration-200">
      <div>
        <SidebarHeader />
        <Divider color="light" />
        <SidebarRecentProjects userData={userData} userError={userError} />
      </div>
      <div>
        <SidebarUserMenu userData={userData} userError={userError} />
      </div>
      <SidebarArrow />
    </div>
  );
}
