"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Json } from "@/types/supabase";

export type DataTableProject = {
  contractor_name: string | null;
  project_name: string | null;
  contractor_id: string | null;
  created_at: string;
  id: string;
  project_id: string;
  quote_flags: Json;
  quote_inputs: Json;
  quote_status: "ready" | "draft";
  quote_total_amount: number | null;
};

const statusVariantMap: Record<
  DataTableProject["quote_status"],
  "draft" | "ready"
> = {
  draft: "draft",
  ready: "ready",
};

export const adminQuotesColumns: ColumnDef<DataTableProject>[] = [
  {
    accessorKey: "quote_status",
    header: "Status",
    cell: ({ row }) => {
      const quote = row.original;

      return (
        <div className="text-center">
          <Badge
            variant={statusVariantMap[quote.quote_status]}
            className="my-1 w-min select-none text-center text-xs uppercase"
          >
            {quote.quote_status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Quote\u00a0ID",
    cell: ({ row }) => {
      const quote = row.original;

      return (
        // FIXME: Check if href correct
        <div className="flex w-full max-w-xs items-center justify-between">
          <Link href={`/quotes/${quote.id}`}>
            <p className="w-full max-w-xs">
              {quote.id.slice(-6).toUpperCase()}
            </p>
          </Link>
          <Button
            variant="ghost"
            className="ml-2 grid aspect-square h-7 place-items-center p-0"
            onClick={() =>
              navigator.clipboard.writeText(quote.id.slice(-6).toUpperCase())
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
    header: "Project Name",
    cell: ({ row }) => {
      const quote = row.original;

      return (
        // FIXME: Check if href correct
        <Link href={`/projects/${quote.project_id}`}>
          <p className="w-full max-w-xs truncate">
            {quote.project_name
              ? quote.project_name
              : quote.project_id.slice(-6).toUpperCase()}
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
        return <p className="max-w-xs select-none">—</p>;
      }

      return (
        <Link href={`/clients/${quote.contractor_id}`}>
          <p className="w-full max-w-xs truncate">{quote.contractor_name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "quote_total_amount",
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
          <p className="w-full max-w-xs">
            £{" "}
            {quote.quote_total_amount
              ? quote.quote_total_amount.toFixed(2)
              : "—"}
          </p>
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
