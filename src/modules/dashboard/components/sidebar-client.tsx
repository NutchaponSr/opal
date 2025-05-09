"use client";

import Link from "next/link";
import Image from "next/image";

import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Sidebar,
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarIcon, 
  SidebarMenuItem, 
  SidebarSubMenuItem 
} from "@/modules/dashboard/components/ui/sidebar";
import { UserButton } from "@/modules/auth/components/user-button";
import { GroupWorkspace } from "@/modules/groups/components/group-workspace";

import { useSidebarStore } from "@/modules/dashboard/store/use-sidebar-store";
import { Button } from "@/components/ui/button";

export const SidebarClient = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { resetWidth, collapse } = useSidebarStore();

  const [open, setOpen] = useState<Record<string, boolean>>({
    workspace: true,
  });

  const sidebar = useSidebarStore();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth, collapse]);
  
  return (  
    <Sidebar {...sidebar}>
      <SidebarContent>
        {/* TODO: Organization switcher */}
        <Button variant="item" className="w-full hover:bg-[#00000008]">
          Organization
        </Button>
      </SidebarContent>
      <SidebarContent>
        <SidebarMenuItem>
          <SidebarIcon icon="solar:magnifer-bold-duotone" />
          Search
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarIcon icon="solar:face-scan-square-bold-duotone" />
          Opal AI
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarIcon icon="solar:home-angle-bold-duotone" />
          Home
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarIcon icon="solar:inbox-line-bold-duotone" />
          Inbox
        </SidebarMenuItem>
      </SidebarContent>
      <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
        <SidebarContent className="gap-3 flex flex-col">
          <SidebarGroup>
            <SidebarGroupLabel onOpen={() => setOpen(prev => ({ ...prev, workspace: !prev.workspace }))}>Workspace</SidebarGroupLabel>
            <SidebarGroupContent isOpen={open.workspace}>
              <GroupWorkspace />
              <SidebarSubMenuItem>
                <SidebarIcon sub icon="solar:file-text-bold-duotone" variant="orange" />
                Competency
              </SidebarSubMenuItem>
              <SidebarSubMenuItem>
                <SidebarIcon sub icon="solar:users-group-rounded-bold-duotone" variant="primary" />
                Employee
              </SidebarSubMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
      <SidebarContent>
        <UserButton />
      </SidebarContent>
    </Sidebar>
  );
}