import { FilterIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { FilterFields } from "@/modules/layouts/components/filter-fields";

import { useLayoutFilterStore } from "@/modules/layouts/store/use-layout-filter-store";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
          size="smIcon"
          variant="ghost"
          className={cn("text-[#9B9A97] hover:text-[#9B9A97]", hasActiveFilters && "text-marine hover:text-marine")}
        >
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-auto"
        align="end"
      >
        <div className="px-1 py-0.5 min-h-6">
          <span className="mx-1 text-xs text-primary">
            {hasActiveFilters
              ? "In the view, show records"
              : "No filter conditions are applied"
            }
          </span>
        </div>
        <Separator orientation="horizontal" />
        <FilterFields 
          data={columns}
        />
      </PopoverContent>
    </Popover>
  );
}