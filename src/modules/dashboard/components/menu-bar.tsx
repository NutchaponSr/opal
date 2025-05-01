"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "../store/use-sidebar-store";

export const MenuBar = () => {
  const { isCollapsed, resetWidth } = useSidebarStore();

  return (
    <header className="bg-transparent z-100 max-w-screen select-none shadow-[0px_1px_0px_rgba(55,53,47,0.09)]">
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