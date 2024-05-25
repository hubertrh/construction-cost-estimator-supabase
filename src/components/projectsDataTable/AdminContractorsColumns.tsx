"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, Copy } from "lucide-react";
import { Button } from "../ui/button";

export type DataTableProject = {
  id: string;
  name: string;
  email: string;
};

export const adminContractorsColumns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contractor Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const contractor = row.original;

      return (
        <div className="flex w-full max-w-xs items-center justify-between">
          <Link href={`/contractors/${contractor.id}`}>
            <p className="w-full max-w-xs truncate">{contractor.name}</p>
          </Link>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() => navigator.clipboard.writeText(contractor.name)}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contractor Email
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const contractor = row.original;

      return (
        <div className="flex w-full max-w-xs items-center justify-between">
          {/* <p className="w-full max-w-xs truncate">{contractor.email}</p> */}
          <a
            href={`mailto:${contractor.email}`}
            className="w-full max-w-xs truncate"
          >
            {contractor.email}
          </a>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() => navigator.clipboard.writeText(contractor.email)}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const contractor = row.original;

      return (
        <div className="flex w-full max-w-xs items-center justify-between">
          <Link href={`/contractors/${contractor.id}`}>
            <p className="w-full max-w-xs">
              {contractor.id.slice(-6).toUpperCase()}
            </p>
          </Link>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() =>
              navigator.clipboard.writeText(
                contractor.id.slice(-6).toUpperCase(),
              )
            }
          >
            <Copy className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
