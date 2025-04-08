"use client";

import { 
  getCoreRowModel, 
  getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";

import { Banner } from "@/components/banner";
import { Toolbar } from "@/components/toolbar";
import { trpc } from "@/trpc/client";

import { group } from "@/types/workspace";

import { columns } from "@/modules/groups/components/group-columns";
import { LayoutProvider } from "@/modules/layouts/components/layout-provider";

export const GroupClientPage = () => {
  const [data] = trpc.groups.getAll.useSuspenseQuery();

  const groups = data.group;

  const table = useReactTable({
    data: groups,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <Banner workspace={group} />
      <Toolbar table={table} />
      <LayoutProvider table={table} />
    </>
  );
}