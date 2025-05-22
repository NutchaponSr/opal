import { Column } from "@tanstack/react-table";
import { FunnelPlusIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { columnFilterOptions, Filter, FilterGroup } from "@/types/columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { CommandSearch } from "@/components/command-search";

import { ColumnSelector } from "@/modules/layouts/components/column-selector";
import { LayoutFilterProvider } from "@/modules/layouts/components/layout-filter-provider";

import { useLayoutFilterStore } from "@/modules/layouts/store/use-layout-filter-store";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props<T> {
  data: Column<T>[];
}

const useFilterGroup = <T,>(group: FilterGroup<T>, onUpdate: (updatedGroup: FilterGroup<T>) => void) => {
  const addGroup = () => {
    onUpdate({
      ...group,
      groups: [
        ...group.groups,
        {
          id: Date.now(),
          filters: [],
          groups: [],
          connector: "AND",
        },
      ],
    });
  };

  const updateFilter = (filterId: number, updatedFilter: Filter<T>) => {
    onUpdate({
      ...group,
      filters: group.filters.map((f) => f.id === filterId ? updatedFilter : f),
    });
  };

  const updateGroup = (groupId: number, updatedGroup: FilterGroup<T>) => {
    onUpdate({
      ...group,
      groups: group.groups.map((g) => g.id === groupId ? updatedGroup : g),
    });
  };
  
  const removeFilter = (filterId: number) => {
    onUpdate({
      ...group,
      filters: group.filters.filter((f) => f.id !== filterId),
    });
  };

  const removeGroup = (groupId: number) => {
    onUpdate({
      ...group,
      groups: group.groups.filter((g) => g.id !== groupId),
    });
  };

  return {
    addGroup,
    updateFilter,
    updateGroup,
    removeFilter,
    removeGroup,
  };
};

const FilterGroupContent = <T,>({ 
  group,
  data,
  onUpdate,
}: {
  group: FilterGroup<T>;
  data: Column<T>[];
  onUpdate: (updatedGroup: FilterGroup<T>) => void;
}) => {
  const { updateFilter, removeFilter, updateGroup, removeGroup } = useFilterGroup(group, onUpdate);

  const hasActiveFilters = group.filters.some((f) => f.column && f.operator) || group.groups.length > 0;

  return (
    <>
      {hasActiveFilters && (
        <div className="my-1 flex w-full items-center gap-2">
            <div className="shrink-0 min-w-16 text-center box-border">
              <span className="text-sm text-primary px-1">Where</span>
            </div>
          {group.filters[0] && (
            <LayoutFilterProvider 
            filter={group.filters[0]} 
            onRemove={() => removeFilter(group.filters[0].id)}
            onUpdate={(filter) => updateFilter(group.filters[0].id, filter)}
            />
          )}
        </div>
      )}
      {(group.filters.length > 1 || group.groups.length > 0) && (
        <div className="h-full w-full flex relative gap-2">
          <div className="w-16 relative">
            <div className="absolute border-l border-dashed border-border h-full left-1/2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="xs" variant="primary" className="h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xs rounded px-2">
                  {group.connector}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onUpdate({ ...group, connector: "AND" })}>And</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdate({ ...group, connector: "OR" })}>Or</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-1 w-[calc(100%-64px)]">
            {group.filters
              .slice(1)
              .map((filter, index) => (
                <LayoutFilterProvider 
                  key={index} 
                  filter={filter} 
                  onRemove={() => removeFilter(filter.id)}
                  onUpdate={(f) => updateFilter(filter.id, f)}
                />
              ))
            }
            {group.groups.map((subGroup) => (
              <FilterGroupFields 
                key={subGroup.id}
                group={subGroup}
                data={data}
                onRemove={() => removeGroup(subGroup.id)}
                onUpdate={(updated) => updateGroup(subGroup.id, updated)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const FilterGroupFields = <T,>({ 
  data,
  group,
  onUpdate,
  onRemove
}: { 
  data: Column<T>[];
  group: FilterGroup<T>;
  onUpdate: (updatedGroup: FilterGroup<T>) => void;
  onRemove: (groupId: number) => void;
}) => {
  const { addGroup } = useFilterGroup(group, onUpdate);

  return (
    <div className="bg-[#00000008] rounded-sm w-full px-2 py-1 border border-border flex flex-col gap-1 flex-1">
      <div className="flex items-center gap-8">
        <span className="flex-1 truncate text-xs">
          Any of the following are true...
        </span>
        <div className="flex gap-0.5">
          <Button size="icon" variant="destructive" onClick={() => onRemove(group.id)}>
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      </div>
      <FilterGroupContent 
        group={group}
        data={data}
        onUpdate={onUpdate}
      />
      <div className="flex flex-row items-center gap-0.5 p-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <FunnelPlusIcon />
              Add filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1 w-auto">
            <CommandSearch placeholder="Filter by...">
              <ColumnSelector 
                data={data}
                onSelect={(column, columnType) => onUpdate({
                  ...group,
                  filters: [
                    ...group.filters,
                    {
                      id: Date.now(),
                      column,
                      operator: columnFilterOptions[columnType][0],
                      value: "",
                      columnType,
                    },
                  ],
                })}
              />
            </CommandSearch>
          </PopoverContent>
        </Popover>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit" 
          onClick={addGroup}
        >
          <PlusIcon />
          Add Group
        </Button>
      </div>
    </div>
  );
};

export const FilterFields = <T,>({ data }: Props<T>) => {
  const { 
    filterGroup, 
    addFilter, 
    addFilterGroup, 
    setConnector,
    removeGroup, 
    updateFilter,
    removeFilter,
    updateGroup 
  } = useLayoutFilterStore();

  
  const allFilters = [
    ...filterGroup.filters,
    ...filterGroup.groups,
  ].sort((a, b) => a.id - b.id);
  
  const hasActiveFilters = filterGroup.filters.some((f) => f.column && f.operator) || filterGroup.groups.length > 0;
  
  return (
    <>
      {hasActiveFilters && (
        <ScrollArea className="flex flex-1 flex-col overflow-auto p-1 h-full">
          <div className="my-1 flex w-full items-center gap-2">
            <div className="shrink-0 min-w-16 text-center box-border">
              <span className="text-sm text-primary px-1 font-medium">Where</span>
            </div>

            {allFilters[0] && (
              "column" in allFilters[0] ? (
              <LayoutFilterProvider 
                filter={allFilters[0]} 
                onRemove={() => removeFilter(allFilters[0].id)}
                onUpdate={(filter) => updateFilter(allFilters[0].id, filter)}
              />
            ) : (
              <FilterGroupFields 
                group={allFilters[0]}
                data={data}
                onRemove={removeGroup}
                onUpdate={(updated) => updateGroup(allFilters[0].id, updated)}
              />
            )
            )}
          </div>
        {allFilters.length > 1 && (
          <div className="h-full w-full flex relative gap-2">
            <div className="w-16 min-w-16 relative">
              <div className="absolute border-l border-dashed border-border h-full left-1/2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="xs" variant="primary" className="h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[10px] rounded px-2">
                    {filterGroup.connector}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setConnector("AND")}>And</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setConnector("OR")}>Or</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-1 w-[calc(100%-64px)]">
              {allFilters.slice(1).map((filter) => {
                if ("column" in filter) {
                  return (
                    <LayoutFilterProvider 
                    key={filter.id}
                    filter={filter} 
                    onRemove={() => removeFilter(filter.id)}
                    onUpdate={(filter) => updateFilter(filter.id, filter)}
                    />
                  )
                } else {
                  return (
                    <FilterGroupFields 
                    key={filter.id}
                    group={filter}
                    data={data}
                    onRemove={removeGroup}
                    onUpdate={(updated) => updateGroup(filter.id, updated)}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        </ScrollArea>
      )}
      <div className="flex flex-row items-center p-1 gap-0.5">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <FunnelPlusIcon />
              Add filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1 w-auto">
            <CommandSearch placeholder="Filter by...">
              <ColumnSelector 
                data={data}
                onSelect={addFilter}
              />
            </CommandSearch>
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="sm" className="w-fit" onClick={addFilterGroup}>
          <PlusIcon />
          Add Group
        </Button>
      </div>
    </>
  );
}