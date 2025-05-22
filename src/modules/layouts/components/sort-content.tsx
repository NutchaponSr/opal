import { Table } from "@tanstack/react-table";

import { CommandSearch } from "@/components/command-search";

import { 
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";
import { useViewSettingsStore } from "../store/use-view-settings-store";
import { SortSelector } from "./column-selector";
import { Sort } from "./sort";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlusIcon, Trash2Icon } from "lucide-react";
interface Props<T> {
  table: Table<T>;
  onClose: () => void;
}

export const SortContent = <T,>({ table, ...props }: Props<T>) => {
  const { isOpen, content, onBack } = useViewSettingsStore();

  const columns = table.getAllColumns()
    .filter((col) => col.getCanFilter() && !table.getState().sorting.some((s) => s.id === col.id))

  const open = isOpen && content === "sort";
  
  
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
  
  if (!open) return null;

  if (table.getState().sorting.length > 0) {
    return (
      <>
        <ViewSettingsHeader onBack={onBack} {...props}>
          Sort
        </ViewSettingsHeader>
        <ViewSettingsContent>
          <Sort 
            table={table}
            columns={columns}
            onDragEnd={onDragEnd}
          />
        </ViewSettingsContent>
        <Separator />
        <ViewSettingsContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="item" variant="item">
                <PlusIcon />
                Add Sort
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-64">
              <div className="flex flex-col p-1">
                <CommandSearch
                  placeholder="Sort by..."
                >
                  <SortSelector 
                    data={columns}
                    onSelect={(column) => {
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
                    }}
                  />
                </CommandSearch>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            size="item" 
            variant="item" 
            className="hover:text-destructive"
            onClick={() => {
                table.setSorting([])
            }}
          >
            <Trash2Icon />
            Delete sort
          </Button>
        </ViewSettingsContent>
      </>
    );
  }

  return (
    <>
      <ViewSettingsHeader onBack={onBack} {...props}>
        Add Sort
      </ViewSettingsHeader>
      <ViewSettingsContent>
        <CommandSearch
          placeholder="Sort by..."
          className="py-1 px-2 flex items-center"
        >
          <SortSelector 
            data={columns}
            onSelect={(column) => {
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
            }}
          />
        </CommandSearch>
      </ViewSettingsContent>
    </>
  );
}