import Divider from "../ui/Divider";
import SidebarArrow from "./SidebarArrow";
import SidebarHeader from "./SidebarHeader";
import SidebarRecentProjects from "./SidebarRecentProjects";
import SidebarUserMenu from "./SidebarUserMenu";

export default function Sidebar() {
  return (
    <div className="sidebar fixed flex h-dvh w-80 flex-col justify-between bg-accent-primary p-5 text-sm font-light text-background-light transition-all duration-200">
      <div>
        <SidebarHeader />
        <Divider />
        <div className="bg-accent-primary-dark p-4 font-ubuntu">
          <p className="mb-2 text-lg font-medium">Recent Projects</p>
          <SidebarRecentProjects />
        </div>
      </div>
      <div>
        <SidebarUserMenu />
      </div>
      <SidebarArrow />
    </div>
  );
}
