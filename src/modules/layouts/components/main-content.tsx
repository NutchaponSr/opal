import { 
  ArrowDownIcon, 
  ArrowUpDownIcon, 
  FilterIcon, 
  GalleryVerticalIcon, 
  LinkIcon, 
  ListIcon, 
  LockKeyholeIcon, 
  Trash2Icon, 
  ZapIcon 
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import { layouts } from "@/constants/layouts";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { 
  OptionButton,
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";

import { LayoutType } from "@/modules/layouts/types";

import { useLayoutStore } from "@/modules/layouts/store/use-layout-store";
import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";
import { useLayoutFilterStore } from "../store/use-layout-filter-store";

interface Props<T> {
  table: Table<T>;
  onClose: () => void;
}

export const MainContent = <T,>({ table, ...props }: Props<T>) => {
  const { layout } = useLayoutStore();
  const { filterGroup } = useLayoutFilterStore();
  const { content, onOpen } = useViewSettingsStore();

  

  const open = content === null;

  const currentLayout = layouts.find((f) => f.slug === layout as LayoutType) || layouts[0];
  
  const countColumns = table.getAllColumns().filter(
    (column) => column.getIsVisible() && column.id !== "actions"
  ).length;
  const countFilters = filterGroup.filters.length + filterGroup.groups.length;
  const countSorts = table.getState().sorting.length;

  if (!open) return null;

  return (
    <>
      <ViewSettingsHeader {...props}>
        View options
      </ViewSettingsHeader>
      <ViewSettingsContent>
        <OptionButton 
          icon={currentLayout.icon}
          label="Layout"
          description={currentLayout.label}
          onClick={() => onOpen("layouts")}
        />
      </ViewSettingsContent>

      <Separator />
      <ViewSettingsContent>
        <OptionButton 
          icon={ListIcon}
          label="Properties"
          description={`${countColumns} shown`}
          onClick={() => onOpen("properties")}
        />
        <OptionButton 
          icon={FilterIcon}
          label="Filter"
          description={`${countFilters}`}
          onClick={() => onOpen("filter")}
        />
        <OptionButton 
          icon={ArrowUpDownIcon}
          label="Sort"
          description={`${countSorts}`}
          onClick={() => onOpen("sort")}
        />
        <OptionButton 
          icon={GalleryVerticalIcon}
          label="Grouping"
          onClick={() => {}}
        />
        <OptionButton 
          icon={ZapIcon}
          label="Automations"
          onClick={() => {}}
        />
        <OptionButton 
          icon={ArrowDownIcon}
          label="Load limit"
          description="10"
          onClick={() => {}}
        />
      </ViewSettingsContent>

      <Separator />
      <ViewSettingsContent>
        <Button size="item" variant="item2" onClick={() => {}}>
          <LockKeyholeIcon />
          Lock database
        </Button>
        <Button size="item" variant="item2" onClick={() => {}}>
          <LinkIcon />
          Copy link
        </Button>
        <Button size="item" variant="item2" onClick={() => {}}>
          <Trash2Icon />
          Delete database
        </Button>
      </ViewSettingsContent>
    </>
  );
}