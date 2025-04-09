"use client";

import { ArrowUpDownIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LayoutFilter } from "./layout-filter";
import { Table } from "@tanstack/react-table";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export const Toolbar = <TData,>({ table }: ToolbarProps<TData>) => {

  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0 z-[86]">
      <div className="flex items-center h-10 w-full dark:shadow-[0_1px_0_rgb(47,47,47)]">
        <div className="flex items-center h-full grow overflow-hidden" />
        <div className="flex items-center gap-px">
          <LayoutFilter table={table} />
          <Button 
            variant="ghost" 
            size="xs" 
            className="text-[#868686] hover:text-text-[#868686] dark:hover:bg-popover"
          >
            <ArrowUpDownIcon className="size-4 text-[#868686]" />
            Sort
          </Button>
          <Button.Icon className="size-7 dark:hover:bg-popover">
            <SearchIcon className="size-4 text-[#868686]" />
          </Button.Icon>
        </div>
      </div>
    </section>
  );
}