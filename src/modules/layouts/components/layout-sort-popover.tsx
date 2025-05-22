import { 
  ArrowLeftIcon,
  ArrowUpDownIcon, 
  PlusIcon,
} from "lucide-react";
import { useToggle } from "usehooks-ts";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, Table } from "@tanstack/react-table";

import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandSearch } from "@/components/command-search";

import { Sort } from "@/modules/layouts/components/sort";
import { SortSelector } from "@/modules/layouts/components/column-selector";

interface Props<T> {
  columns: Column<T>[];
  table: Table<T>;
}

export const LayoutSortPopover = <T,>({ columns, table }: Props<T>) => {
  const [isAdd, toggle, setToggle] = useToggle(false);

  const onSelect = (column: Column<T>) => {
    table.setSorting((currentSorting) => {
      if (currentSorting.some((item) => item.id === column.id)) {
        return currentSorting;
      }

      return [...currentSorting, { 
        id: column.id, 
        icon: column.columnDef.meta?.icon,
        type: column.columnDef.meta?.variant ?? "text",
        desc: false 
      }];
    });

    setToggle(true);
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      table.setSorting((currentSorting) => {
        const oldIndex = currentSorting.findIndex((item) => item.id === active.id)
        const newIndex = currentSorting.findIndex((item) => item.id === over.id)
        return arrayMove(currentSorting, oldIndex, newIndex)
      });
    }
  }

  const data = columns.filter((col) => !table.getState().sorting.some((s) => s.id === col.id))

  return (
    <Popover onOpenChange={() => setTimeout(() => setToggle(true), 100)}>
      <PopoverTrigger asChild>
        <Button size="smIcon" variant="icon">
          <ArrowUpDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-auto">
        {(isAdd && table.getState().sorting.length > 0) ? (
          <>
            <div>
              <Sort 
                table={table}
                columns={columns}
                onDragEnd={onDragEnd}
              />
              <Separator orientation="horizontal" />
              <div className="flex flex-col p-1">
                <Button variant="item" size="sm" onClick={toggle}>
                  <PlusIcon />
                  Add sort
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col p-1">
              <CommandSearch placeholder="Sort by...">
                <SortSelector 
                  data={data}
                  onSelect={onSelect}
                />
              </CommandSearch>
            </div>

            {table.getState().sorting.length > 0 && (
              <>
                <Separator />
                <div className="flex flex-col p-1">
                  <Button variant="item" size="sm" onClick={toggle}>
                    <ArrowLeftIcon />
                    Go back
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}