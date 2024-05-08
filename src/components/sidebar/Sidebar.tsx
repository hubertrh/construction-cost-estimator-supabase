import Divider from "../ui/Divider";
import SidebarArrow from "./SidebarArrow";
import SidebarHeader from "./SidebarHeader";
import SidebarRecentProjects from "./SidebarRecentProjects";
import SidebarUserMenu from "./SidebarUserMenu";

export default function Sidebar() {
  return (
    <div className="sidebar fixed z-10 flex h-dvh w-80 flex-col justify-between bg-accent-primary p-5 text-sm font-light text-background-light transition-all duration-200">
      <div>
        <SidebarHeader />
        <Divider color="light" />
        <SidebarRecentProjects />
      </div>
      <div>
        <SidebarUserMenu />
      </div>
      <SidebarArrow />
    </div>
  );
}
