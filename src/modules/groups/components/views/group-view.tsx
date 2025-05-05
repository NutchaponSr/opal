"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCoreRowModel, getFilteredRowModel, Row, useReactTable } from "@tanstack/react-table";

import { Group } from "@prisma/client";

import { useTRPC } from "@/trpc/client";

import { group } from "@/types/workspace";
import { FilterGroup } from "@/types/columns";

import { Banner } from "@/modules/layouts/components/banner";
import { Toolbar } from "@/modules/layouts/components/toolbar";

import { columns } from "@/modules/groups/components/group-columns";
import { LayoutProvider } from "@/modules/layouts/components/layout-provider";
import { useLayoutFilterStore } from "@/modules/layouts/store/use-layout-filter-store";
import { compareValues } from "@/modules/layouts/utils";

export const GroupView = () => {
  const trpc = useTRPC();
  const { filterGroup } = useLayoutFilterStore();

  const { data } = useSuspenseQuery(trpc.groups.getMany.queryOptions());

  const evaluateGroup = (group: FilterGroup<Group>, row: Row<Group>): boolean => {
    const filterResults = group.filters
      .filter((f) => f.column.id && f.operator && f.value)
      .map((filter) =>
        compareValues(
          row.getValue(filter.column.id as string),
          filter.value,
          filter.operator,
          filter.columnType,
        )
      );

    const groupResults = group.groups.map((subGroup) => evaluateGroup(subGroup, row));

    const allResults = [...filterResults, ...groupResults];

    if (allResults.length === 0) return true;

    return group.connector === 'AND'
      ? allResults.every((result) => result)
      : allResults.some((result) => result);
  }

  const filterData = (row: Row<Group>) => {
    return evaluateGroup(filterGroup, row);
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      custom: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      }
    },
    globalFilterFn: filterData,
    state: {
      globalFilter: filterGroup,
    }
  });

  return (
    <div className="flex flex-col grow relative overflow-auto">
      <Banner workspace={group} />
      <Toolbar columns={table.getAllColumns().filter((col) => col.getCanFilter())} />
      <LayoutProvider table={table} />
    </div>
  );
} 