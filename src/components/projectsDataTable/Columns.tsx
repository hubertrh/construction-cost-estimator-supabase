"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "../ui/badge";

export type DataTableProject = {
  id: string;
  project_status: "pending" | "ready" | "cancelled" | "on hold";
  project_name: string;
  project_postcode: string;
};

const statusVariantMap: Record<
  DataTableProject["project_status"],
  "pending" | "ready" | "cancelled" | "onhold"
> = {
  pending: "pending",
  ready: "ready",
  cancelled: "cancelled",
  "on hold": "onhold",
};

export const columns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "project_status",
    header: "Status",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <Badge
          variant={statusVariantMap[project.project_status]}
          className="my-1 text-center text-xs uppercase"
        >
          {project.project_status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: "Project Name",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <Link href={`/projects/${project.id}`}>
          <p className="max-w-xs truncate">{project.project_name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "project_postcode",
    header: "Postcode",
  },
];
