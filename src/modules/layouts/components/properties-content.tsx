import { DragEndEvent } from "@dnd-kit/core";
import { Table } from "@tanstack/react-table";
import { arrayMove } from "@dnd-kit/sortable";
import { CircleHelpIcon } from "lucide-react";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandSearch } from "@/components/command-search";

import { 
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";
import { Property } from "@/modules/layouts/components/property";

import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";

interface Props<T> {
  table: Table<T>;
  onClose: () => void;
}

export const PropertiesContent = <T,>({ table, ...props }: Props<T>) => {
  const { isOpen, content, onBack } = useViewSettingsStore();

  const open = isOpen && content === "properties";

  const displayableColumns = table.getAllLeafColumns().filter(col => 
    col.id !== "actions");

  const sortableColumns = displayableColumns;

  const getCurrentColumnOrder = () => {
    return table.getState().columnOrder.length > 0 
      ? [...table.getState().columnOrder]
      : table.getAllColumns().map(col => col.id);
  };

  const isValidColumnMove = (activeId: string, overId: string) => {
    const sortableColumnIds = sortableColumns.map(col => col.id);
    return sortableColumnIds.includes(activeId) && sortableColumnIds.includes(overId);
  };

  const updateColumnOrder = useCallback(() => {
    const allColumns = table.getAllColumns().map(col => col.id);
    const newOrder = [
      ...(["actions", "name"].filter(id => allColumns.includes(id))),
      ...allColumns.filter(id => !["actions", "name"].includes(id))
    ];
    table.setColumnOrder(newOrder);
  }, [table]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id || !isValidColumnMove(active.id as string, over.id as string)) {
      return;
    }

    const currentOrder = getCurrentColumnOrder();
    const oldIndex = currentOrder.indexOf(active.id as string);
    const newIndex = currentOrder.indexOf(over.id as string);

    if (oldIndex !== -1 && newIndex !== -1) {
      table.setColumnOrder(arrayMove(currentOrder, oldIndex, newIndex));
    }
  };
  
  const handleColumnToggle = (columnId: string) => {
    const currentOrder = getCurrentColumnOrder();
    const index = currentOrder.indexOf(columnId);
    
    if (index !== -1) {
      const newOrder = [...currentOrder];
      newOrder.splice(index, 1);
      newOrder.push(columnId);
      table.setColumnOrder(newOrder);
      updateColumnOrder();
    }
  };

  useEffect(() => {
    if (open) {
      updateColumnOrder();
    }
  }, [open, updateColumnOrder]);
  
  if (!open) return null;

  return (
    <>
      <ViewSettingsHeader onBack={onBack} {...props}>
        Properties
      </ViewSettingsHeader>
      <ViewSettingsContent>
        <CommandSearch 
          placeholder="Search for a property..."
          className="py-1 px-2 flex items-center"
        >
          <Property 
            isDraggable
            onDragEnd={handleDragEnd}
            action="hidden all" 
            heading="Shown in Table" 
            onClick={() => {
              table.toggleAllColumnsVisible(false);
              updateColumnOrder();
            }}
            onToggle={handleColumnToggle}
            data={displayableColumns.filter((f) => f.getIsVisible())} 
          />    
          {table.getAllColumns().filter((col) => !col.getIsVisible()).length > 0 && (
            <Property
              heading="Hidden in Table" 
              action="show all" 
              onClick={() => {
                table.toggleAllColumnsVisible(true);
                updateColumnOrder(); 
              }}
              onToggle={handleColumnToggle}
              data={displayableColumns.filter((f) => !f.getIsVisible())} 
            />
          )}
        </CommandSearch>
      </ViewSettingsContent>
      <Separator />
      <ViewSettingsContent>
        <Button size="item" variant="item">
          <CircleHelpIcon />
          Learn about properties
        </Button>
      </ViewSettingsContent>
    </>
  );
}