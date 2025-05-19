"use client";

import { 
  getCoreRowModel, 
  getFilteredRowModel, 
  getSortedRowModel, 
  Row, 
  SortingState,
   useReactTable 
  } from "@tanstack/react-table";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Group } from "@prisma/client";

import { useTRPC } from "@/trpc/client";

import { group } from "@/types/workspace";
import { FilterGroup } from "@/types/columns";

import { Banner } from "@/modules/layouts/components/banner";
import { Toolbar } from "@/modules/layouts/components/toolbar";
import { columns } from "@/modules/groups/components/group-columns";
import { LayoutProvider } from "@/modules/layouts/components/layout-provider";

import { compareValues } from "@/modules/layouts/utils";

import { useLayoutFilterStore } from "@/modules/layouts/store/use-layout-filter-store";

interface Props {
  organizationId: string;
}

export const GroupView = ({ organizationId }: Props) => {
  const trpc = useTRPC();
  const { filterGroup } = useLayoutFilterStore();

  const { data } = useSuspenseQuery(trpc.groups.getMany.queryOptions({ organizationId }));

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const isFilterGroupEmpty = (group: FilterGroup<Group>): boolean => {
    return group.filters.length === 0 && group.groups.length === 0;
  };

  const evaluateGroup = (group: FilterGroup<Group>, row: Row<Group>): boolean => {
    if (isFilterGroupEmpty(group)) return true;

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

    const allResults = [...filterResults, ...groupResults].filter(result => result !== undefined);

    if (allResults.length === 0) return true;

    return group.connector === "AND"
      ? allResults.every((result) => result)
      : allResults.some((result) => result);
  }

  const filterData = (row: Row<Group>) => {
    const passesFilterGroup = evaluateGroup(filterGroup, row);
    
    if (!globalFilter) return passesFilterGroup;
    
    const passesGlobalTextFilter = Object.keys(row.original)
      .some(key => {
        const value = row.original[key as keyof Group];
        if (value === null || typeof value === 'object') return false;
        return String(value).toLowerCase().includes(globalFilter.toLowerCase());
      });
      
    return passesFilterGroup && passesGlobalTextFilter;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setGlobalFilter(searchValue);
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      custom: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterData,
    state: {
      sorting,
      globalFilter: globalFilter || filterGroup,
    }
  });

  return (
    <div className="flex flex-col grow relative overflow-auto">
      <Banner workspace={group} />
      <Toolbar 
        table={table} 
        columns={table.getAllColumns().filter((col) => col.getCanFilter())}
        searchTerm={globalFilter}
        onChange={handleChange} 
      />
      <LayoutProvider table={table} />
    </div>
  );
} 