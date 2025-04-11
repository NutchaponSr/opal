import { Column } from "@tanstack/react-table";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { MoreHorizontalIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

import { CommandPopover } from "@/components/command-popover";
import { useColumnFilterStore } from "@/stores/use-column-filter";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { ColumnType } from "@/types/column";

interface FilterConditionRowProps<TData, TValue> {
  column: Column<TData, TValue>;
}

interface FilterValue {
  operator: string;
  value: string | { from: Date; to: Date };
  mode?: string;
}

export const FilterConditionRow = <TData, TValue>({
  column
}: FilterConditionRowProps<TData, TValue>) => {
  const today = new Date()
  const { onRemove } = useColumnFilterStore();

  const icon = column?.columnDef.meta?.icon;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = column?.columnDef.meta?.options || [];
  const variant = column?.columnDef.meta?.variant as ColumnType;
  
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const filterValue = (column.getFilterValue() as FilterValue) || {
      operator: options[0] || "",
      value: variant === "date" ? "" : "",
      mode: variant === "date" ? "single" : undefined,
    };
    if (variant === "date" && filterValue.value && typeof filterValue.value !== "string") {
      return filterValue.value as DateRange;
    }
    return { from: today, to: addDays(today, 3) };
  });

  const filterValue = (column.getFilterValue() as FilterValue) || {
    operator: options[0] || "",
    value: variant === "date" ? "" : "",
    mode: variant === "date" ? "single" : undefined,
  };

  const applyFilter = useCallback((
    newOperator: string,
    newValue: string | { from: Date; to: Date },
    newMode?: "single" | "range"
  ) => {
    column.setFilterValue({
      operator: newOperator || options[0] || "",
      value: newValue,
      mode: newMode || (newOperator === "is between" ? "range" : "single"),
    });
  }, [column, options]);

  
  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (filterValue.operator === "is between" && range?.from && range?.to) {
      applyFilter("is between", { from: range.from, to: range.to }, "range");
    } else if (range?.from) {
      applyFilter(filterValue.operator, range.from.toISOString(), "single");
    }
  };
  
  const calendarMode = filterValue.operator === "is between" ? "range" : "single";
  
  const displayValue =
  variant === "date" && typeof filterValue.value !== "string"
      ? filterValue.value?.from && filterValue.value?.to
        ? `${format(filterValue.value.from, "MMM d, yyyy")} - ${format(filterValue.value.to, "MMM d, yyyy")}`
        : filterValue.value?.from
        ? format(filterValue.value.from, "MMM d, yyyy")
        : ""
        : filterValue.value;
        
  useEffect(() => {
    if (variant === "date" && !column.getFilterValue()) {
      if (filterValue.operator === "is between" && date?.from && date?.to) {
        applyFilter("is between", { from: date.from, to: date.to }, "range");
      } else if (date?.from) {
        applyFilter(filterValue.operator || options[0] || "is", date.from.toISOString(), "single");
      }
    }
  }, [variant, column, filterValue.operator, date, options, applyFilter]);

  if (!column?.id) return null;

  return (
    <div className="flex items-center justify-start gap-2 self-center w-full">
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
              {filterValue.operator || options[0]}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <CommandPopover data={options.map((option) => ({
              label: option,
              onSelect: () => applyFilter(option, filterValue.value),
            }))} />
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
              {displayValue as string ||  <MoreHorizontalIcon className="size-4" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1">
            {column.columnDef.meta?.variant === "date" ? (
              calendarMode === "range" ? (
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleDateSelect}
                  classNames={{
                    caption: "flex justify-start pt-1 relative items-center w-full",
                    nav_button_previous: "absolute right-10",
                    nav_button_next: "absolute right-1",
                  }}
                />
              ) : (
                <Calendar
                  mode="single"
                  selected={date?.from}
                  onSelect={(date) => handleDateSelect({ from: date, to: date })}
                  classNames={{
                    caption: "flex justify-start pt-1 relative items-center w-full",
                    nav_button_previous: "absolute right-10",
                    nav_button_next: "absolute right-1",
                  }}
                />
              )
            ) : (
              <Input
                area="sm"
                variant="secondary"
                value={typeof filterValue.value === "string" ? filterValue.value : ""}
                onChange={(e) => applyFilter(filterValue.operator, e.target.value)}
                placeholder="Enter value"
              />
            )}
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
      </div>
    </div>
  );
}