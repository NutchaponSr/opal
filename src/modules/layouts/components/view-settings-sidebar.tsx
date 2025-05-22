"use client";

import { useState, useEffect } from "react";
import { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { PopoverContent } from "@/components/ui/popover";

import { MainContent } from "@/modules/layouts/components/main-content";
import { FilterContent } from "@/modules/layouts/components/filter-content";
import { LayoutContent } from "@/modules/layouts/components/layout-content";
import { PropertiesContent } from "@/modules/layouts/components/properties-content";
import { useLayoutFilterStore } from "../store/use-layout-filter-store";
import { useViewSettingsStore } from "../store/use-view-settings-store";
import { SortContent } from "./sort-content";

interface Props<T> {
  position: {
    top: number;
    left: number;
  };
  table: Table<T>;
  onClose: () => void;
}

export const ViewSettingsSidebar = <T,>({ position, ...props }: Props<T>) => {
  const { filterGroup } = useLayoutFilterStore();
  const { content } = useViewSettingsStore();

  const [height, setHeight] = useState(0);

  const hasActiveFilters = 
    content === "filter" && 
    (
      filterGroup.filters.some((f) => f.column && f.operator) || 
      filterGroup.groups.length > 0
    );

  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const topPosition = position.top;
      const maxHeight = windowHeight - topPosition; 
      setHeight(maxHeight);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [position.top]);

  return (
    <PopoverContent
      align="end"
      side="bottom"
      sideOffset={6}
      alignOffset={-96}
      style={{ height: `${Math.max(height-1, 300)}px`}}
      className={cn(
        "border-l p-0 rounded-none shadow-none dark:shadow-none w-[calc(290px+96px)] bg-background",
        hasActiveFilters && "w-auto"
      )}
    >
      <div className="flex h-full">
        <div className={cn(
          "flex flex-col shadow-[inset_0_1px_0_rgb(233,233,231)] dark:shadow-[inset_0_1px_0_rgb(47,47,47)] w-[290px] h-full overflow-y-auto text-primary",
          hasActiveFilters && "w-auto"
        )}>
          <MainContent {...props} />
          <LayoutContent {...props} />
          <PropertiesContent {...props} />
          <FilterContent {...props} />
          <SortContent {...props}/>
        </div>
        <div className="w-24" />  
      </div>
    </PopoverContent>
  );
}