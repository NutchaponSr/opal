import { Table } from "@tanstack/react-table";

import { CommandSearch } from "@/components/command-search";

import { 
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";

import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";
import { ColumnSelector } from "./column-selector";
import { useLayoutFilterStore } from "../store/use-layout-filter-store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FilterFields } from "./filter-fields";

interface Props<T> {
  table: Table<T>;
  onClose: () => void;
}

export const FilterContent = <T,>({ table, ...props }: Props<T>) => {
  const { 
    filterGroup,
    addFilter, 
    addFilterGroup 
  } = useLayoutFilterStore();
  const { isOpen, content, onBack } = useViewSettingsStore();

  const columns = table.getAllColumns().filter((col) => col.getCanFilter());

  const hasActiveFilters = filterGroup.filters.some((f) => f.column && f.operator) || filterGroup.groups.length > 0;

  const open = isOpen && content === "filter";
  
  if (!open) return null;

  if (!hasActiveFilters) {
    return (
      <>
        <ViewSettingsHeader onBack={onBack} {...props}>
          Add filter
        </ViewSettingsHeader>
        <ViewSettingsContent>
          <CommandSearch
            placeholder="Filter by..."
            className="py-1 px-2 flex items-center"
          >
            <ColumnSelector 
              data={columns}
              onSelect={addFilter}
            />
          </CommandSearch>
        </ViewSettingsContent>
        <Separator />
        <ViewSettingsContent>
          <Button size="item" variant="item" onClick={addFilterGroup}>
            <PlusIcon />
            Add group
          </Button>
        </ViewSettingsContent>
      </>
    );
  }

  return (
    <>
      <ViewSettingsHeader onBack={onBack} {...props}>
        Filter
      </ViewSettingsHeader>
      <ViewSettingsContent>
        <FilterFields data={columns} />
      </ViewSettingsContent>
    </>
  );
}