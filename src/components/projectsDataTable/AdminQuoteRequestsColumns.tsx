"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, Copy, Divide, Folder } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import googleDriveIcon from "/public/icons/google-drive.svg";

export type DataTableProject = {
  id: string;
  project_status: "pending" | "ready" | "cancelled" | "on hold";
  project_name: string;
  google_drive_folder_link: string;
  project_postcode: string;
  client_name: string;
  client_email: string;
  created_at: string;
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

export const adminQuoteRequestsColumns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "project_status",
    header: "Status",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="text-center">
          <Badge
            variant={statusVariantMap[project.project_status]}
            className="my-1 w-min select-none text-center text-xs uppercase"
          >
            {project.project_status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="flex w-full max-w-xs items-center justify-between">
          <Link href={`/projects/${project.id}`}>
            <p className="w-full max-w-xs">
              {project.id.slice(-6).toUpperCase()}
            </p>
          </Link>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={(event) =>
              navigator.clipboard.writeText(project.id.slice(-6).toUpperCase())
            }
          >
            <Copy className="size-4" />
          </Button>
        </div>
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
    accessorKey: "google_drive_folder_link",
    header: () => {
      return <Folder className="size-5" />;
    },
    cell: ({ row }) => {
      const project = row.original;

      return (
        <a
          href={project.google_drive_folder_link}
          target="_blank"
          rel="noreferrer noopener"
          className="size-5"
        >
          <Image
            src={googleDriveIcon}
            alt="Google Drive Icon"
            width={24}
            height={24}
          />
        </a>
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
  {
    accessorKey: "client_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original;

      // TODO: Implement Client Link
      return <p className="w-full max-w-xs truncate">{project.client_name}</p>;
    },
  },
  {
    accessorKey: "client_email",
    header: "Client Email",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <a
          href={`mailto:${project.client_email}`}
          className="w-full max-w-xs truncate"
        >
          {project.client_email}
        </a>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original;

      return (
        <p>
          {new Date(project.created_at).toLocaleDateString()}&nbsp;
          {new Date(project.created_at).toLocaleTimeString().slice(0, 5)}
        </p>
      );
    },
  },
];
