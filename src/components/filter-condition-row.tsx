import { useState } from "react";
import { Column } from "@tanstack/react-table";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { ChevronDownIcon, MoreHorizontalIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandPopover } from "@/components/command-popover";
import { useColumnFilterStore } from "@/stores/use-column-filter";

interface FilterConditionRowProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export const FilterConditionRow = <TData, TValue>({
  column
}: FilterConditionRowProps<TData, TValue>) => {
  const { onRemove } = useColumnFilterStore();

  const icon = column?.columnDef.meta?.icon;
  const options = column?.columnDef.meta?.options || [];
  
  const [selectedOperator, setSelectedOperator] = useState(options[0] || "");

  if (!column?.id) return null;

  return (
    <div className="flex items-center gap-2 self-center">
      <div className="flex h-7 items-center rounded-md shadow-[0_0_0_1px_rgba(15,15,15,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.094)] bg-background text-xs">
        <span className="flex select-none items-center gap-2 whitespace-nowrap px-2 font-medium">
          {icon && <Icon icon={icon} width={16} height={16} />}
          <span className="capitalize text-primary mt-0.5">
            {column.id}
          </span>
        </span>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="ghost" className="rounded-none text-xs font-normal">
              {selectedOperator}
              <ChevronDownIcon className="size-3 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <CommandPopover data={options.map((option) => ({
              label: option,
              onSelect: () => setSelectedOperator(option),
            }))} />
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Button size="sm" variant="ghost" className="rounded-none text-xs font-normal max-w-[150px]">
          <MoreHorizontalIcon />
        </Button>
        <Separator orientation="vertical" />
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-xs font-normal rounded-l-none w-8 h-full"
          onClick={() => onRemove(column.id)}
        >
          <Icon icon="ion:trash-outline" width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}