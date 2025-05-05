import { Command } from "cmdk";
import { MoreHorizontalIcon, XIcon } from "lucide-react";

import { columnFilterOptions, Filter } from "@/types/columns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommandSearch } from "@/components/command-search";

import { useLayoutFilterStore } from "../../store/use-layout-filter-store";

interface Props<T> {
  children?: React.ReactNode;
  filter: Filter<T>;
}

const LayoutFilter = <T,>({ children, filter }: Props<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const Icon = filter.column.columnDef.meta?.icon!;

  const { removeFilter } = useLayoutFilterStore();

  return (
    <div className="flex h-7 items-center rounded-sm border border-border shadow-xs bg-background text-xs w-fit">
      <span className="flex select-none items-center gap-1 whitespace-nowrap px-2 font-medium capitalize">
        <Icon className="size-4" />              
        {filter.column.id}
      </span>
      <Separator orientation="vertical" />
      {children}
      <Separator orientation="vertical" />
      <Button 
        variant="ghost" 
        size="group" 
        onClick={() => removeFilter(filter.id)}
        className="rounded-r-sm rounded-l-none w-7"
      >
        <XIcon />
      </Button>
    </div>
  );
}

const FilterText = <T,>({ filter }: Props<T>) => {
  const { updateFilter } = useLayoutFilterStore();

  return (
    <LayoutFilter filter={filter}>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="group">
            {filter.operator}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <CommandSearch placeholder="Search...">
            <Command.Group>
              {columnFilterOptions[filter.columnType].map((option, index) => (
                <Command.Item 
                  key={index}
                  onSelect={() => updateFilter(filter.id, { ...filter, operator: option })}
                  className="flex items-center gap-2 px-2 py-1 text-sm text-primary rounded-sm h-7 data-[selected=true]:bg-[#37352f0f] capitalize cursor-pointer"
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
          <input
            value={filter.value}
            placeholder="Search..."
            onChange={(e) => updateFilter(filter.id, { ...filter, value: e.target.value })}
            className="shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] h-7 px-2 py-0.5 rounded-sm bg-[#f2f1ee99] w-full placeholder:text-xs placeholder:text-[#9B9A97] placeholder:font-light text-[#787774] text-sm font-normal focus:shadow-[inset_0_0_0_1px_rgba(37,132,227,0.57),0_0_0_2px_rgba(37,132,227,0.35)] focus-visible:outline-none" 
          />
        </PopoverContent>
      </Popover>
    </LayoutFilter>
  );
}

const FilterNumeric = <T,>({ filter }: Props<T>) => {
  return (
    <LayoutFilter filter={filter}>
      <Button variant="ghost" size="group">
        {filter.operator}
      </Button>
      <Separator orientation="vertical" />
      <Button variant="ghost" size="group">
        {filter.value === "" 
          ? <MoreHorizontalIcon className="size-4" /> 
          : filter.value
        }
      </Button>
    </LayoutFilter>
  );
}

export {
  FilterText,
  FilterNumeric
}