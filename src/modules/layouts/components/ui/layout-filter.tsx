import { Column } from "@tanstack/react-table";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useColumnFilterStore } from "@/stores/use-column-filter";
import { MoreHorizontalIcon } from "lucide-react";
import { CommandPopover } from "@/components/command-popover";
import { useState } from "react";
import { DateRange } from "react-day-picker";


interface FilterValue {
  operator: string;
  value: string;
}

interface DateFilterValue {
  operator: string;
  from: Date | undefined;
  to?: Date | undefined;
}

const LayoutFilter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-start gap-2 self-center w-full">
      <div className="flex h-7 items-center rounded-md shadow-[0_0_0_1px_rgba(15,15,15,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.094)] bg-background text-xs">
        {children}
      </div>
    </div>
  );
}

LayoutFilter.Text = function TextFilter<TData, TValue>({ column }: { column: Column<TData, TValue> }) {
  const { onRemove } = useColumnFilterStore();

  const icon = column.columnDef.meta?.icon;
  const options = column?.columnDef.meta?.options || [];

  const filterValue = (column.getFilterValue() as FilterValue) || {
    operator: options[0] || "",
    value: "",
  };

  if (!column?.id) return null;

  const applyFilter = (newOperator: string, newValue: string) => {
    column.setFilterValue({
      operator: newOperator || options[0] || "",
      value: newValue,
    });
  };

  return (
    <LayoutFilter>
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
              {filterValue.operator || options[0]}  
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <CommandPopover
              data={options.map((option) => ({
                label: option,
                onSelect: () => {
                  applyFilter(option, filterValue.value);
                },
              }))}
            />
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-none text-xs font-normal max-w-[150px]"
            >
              {filterValue.value || <MoreHorizontalIcon className="size-4" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1">
            <Input
              area="sm"
              variant="secondary"
              value={filterValue.value}
              onChange={(e) => applyFilter(filterValue.operator, e.target.value)}
              placeholder="Enter value"
            />
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-xs font-normal rounded-l-none w-8 h-full"
          onClick={() => onRemove(column.id)}
        >
          <Icon icon="ion:trash-outline" width={16} height={16} />
      </Button>
    </LayoutFilter>
  );
};

LayoutFilter.Numeric = function NumericFilter<TData, TValue>({ column }: { column: Column<TData, TValue> }) {
  const { onRemove } = useColumnFilterStore();

  const icon = column.columnDef.meta?.icon;
  const options = column?.columnDef.meta?.options || [];

  const filterValue = (column.getFilterValue() as FilterValue) || {
    operator: options[0] || "",
    value: "",
  };

  if (!column?.id) return null;

  const applyFilter = (newOperator: string, newValue: string) => {
    column.setFilterValue({
      operator: newOperator || options[0] || "",
      value: newValue,
    });
  };

  return (
    <LayoutFilter>
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
              {filterValue.operator || options[0]}  
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <CommandPopover
              data={options.map((option) => ({
                label: option,
                onSelect: () => {
                  applyFilter(option, filterValue.value);
                },
              }))}
            />
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-none text-xs font-normal max-w-[150px]"
            >
              {filterValue.value || <MoreHorizontalIcon className="size-4" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1">
            <Input
              area="sm"
              variant="secondary"
              type="number"
              value={filterValue.value}
              onChange={(e) => applyFilter(filterValue.operator, e.target.value)}
              placeholder="Enter value"
            />
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" />
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-xs font-normal rounded-l-none w-8 h-full"
          onClick={() => onRemove(column.id)}
        >
          <Icon icon="ion:trash-outline" width={16} height={16} />
      </Button>
    </LayoutFilter>
  );
};

LayoutFilter.Date = function DateFilter<TData, TValue>({ column }: { column: Column<TData, TValue> }) {
  const today = new Date();
  const { onRemove } = useColumnFilterStore();

  const icon = column.columnDef.meta?.icon;
  const options = column?.columnDef.meta?.options || [];

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const filterValue = (column.getFilterValue() as DateFilterValue) || {
      operator: options[0] || "is",
      value: today, // Default to single date
      mode: "single",
    };
  
    return 
  });

  return (

  );
}

export default LayoutFilter;