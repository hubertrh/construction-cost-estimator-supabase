"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, Copy } from "lucide-react";
import { Button } from "../ui/button";

export type DataTableProject = {
  project_count: number;
  client_name: string;
  client_email: string;
  user_id: string | null;
};

export const adminClientsColumns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "client_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex w-full max-w-xs items-center justify-between">
          {/* TODO: Add client page without user_id or implement anonymous auth */}
          <Link
            href={
              client.user_id
                ? `/admin/dashboard/clients/${client.user_id}`
                : "#!"
            }
          >
            <p className="w-full max-w-xs truncate">{client.client_name}</p>
          </Link>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() => navigator.clipboard.writeText(client.client_name)}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "client_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Email
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex w-full max-w-xs items-center justify-between">
          <a
            href={`mailto:${client.client_email}`}
            className="w-full max-w-xs truncate"
          >
            {client.client_email}
          </a>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() => navigator.clipboard.writeText(client.client_email)}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "project_count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #P
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;

      return (
        <Link
          href={
            client.user_id ? `/admin/dashboard/clients/${client.user_id}` : "#!"
          }
        >
          <p className="text-center">{client.project_count}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => {
      const client = row.original;

      return client.user_id === null ? (
        <p className="w-full max-w-xs select-none">—</p>
      ) : (
        <div className="flex w-full max-w-xs items-center justify-between">
          <Link href={`/clients/${client.user_id}`}>
            <p className="w-full max-w-xs">
              {client.user_id?.slice(-6).toUpperCase()}
            </p>
          </Link>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() => {
              const userId = client.user_id?.slice(-6).toUpperCase();
              if (userId) {
                navigator.clipboard.writeText(userId);
              }
            }}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
