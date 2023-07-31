"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status:
    | "pending"
    | "processing"
    | "success"
    | "failed"
    | "cancelled"
    | "completed";
  email: string;
};
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US").format(amount) + " kw";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
