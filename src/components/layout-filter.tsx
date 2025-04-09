import { Command } from "cmdk";
import { useState } from "react";
import { ChevronDownIcon, FilterIcon, MoreHorizontalIcon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "./ui/popover";
import { Button } from "./ui/button";
import { inputVariants } from "./ui/input";
import { Table } from "@tanstack/react-table";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Separator } from "./ui/separator";

const font = JetBrains_Mono({ subsets: ["latin"] });

interface LayoutFilter<TData> {
  table: Table<TData>;
}

export const LayoutFilter = <TData,>({ table }: LayoutFilter<TData>) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  console.log(selectedColumns);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xs" className="text-[#868686] hover:text-[#868686] dark:hover:bg-[#262626]">
          <FilterIcon className="size-4 text-[#868686]" />
          Filter
          {selectedColumns.length > 0 && (
            <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center">
              {selectedColumns.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        sideOffset={12} 
        className={cn(
          "p-0", 
          selectedColumns.length > 0 ? "w-[540px]" : "w-60", 
          font.className
        )}
      >
        {selectedColumns.length > 0 ? (
          <div className="flex flex-col">
            <div className="p-2 text-xs text-primary">
              In the view, show record
            </div>
            <div className="flex flex-1 flex-col overflow-auto p-2">
              {table.getAllColumns().filter((column) => column.getCanFilter() && selectedColumns.includes(column.id)).map((column) => {
                const icon = column.columnDef.meta?.icon;

                return (
                  <div key={column.id} className="my-1 flex w-full items-start gap-2">
                    <div className="flex shrink-0 justify-start min-w-16 box-border">
                      <span className="px-1 text-sm font-medium text-primary leading-9">
                        Where
                      </span>
                    </div>
                    <div className="flex items-center gap-2 self-center">
                      <div className="flex h-7 items-center rounded-md shadow-[0_0_0_1px_rgba(15,15,15,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.094)] bg-background text-xs">
                        <span className="flex select-none items-center gap-2 whitespace-nowrap px-2 font-medium">
                          {icon && <Icon icon={icon} width={16} height={16} />}
                          <span className="capitalize text-primary mt-0.5">
                            {column.id}
                          </span>
                        </span>
                        <Separator orientation="vertical" />
                        <Button size="sm" variant="ghost" className="rounded-none text-xs font-normal">
                          contain
                          <ChevronDownIcon className="size-3 text-muted-foreground" />
                        </Button>
                        <Separator orientation="vertical" />
                        <Button size="sm" variant="ghost" className="rounded-none text-xs font-normal max-w-[150px]">
                          <MoreHorizontalIcon />
                        </Button>
                        <Separator orientation="vertical" />
                        <Button size="sm" variant="ghost" className="text-xs font-normal rounded-l-none w-8 h-full">
                          <Icon icon="ion:trash-outline" width={16} height={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Command className="p-1.5 gap-2 bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md">
            <Command.Input 
              autoFocus
              placeholder="Filter by..." 
              className={cn(inputVariants({ variant: "search", area: "sm" }), font.className)} 
            />
            <Command.List>
              <Command.Empty className={cn(font.className)}>No results found.</Command.Empty>
              <Command.Group className="flex flex-col gap-px">
                {table.getAllColumns().filter((column) => column.getCanFilter()).map((column) => (
                  <Command.Item 
                    key={column.id} 
                    onSelect={() => setSelectedColumns((prev) => [...prev, column.id])}
                    className={cn(
                      "h-7 rounded-sm flex items-center py-1 px-2 hover:bg-[#ffffff0e] data-[selected=true]:bg-[#ffffff0e] cursor-pointer",
                      font.className,
                    )}
                  >
                    {column.id}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List> 
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}