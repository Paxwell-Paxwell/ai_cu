"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface PredictionEachBuilding {
  date: string,
  energy: number,
  peakPower: number,
}
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
 
const reheader = (frequency: string = "hourly") => {
  const columns: ColumnDef<PredictionEachBuilding>[] = [
    {
      accessorKey: "date",
      header: `Date (${frequency})`,
    },
    {
      accessorKey: "energy",
      header: ({ column }) => {
        return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Energy
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        );
      },
      cell:({row})=>{
        const energy = parseFloat(row.getValue("energy"));
        const formatted = new Intl.NumberFormat("en-US").format(energy) + " kwh";
        return <div className="text-center font-medium">{formatted}</div>
      }
  
    },
    {
      accessorKey: "peakPower",
      header: ({ column }) => (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PeakPower
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const peakPower = parseFloat(row.getValue("peakPower"));
        const formatted = new Intl.NumberFormat("en-US").format(peakPower) + " kw";
  
        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
  ];
  return columns;
}

export default reheader;
