import { FilterIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FilterFields } from "@/modules/layouts/components/filter-fields";

import { useLayoutFilterStore } from "@/modules/layouts/store/use-layout-filter-store";

interface Props<T> {
  columns: Column<T>[];
}

export const LayoutFilterPopover = <T,>({ columns }: Props<T>) => {
  const { filterGroup } = useLayoutFilterStore();

  const hasActiveFilters = filterGroup.filters.some((f) => f.column && f.operator) || filterGroup.groups.length > 0;

  return (
    <Popover>
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
        <div className="px-2 pt-2 text-xs">
          {hasActiveFilters
            ? "In the view, show records"
            : "No filter conditions are applied"
          }
        </div>
        <ScrollArea className="flex flex-1 flex-col overflow-auto p-2 pt-0 h-full">
          <FilterFields 
            data={columns}
          />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}