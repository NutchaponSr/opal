"use client";

import { 
  ColumnFiltersState,
  getCoreRowModel, 
  getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { customFilterFn } from "@/lib/utils";

import { trpc } from "@/trpc/client";

import { group } from "@/types/workspace";

import { useColumnFilterStore } from "@/stores/use-column-filter";

import { Banner } from "@/components/banner";
import { Toolbar } from "@/components/toolbar";

import { columns } from "@/modules/groups/components/group-columns";
import { LayoutProvider } from "@/modules/layouts/components/layout-provider";

export const GroupClientPage = () => {
  const { setTable } = useColumnFilterStore();

  const [data] = trpc.groups.getAll.useSuspenseQuery();

  const groups = data.group;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: groups,
    columns,
    state: {
      columnFilters,
    },
    filterFns: { custom: customFilterFn },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    setTable(table);
  }, [table, setTable]);

  console.log({
    data: groups,
    column: table.getState().columnFilters,
    dataFilterColumn: table.getFilteredSelectedRowModel().rows,
  })

  return (
    <>
      <Banner workspace={group} />
      <Toolbar table={table} />
      <LayoutProvider table={table} />
    </>
  );
}