
import { Command } from "cmdk";

import { ColumnType } from "@/types/columns";
import { Column } from "@tanstack/react-table";

interface ColumnSelectorProps<T> {
  data: Column<T>[];
  onSelect: (column: Column<T>, type: ColumnType) => void;
}

export const ColumnSelector = <T,>({ data, onSelect }: ColumnSelectorProps<T>) => {
  return (
    <Command.Group>
      {data.map((item) => {
        const Icon = item.columnDef.meta?.icon;
        const type = item.columnDef.meta?.variant;

        return (
          <Command.Item
            key={item.id}
            value={item.id}
            onSelect={() => onSelect(item, type ?? "text")}
            className="flex items-center gap-2 px-2 py-1 text-sm text-primary rounded-sm h-7 data-[selected=true]:bg-[#37352f0f] capitalize cursor-pointer"
          >
            {Icon && <Icon className="size-5 stroke-[1.5]" />}
            {item.id}
          </Command.Item>
        );
      })}
    </Command.Group>
  );
}

interface SortSelectorProps<T> {
  data: Column<T>[];
  onSelect: (column: Column<T>) => void;
}

export const SortSelector = <T,>({
  data,
  onSelect
}: SortSelectorProps<T>) => {
  return (
    <Command.Group>
      {data.map((item) => {
        const Icon = item.columnDef.meta?.icon;

        return (
          <Command.Item
            key={item.id}
            value={item.id}
            onSelect={() => onSelect(item)}
            className="flex items-center gap-2 px-2 py-1 text-sm text-primary rounded-sm h-7 data-[selected=true]:bg-[#37352f0f] capitalize cursor-pointer"
          >
            {Icon && <Icon className="size-5 stroke-[1.5]" />}
            {item.id}
          </Command.Item>
        );
      })}
    </Command.Group>
  );
}