import Divider from "../atoms/Divider";
import SidebarHeader from "../molecules/SidebarHeader";

export default function Sidebar() {
  return (
    <div className="fixed h-dvh w-[22vw] bg-accent-primary p-5 text-background-light">
      <SidebarHeader />
      <Divider />
    </div>
  );
}
