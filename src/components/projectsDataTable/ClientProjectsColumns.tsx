"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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

export const clientProjectsColumns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "project_status",
    header: "Status",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <Badge
          variant={statusVariantMap[project.project_status]}
          className="my-1 w-min text-center text-xs uppercase"
        >
          {project.project_status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const project = row.original;

      return (
        <Link href={`/projects/${project.id}`}>
          <p className="w-full max-w-xs truncate">{project.project_name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "project_postcode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Postcode
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
];
