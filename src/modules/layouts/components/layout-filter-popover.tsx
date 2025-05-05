import { useToggle } from "usehooks-ts";
import { FilterIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { ColumnType } from "@/types/columns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { CommandSearch } from "@/components/command-search";

import { ColumnSelector } from "./column-selector";
import { FilterFields } from "./filter-fields";

import { useLayoutFilterStore } from "../store/use-layout-filter-store";

interface Props<T> {
  columns: Column<T>[];
}

export const LayoutFilterPopover = <T,>({ columns }: Props<T>) => {
  const { filterGroup, addFilter } = useLayoutFilterStore();

  const [isAdd, toggle, setIsAdd] = useToggle(false);

  const hasActiveFilters = filterGroup.filters.some((f) => f.column && f.operator) || filterGroup.groups.length > 0;

  const handleSelect = (column: Column<T>, columnType: ColumnType) => {
    addFilter(column, columnType);
    setIsAdd(false);
  }

  return (
    <Popover onOpenChange={() => setTimeout(() => setIsAdd(false), 100)}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-[#9B9A97] hover:text-[#9B9A97]"
        >
          <FilterIcon />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-auto"
        align="end"
      >
        {(!isAdd && hasActiveFilters) ? (
          <FilterFields filters={filterGroup} onAdd={toggle} />
        ) : (
          <CommandSearch placeholder="Filter by...">
            <ColumnSelector 
              data={columns}
              onSelect={handleSelect}
            />
          </CommandSearch>
        )}
      </PopoverContent>
    </Popover>
  );
}