import { 
  ChevronDownIcon, 
  GripVerticalIcon, 
  XIcon
} from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Column, ColumnSort } from "@tanstack/react-table";

import { columnSortOptions } from "@/types/columns";

import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandSearch } from "@/components/command-search";

import { SortSelector } from "@/modules/layouts/components/column-selector";

interface Props<T> {
  column: ColumnSort;
  columns: Column<T>[];
  onSelect: (column: Column<T>) => void;
  onChange: () => void;
  onRemove: () => void;
}

export const SortItem = <T,>({ 
  column, 
  columns, 
  onSelect,
  onChange,
  onRemove
}: Props<T>) => {
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

  return (
    <div ref={setNodeRef} style={style} className="flex h-7 items-center rounded-sm border border-border shadow-xs bg-background text-xs w-fit">
      <div {...attributes} {...listeners} className="flex items-center justify-center size-7 cursor-grab">
        <GripVerticalIcon className="size-3.5" />
      </div>
      <Separator orientation="vertical" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="group" className="justify-between min-w-40">
            <span className="flex items-center gap-1 whitespace-nowrap font-medium capitalize">
              {column.icon && <column.icon className="size-4" />}             
              {column.id}
            </span>
            <ChevronDownIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-48">
          <CommandSearch placeholder="Sort by...">
            <SortSelector 
              data={columns.filter((col) => col.id !== column.id)}
              onSelect={onSelect}
            />
          </CommandSearch>
        </PopoverContent>
      </Popover>
      <Separator orientation="vertical" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="group">
            {!column.desc 
              ? columnSortOptions[column.type][0]
              : columnSortOptions[column.type][1]
            }
            <ChevronDownIcon className="size-4" />
          </Button> 
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-1">
          {columnSortOptions[column.type].map((item, index) => (
            <DropdownMenuItem 
              key={index}
              className="text-xs"
              onClick={onChange}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" />

      <Button 
        variant="ghost" 
        size="group" 
        className="rounded-r-sm"
        onClick={onRemove}
      >
        <XIcon />
      </Button> 
    </div>
  );
}