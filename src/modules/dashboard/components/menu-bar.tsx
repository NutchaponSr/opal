"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSidebarStore } from "@/modules/dashboard/store/use-sidebar-store";

export const MenuBar = () => {
  const { isCollapsed, resetWidth } = useSidebarStore();
  return (
    <header className="bg-transparent z-100 max-w-screen select-none">
      <div className="w-full max-w-screen h-12 transition duration-700 relative left-0">
        <div className="flex justify-between items-center h-full overflow-hidden px-3">
          {isCollapsed && (
            <Button variant="ghost" size="maxIcon" onClick={resetWidth}>
              <MenuIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}