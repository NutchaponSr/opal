import { Command } from "cmdk";
import { CircleMinusIcon, CirclePlusIcon, MoreHorizontalIcon, XIcon } from "lucide-react";

import { columnFilterOptions, Filter } from "@/types/columns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandSearch } from "@/components/command-search";

import { useToggle } from "usehooks-ts";

const commonInputStyles = "shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] h-7 px-2 py-0.5 rounded-sm bg-[#f2f1ee99] w-full placeholder:text-xs placeholder:text-[#9B9A97] placeholder:font-light text-[#787774] text-sm font-normal focus:shadow-[inset_0_0_0_1px_rgba(37,132,227,0.57),0_0_0_2px_rgba(37,132,227,0.35)] focus-visible:outline-none";

interface Props<T> {
  children?: React.ReactNode;
  filter: Filter<T>;
  onUpdate: (filter: Filter<T>) => void;
  onRemove: () => void;
}

const FilterInput = ({ value, onChange, placeholder, type = "text" }: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => (
  <input
    value={value}
    placeholder={placeholder}
    type={type}
    onChange={onChange}
    className={commonInputStyles}
  />
);

const LayoutFilter = <T,>({ 
  children, 
  filter,
  onUpdate,
  onRemove
}: Props<T>) => {
  const Icon = filter.column.columnDef.meta?.icon ?? (() => null);

  return (
    <div className="flex h-7 items-center rounded-sm border border-border shadow-xs bg-background text-xs w-fit">
      <span className="flex select-none items-center gap-1 whitespace-nowrap px-2 font-medium capitalize">
        <Icon className="size-4 stroke-[1.5]" />              
        {filter.column.id}
      </span>
      <Separator orientation="vertical" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="group">
            {filter.operator}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-auto">
          <CommandSearch placeholder="Search...">
            <Command.Group>
              {columnFilterOptions[filter.columnType].map((option, index) => (
                <Command.Item 
                  key={index}
                  onSelect={() => onUpdate({ ...filter, operator: option })}
                  className="flex items-center gap-2 px-2 py-1 text-sm text-primary rounded-sm h-7 data-[selected=true]:bg-[#37352f0f] cursor-pointer"
                >
                  {option}
                </Command.Item>
              ))}
            </Command.Group>
          </CommandSearch>
        </PopoverContent>
      </Popover>
      <Separator orientation="vertical" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="group">
            {filter.value === "" 
              ? <MoreHorizontalIcon className="size-4" /> 
              : filter.value
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-auto">
          {children}
        </PopoverContent>
      </Popover>
      <Separator orientation="vertical" />
      <Button 
        variant="ghost" 
        size="group" 
        onClick={onRemove}
        className="rounded-r-sm rounded-l-none w-7"
      >
        <XIcon />
      </Button>
    </div>
  );
}

const FilterText = <T,>({ filter, ...props }: Props<T>) => {
  return (
    <LayoutFilter {...props} filter={filter}>
      <FilterInput
        value={filter.value}
        placeholder="Search..."
        onChange={(e) => props.onUpdate({ ...filter, value: e.target.value })}
      />
    </LayoutFilter>
  );
}

const FilterNumeric = <T,>({ filter, onUpdate, onRemove }: Props<T>) => {
  const [isAddition, toggle] = useToggle(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...filter, value: e.target.value });
  };

  const handleButtonClick = () => {
    const currentValue = parseFloat(filter.value) || 0;
    const newValue = isAddition ? Math.abs(currentValue) : -Math.abs(currentValue);
    onUpdate({ ...filter, value: newValue.toString() });
    toggle();
  };

  return (
    <LayoutFilter filter={filter} onUpdate={onUpdate} onRemove={onRemove}>
      <div className="flex flex-row gap-1">
        <Button size="smIcon" variant={isAddition ? "success" : "destructive"} onClick={handleButtonClick}>
          {isAddition ? <CirclePlusIcon /> : <CircleMinusIcon />}
        </Button>
        <FilterInput
          value={filter.value}
          placeholder={`${filter.operator} Type a value...`}
          type="number"
          onChange={handleValueChange}
        />
      </div>
    </LayoutFilter>
  );
}

export {
  FilterText,
  FilterNumeric
}