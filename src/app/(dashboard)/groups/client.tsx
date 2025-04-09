"use client";

import { 
  ColumnFiltersState,
  getCoreRowModel, 
  getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { useState } from "react";

import { trpc } from "@/trpc/client";

import { group } from "@/types/workspace";

import { Banner } from "@/components/banner";
import { Toolbar } from "@/components/toolbar";

import { columns } from "@/modules/groups/components/group-columns";
import { LayoutProvider } from "@/modules/layouts/components/layout-provider";

export const GroupClientPage = () => {
  const [data] = trpc.groups.getAll.useSuspenseQuery();

  const groups = data.group;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: groups,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <>
      <Banner workspace={group} />
      <Toolbar table={table} />
      <LayoutProvider table={table} />
    </>
  );
}