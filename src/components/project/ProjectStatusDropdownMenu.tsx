import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ProjectStatusDropdownBadge from "./ProjectStatusDropdownBadge";
import { Database } from "@/types/supabase";

type ProjectStatusDropdownMenuProps = {
  fetchedProject: Database["public"]["Tables"]["projects"]["Row"];
};

export default function ProjectStatusDropdownMenu({
  fetchedProject,
}: ProjectStatusDropdownMenuProps) {
  const statusItems = [
    { variant: "pending", clickStatus: "pending" },
    { variant: "ready", clickStatus: "ready" },
    { variant: "onhold", clickStatus: "on hold" },
    { variant: "cancelled", clickStatus: "cancelled" },
  ] as const;

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Badge
            variant={
              fetchedProject.project_status.replace(/\s/g, "") as
                | "pending"
                | "ready"
                | "cancelled"
                | "onhold"
            }
            className="my-1 w-min text-center text-xs uppercase"
          >
            {fetchedProject.project_status}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusItems.map((item) => (
            <DropdownMenuItem key={item.variant}>
              <ProjectStatusDropdownBadge
                variant={item.variant}
                clickStatus={item.clickStatus}
                fetchedProjectId={fetchedProject.id}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Loader2 className="project-status-loader ml-2 size-4 animate-spin" />
    </div>
  );
}
