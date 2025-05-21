"use client";

import { useState, useEffect } from "react";
import { Table } from "@tanstack/react-table";

import { PopoverContent } from "@/components/ui/popover";

import { MainContent } from "@/modules/layouts/components/main-content";
import { LayoutContent } from "@/modules/layouts/components/layout-content";
import { PropertiesContent } from "@/modules/layouts/components/properties-content";

interface Props<T> {
  position: {
    top: number;
    left: number;
  };
  table: Table<T>;
  onClose: () => void;
}

export const ViewSettingsSidebar = <T,>({ position, ...props }: Props<T>) => {
  const [height, setHeight] = useState(0);

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
      className="border-l p-0 rounded-none shadow-none dark:shadow-none w-[calc(290px+96px)] bg-background"
    >
      <div className="flex h-full">
        <div className="flex flex-col shadow-[inset_0_1px_0_rgb(233,233,231)] dark:shadow-[inset_0_1px_0_rgb(47,47,47)] max-w-[290px] min-w-[290px] h-full overflow-y-auto text-primary">
          <MainContent {...props} />
          <LayoutContent {...props} />
          <PropertiesContent {...props} />
        </div>
        <div className="w-24" />  
      </div>
    </PopoverContent>
  );
}