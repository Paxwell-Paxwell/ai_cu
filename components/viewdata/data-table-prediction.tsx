"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { FC, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PredictionEachBuilding } from "./columsPrediction";
import { Prediction } from '@/components/models/predictions';
import { columns } from '@/components/viewdata/columns';
import useSWR from "swr";
import { Building } from 'lucide-react';
import { DateTime } from "luxon";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable=<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>)=> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter date..."
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>{
            table.getColumn("date")?.setFilterValue(event.target.value)
          }
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value)=>{
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

interface PredictionTableProps {
  columns: ColumnDef<PredictionEachBuilding>[];
  frequency?: "hourly" | "daily" ;
  buildingId: string;
}
const samplePrediction: PredictionEachBuilding[] = [
  {
    date: DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS),
    energy: 100,
    peakPower: 500,
  },
  {
    date: DateTime.now().plus({ hours: 10 }).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS),
    energy: 100,
    peakPower: 100,
  },
];
export const DataTablePrediction: FC<PredictionTableProps> = ({
  columns,
  frequency = "hourly",
  buildingId,
}) => {
  const { data } = useSWR(`building//${buildingId}/${frequency}`);
  const dataset = useMemo(() => {
    let newdata: PredictionEachBuilding[] = data?.map((item: Prediction) => {
      return {
        date: DateTime.fromMillis(item.date).toLocaleString(DateTime.DATE_MED),
        energy: item.energy,
        peakPower: item.peakPower,
      };
    });
    return newdata;
  }, [data]);

  return (
      <DataTable columns={columns} data={
        dataset===undefined?((dataset as []).length===0?samplePrediction:dataset):samplePrediction
      } />
  );
      
}


