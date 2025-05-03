"use client";

import { Columns3Icon, MenuIcon, Table2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "../store/use-sidebar-store";
import { useLayoutStore } from "@/modules/layouts/store/use-layout-store";

export const MenuBar = () => {
  const { isCollapsed, resetWidth } = useSidebarStore();
  const { onChangeLayout } = useLayoutStore();

  return (
    <header className="bg-transparent z-100 max-w-screen select-none shadow-[0px_1px_0px_rgba(55,53,47,0.09)]">
      <div className="w-full max-w-screen h-12 transition duration-700 relative left-0">
        <div className="flex justify-between items-center h-full overflow-hidden px-3">
          {isCollapsed && (
            <Button variant="ghost" size="maxIcon" onClick={resetWidth}>
              <MenuIcon />
            </Button>
          )}
          <div className="flex items-center gap-px">
            <Button variant="ghost" size="sm" onClick={() => onChangeLayout("table")}>
              <Table2Icon />
              Table
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onChangeLayout("kanban")}>
              <Columns3Icon />
              Kanban
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}