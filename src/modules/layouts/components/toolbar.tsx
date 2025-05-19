import { motion } from "framer-motion";
import { useToggle } from "usehooks-ts";
import { createPortal } from "react-dom";
import { Column, Table } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import { MoreHorizontalIcon, SearchIcon, ZapIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LayoutSortPopover } from "@/modules/layouts/components/layout-sort-popover";
import { LayoutFilterPopover } from "@/modules/layouts/components/layout-filter-popover";
import { ViewSettingsSidebar } from "@/modules/layouts/components/view-settings-sidebar";

import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";

interface Props<T> {
  columns: Column<T>[];
  table: Table<T>;
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toolbar = <T,>({ ...props }: Props<T>) => {
  const { onBack } = useViewSettingsStore()

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [searchOpen, toggleSearch] = useToggle(false);
  const [sidebarOpen, toggleSidebar, setSidebar] = useToggle(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const containnerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onBack();
    setSidebar(false);
  }, [onBack, setSidebar]);

  useEffect(() => {
    if (sidebarOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect(); 

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      setPosition({
        top: triggerRect.bottom + scrollY + 6,
        left: triggerRect.left + scrollX + triggerRect.width / 2,
      });
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containnerRef.current &&
        !containnerRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [handleClose, sidebarOpen]);

  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0 z-86">
      <div className="flex justify-between items-center h-10 w-full">
        <div className="flex items-center h-full grow-0" />
        
        <div className="flex items-center justify-end gap-px">
          <LayoutFilterPopover {...props} />
          <LayoutSortPopover {...props} />
          <Button size="smIcon" variant="icon">
            <ZapIcon />
          </Button>

          <Button size="smIcon" variant="icon" onClick={toggleSearch}>
            <SearchIcon />
          </Button>
          <motion.div
            animate={{ width: searchOpen ? 148 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn("overflow-hidden flex items-center w-full", searchOpen && "ml-1")}
          >
            <Input 
              reset
              scale="none"
              variant="none"
              placeholder="Type to search..."
              value={props.searchTerm}
              onChange={props.onChange}
            />
          </motion.div>

          <Button 
            ref={triggerRef}
            size="smIcon" 
            variant="icon" 
            onClick={!sidebarOpen ? toggleSidebar : handleClose}
          >
            <MoreHorizontalIcon />
          </Button>
        </div>
      </div>
      
      {sidebarOpen && createPortal(
        <ViewSettingsSidebar 
          ref={containnerRef} 
          onClose={handleClose} 
          position={position}
        />,
        document.body
      )}
    </section>
  );
}