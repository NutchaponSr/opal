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
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { 
  restrictToFirstScrollableAncestor, 
  restrictToVerticalAxis 
} from "@dnd-kit/modifiers"
import { Column, Table } from "@tanstack/react-table";

import { SortItem } from "./sort-item";

interface Props<T> {
  table: Table<T>;
  columns: Column<T>[];
  onDragEnd: (event: DragEndEvent) => void;
}

export const Sort = <T,>({ table, columns, onDragEnd }: Props<T>) => {
  
  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  return (
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
                columns={columns}
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
  );
}