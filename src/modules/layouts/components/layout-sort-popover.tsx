import { 
  ArrowLeftIcon,
  ArrowUpDownIcon, 
  PlusIcon,
} from "lucide-react";
import { 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent, 
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { useToggle } from "usehooks-ts";
import { Column, Table } from "@tanstack/react-table";

import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandSearch } from "@/components/command-search";

import { SortItem } from "@/modules/layouts/components/sort-item";
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

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Handle DnD end
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
              <div className="flex flex-col p-1 gap-1 overflow-auto">
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter} 
                  onDragEnd={onDragEnd}
                  modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
                >
                  <SortableContext 
                    items={table.getState().sorting.map((s) => s.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                      {table.getState().sorting.map((column) => (
                        <SortItem 
                          key={column.id}
                          column={column}
                          columns={data}
                          onSelect={(col) => {
                            table.setSorting((currentSorting) => 
                              currentSorting.map((item) => 
                                item.id === column.id
                                  ? {
                                    id: col.id,
                                    icon: col.columnDef.meta?.icon,
                                    type: col.columnDef.meta?.variant ?? "text",
                                    desc: item.desc,
                                  } : item
                              )
                            )
                          }}
                          onChange={() => 
                            table.setSorting((prev) => prev.map((item) => 
                              item.id === column.id ? { ...item, desc: !item.desc } : item
                          ))}
                          onRemove={() => table.setSorting((prev) => prev.filter((item) => item.id !== column.id))}
                        />
                      ))}
                  </SortableContext>
                </DndContext>
              </div>
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