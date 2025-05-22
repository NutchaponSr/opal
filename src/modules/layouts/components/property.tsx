import { 
  ChevronRightIcon,
  EyeIcon, 
  GripVerticalIcon, 
  EyeOffIcon 
} from "lucide-react";
import { 
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor, 
  PointerSensor,
  useSensor, 
  useSensors 
} from "@dnd-kit/core";
import { 
  SortableContext 
} from "@dnd-kit/sortable";
import { 
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor
} from "@dnd-kit/modifiers";
import { Command } from "cmdk";
import { CSS } from "@dnd-kit/utilities";
import { Column } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface PropertyProps<T> {
  data: Column<T>[];
  heading: string;
  action: string;
  isDraggable?: boolean;
  onClick: () => void;
  onToggle: (columnId: string) => void;
  onDragEnd?: (event: DragEndEvent) => void;
}

interface GroupProps<T> {
  data: Column<T>[];
  heading: string;
  action: string;
  isDraggable?: boolean;
  onClick: () => void;
  onDragEnd?: (event: DragEndEvent) => void;
  children: React.ReactNode;
  className?: string;
}

interface ItemProps<T> {
  column: Column<T>;
  onToggle: (columnId: string) => void;
}

function Group<T>({
  data,
  action,
  className,
  heading,
  isDraggable,
  onClick,
  onDragEnd,
  ...props
}: GroupProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  return (
    <Command.Group 
      data-slot="command-group"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground">
        {heading}
        <div 
          role="button"
          onClick={onClick}
          className="transition cursor-pointer inline-flex items-center rounded-sm py-0.5 px-1.5 whitespace-nowrap leading-[1.2] text-marine hover:bg-marine/7"
        >
          {action}
        </div>
      </div>
      {isDraggable ? (
        <div className="flex flex-col gap-px overflow-auto">
          <DndContext
            sensors={sensors} 
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={data.map((item) => item.id)}>
              {props.children}
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        props.children
      )}
    </Command.Group>
  );
}

export const Item = <T,>({ 
  column,
  onToggle,
}: ItemProps<T>) => {
  const Icon = column.columnDef.meta?.icon ?? (() => null);
  const isLock = column.columnDef.meta?.isLocked;

  const { 
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef 
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  }

  const handleToggleVisibility = () => {
    column.toggleVisibility();
    
    if (onToggle && !column.getIsVisible()) {
      onToggle(column.id);
    }
  };

  return (
    <Command.Item
      value={column.id}
      ref={setNodeRef}
      style={style}
      className="transition flex w-full rounded-sm data-[selected=true]:bg-accent capitalize"
    >
      <div className="flex items-center gap-2 leading-[120%] w-full select-none min-h-7 text-sm px-2 cursor-pointer">
        <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          <div className="flex items-center gap-2">
            <div {...attributes} {...listeners} className="flex items-center justify-center w-3.5 h-6 shrink-0 cursor-grab">
              <GripVerticalIcon className="size-4 text-muted-foreground" />
            </div>
            <Icon className="size-4" />
            <span>{column.id}</span>
          </div>
        </div>

        <div className="ml-auto shrink-0">
          <div className="flex items-center gap-1.5"> 
            <Button 
              size="icon" 
              variant="ghost" 
              disabled={!!isLock}
              onClick={handleToggleVisibility} 
              className={cn(!!isLock && "opacity-50")} 
            >
              {column.getIsVisible() 
                ? <EyeIcon />
                : <EyeOffIcon />
              }
            </Button>
            <ChevronRightIcon className="size-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </Command.Item>
  )
}

export const Property = <T,>({ data, onToggle, ...props }: PropertyProps<T>) => {
  return (
    <Group data={data} {...props}>
      {data.map((item) => (
        <Item 
          key={item.id} 
          column={item}
          onToggle={onToggle} 
        />
      ))}
    </Group>
  );
}