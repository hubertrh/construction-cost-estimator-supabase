import Divider from "../atoms/Divider";
import SidebarHeader from "../molecules/SidebarHeader";
import SidebarUserMenu from "../molecules/SidebarUserMenu";

export default function Sidebar() {
  return (
    <div className="fixed flex h-dvh w-[22vw] flex-col justify-between bg-accent-primary p-5 text-background-light">
      <div>
        <SidebarHeader />
        <Divider />
      </div>
      <SidebarUserMenu />
    </div>
  );
}
