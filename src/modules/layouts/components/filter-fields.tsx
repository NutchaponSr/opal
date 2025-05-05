import { FunnelPlusIcon } from "lucide-react";

import { FilterGroup } from "@/types/columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { LayoutFilterProvider } from "./layout-filter-provider";
import { useLayoutFilterStore } from "../store/use-layout-filter-store";

interface Props<T> {
  filters: FilterGroup<T>;
  onAdd: () => void;
}

export const FilterFields = <T,>({ filters, onAdd }: Props<T>) => {
  const { setConnector } = useLayoutFilterStore();

  return (
    <>
      <div className="px-2 pt-2 pb-1 text-xs">
        In the view, show records
      </div>
      <ScrollArea className="flex flex-1 flex-col overflow-auto p-2 h-full">
        <div className="my-1 flex w-full items-center gap-2">
          <div className="shrink-0 min-w-16 text-center box-border">
            <span className="text-sm text-primary px-1">Where</span>
          </div>
          <LayoutFilterProvider filter={filters.filters[0]} />
        </div>

        {filters.filters.length > 1 && (
          <div className="h-full w-full flex relative gap-2">
            <div className="w-16 relative">
              <div className="absolute border-l border-dashed border-border h-full left-1/2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="xs" variant="primary" className="h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xs rounded px-2">
                    {filters.connector}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setConnector("AND")}>And</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setConnector("OR")}>Or</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-1">
              {filters.filters
                .slice(1)
                .map((f, index) => (
                  <LayoutFilterProvider key={index} filter={f} />
                ))
              }
            </div>
          </div>
        )}
      </ScrollArea>
      
      <div className="flex flex-row items-center gap-2 px-2 pt-1 pb-2">
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <FunnelPlusIcon />
          Add filter
        </Button>
      </div>
    </>
  );
}