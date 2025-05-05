
import { Command } from "cmdk";

import { ColumnType } from "@/types/columns";
import { Column } from "@tanstack/react-table";

interface Props<T> {
  data: Column<T>[];
  onSelect: (label: Column<T>, type: ColumnType) => void;
}

export const ColumnSelector = <T, >({ data, onSelect }: Props<T>) => {
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
            {Icon && <Icon className="size-5" />}
            {item.id}
          </Command.Item>
        );
      })}
    </Command.Group>
  );
}