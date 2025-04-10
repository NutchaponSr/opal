import { FilterIcon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "./ui/popover";
import { Button } from "./ui/button";
import { Table } from "@tanstack/react-table";
import { Separator } from "./ui/separator";
import { useColumnFilterStore } from "@/stores/use-column-filter";
import { useToggle } from "react-use";
import { CommandPopover } from "./command-popover";
import { FilterConditionRow } from "./filter-condition-row";
import { Badge } from "./ui/badge";

const font = JetBrains_Mono({ subsets: ["latin"] });

interface LayoutFilter<TData> {
  table: Table<TData>;
}

export const LayoutFilter = <TData,>({ table }: LayoutFilter<TData>) => {
  const { columnFilter, setColumnFilter } = useColumnFilterStore();

  const [onAdd, toggle] = useToggle(false);

  const firstColumnId = Array.from(columnFilter)[0];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xs" className="text-[#868686] hover:text-[#868686] dark:hover:bg-[#262626]">
          <FilterIcon className="size-4 text-[#868686]" />
          Filter
          {columnFilter.size > 0 && (
            <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center">
              {columnFilter.size}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        sideOffset={12} 
        className={cn(
          "p-0 w-auto", 
          font.className
        )}
      >
        {(onAdd) ? (
          <div className="flex flex-col">
            <div className="p-2 text-xs text-primary">
              In the view, show record
            </div>
            <div className="flex flex-1 flex-col overflow-auto p-2">
              <div className="my-1 flex w-full items-start gap-2">
                <div className="flex shrink-0 justify-start min-w-16 box-border">
                  <span className="px-1 text-sm font-medium text-primary leading-9">
                    Where
                  </span>
                </div>
                {firstColumnId && table.getColumn(firstColumnId) && (
                  <FilterConditionRow column={table.getColumn(firstColumnId)!} />
                )}
              </div>
              {columnFilter.size > 1  && (
                <div className="flex relative">
                  <Badge variant="primary" className="h-5 absolute top-1/2 -translate-y-1/2 z-10 text-xs rounded">
                    And 
                  </Badge>
                  <div className="absolute border-l border-dashed border-primary h-full left-5" />
                  <div className="flex flex-1 flex-col pl-12">
                    {table.getAllColumns()
                      .filter((column) => column.getCanFilter() && column.id !== firstColumnId && columnFilter.has(column.id))
                      .map((column) => (
                        <FilterConditionRow key={column.id} column={column} />
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-2 text-xs text-primary">
              <Button size="sm" variant="ghost" onClick={() => toggle(!onAdd)} className="dark:hover:bg-[#ffffff0e]">
                Add filter
              </Button>
            </div>
          </div>
        ) : (
          <>
            <CommandPopover
              data={table.getAllColumns()
                .filter((column) => column.getCanFilter() && !columnFilter.has(column.id))
                .map((column) => ({
                  label: column.id,
                  icon: column.columnDef.meta?.icon ?? "",
                  onSelect: (id: string) => {
                    setColumnFilter(id);
                    toggle(!onAdd);
                  },
                }))
              }
            />
            <Separator />
            <div className="flex flex-col p-1">
              <Button onClick={() => toggle(!onAdd)} size="sm" variant="ghost" className=" w-full text-xs text-primary dark:hover:bg-[#ffffff0e]">
                Go back
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}