"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Json } from "@/types/supabase";

export type DataTableProject = {
  contractor_name: string | null;
  contractor_id: string | null;
  created_at: string;
  id: string;
  project_id: string;
  quote_flags: Json;
  quote_inputs: Json;
};

export const adminQuotesColumns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "id",
    header: "Quote ID",
    cell: ({ row }) => {
      const quote = row.original;

      return (
        // FIXME: Check if href correct
        <Link href={`/quotes/${quote.id}`}>
          <p className="w-full max-w-xs">{quote.id.slice(-6).toUpperCase()}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "project_id",
    header: "Proj. ID",
    cell: ({ row }) => {
      const quote = row.original;

      return (
        // FIXME: Check if href correct
        <Link href={`/projects/${quote.project_id}`}>
          <p className="w-full max-w-xs">
            {quote.project_id.slice(-6).toUpperCase()}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "contractor_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contractor
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quote = row.original;

      if (!quote.contractor_name) {
        return <p className="max-w-xs">—</p>;
      }

      return (
        <Link href={`/clients/${quote.contractor_id}`}>
          <p className="w-full max-w-xs truncate">{quote.contractor_name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quote = row.original;

      return (
        <Link href={`/quotes/${quote.id}`}>
          <p className="w-full max-w-xs">£ FIXME</p>
        </Link>
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
      const quote = row.original;

      return (
        <p>
          {new Date(quote.created_at).toLocaleDateString()}&nbsp;
          {new Date(quote.created_at).toLocaleTimeString().slice(0, 5)}
        </p>
      );
    },
  },
];
