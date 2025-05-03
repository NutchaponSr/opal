"use client";

import { group } from "@/types/workspace";

import { Banner } from "@/modules/layouts/components/banner";
import { Toolbar } from "@/modules/layouts/components/toolbar";

import { LayoutProvider } from "@/modules/layouts/components/layout-provider";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../group-columns";

export const GroupView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.groups.getMany.queryOptions());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      custom: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      }
    }
  })

  return (
    <div className="flex flex-col grow relative overflow-auto">
      <Banner workspace={group} />
      <Toolbar />
      <LayoutProvider table={table} />
    </div>
  );
} 