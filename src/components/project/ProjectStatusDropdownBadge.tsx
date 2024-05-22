"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Badge } from "../ui/badge";
import handleStatusUpdate from "./handleStatusUpdate";

type ProjectStatusDropdownBadgeProps = {
  variant: "pending" | "ready" | "cancelled" | "onhold";
  clickStatus: "pending" | "ready" | "cancelled" | "on hold";
  fetchedProjectId: string;
};

export default function ProjectStatusDropdownBadge({
  variant,
  clickStatus,
  fetchedProjectId,
}: ProjectStatusDropdownBadgeProps) {
  const router = useRouter();

  return (
    <>
      <Badge
        variant={variant}
        className="w-min text-center text-xs uppercase"
        onClick={async () => {
          document.documentElement.style.setProperty(
            "--project-status-loader-visibility",
            "visible",
          );
          await handleStatusUpdate(fetchedProjectId, clickStatus);
          router.refresh();
          setTimeout(() => {
            document.documentElement.style.setProperty(
              "--project-status-loader-visibility",
              "hidden",
            );
          }, 1000);
        }}
      >
        {clickStatus}
      </Badge>
    </>
  );
}
