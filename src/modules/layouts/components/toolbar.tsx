import { Column, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { LayoutFilterPopover } from "./layout-filter-popover";
import { LayoutSortPopover } from "./layout-sort-popover";
import { SearchIcon, ZapIcon } from "lucide-react";

interface Props<T> {
  columns: Column<T>[];
  table: Table<T>;
}

export const Toolbar = <T,>({ ...props }: Props<T>) => {
  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0">
      <div className="flex justify-between items-center h-10 shadow-[0_1px_0_rgb(233,233,231)] w-full">
        <div className="flex items-center h-full grow-0" />
        
        <div className="flex items-center justify-end gap-px">
          <LayoutFilterPopover {...props} />
          <LayoutSortPopover {...props} />
          <Button
            size="smIcon"
            variant="ghost"
            className="text-[#9B9A97] hover:text-[#9B9A97]"
          >
            <ZapIcon />
          </Button>
          <Button
            size="smIcon"
            variant="ghost"
            className="text-[#9B9A97] hover:text-[#9B9A97]"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}