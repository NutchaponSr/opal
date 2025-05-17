"use client";

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
import { GroupWorkspace } from "@/modules/groups/components/group-workspace";

import { useSidebarStore } from "@/modules/dashboard/store/use-sidebar-store";
import { OrganizationSwitcher } from "@/modules/organization/ui/components/organization-switcher";

interface Props {
  organizationId: string;
}

export const SidebarClient = ({ organizationId }: Props) => {
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
        <OrganizationSwitcher organizationId={organizationId} />
      </SidebarContent>
      <SidebarContent>
        <SidebarMenuItem>
          <SidebarIcon text="gray" icon="solar:magnifer-bold-duotone" />
          Search
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarIcon text="gray" icon="solar:home-angle-bold-duotone" />
          Home
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarIcon text="gray" icon="solar:inbox-line-bold-duotone" />
          Inbox
        </SidebarMenuItem>
      </SidebarContent>
      <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
        <SidebarContent className="gap-3 flex flex-col">
          <SidebarGroup>
            <SidebarGroupLabel onOpen={() => setOpen(prev => ({ ...prev, workspace: !prev.workspace }))}>Workspace</SidebarGroupLabel>
            <SidebarGroupContent isOpen={open.workspace}>
              <GroupWorkspace organizationId={organizationId} />
              <SidebarSubMenuItem>
                <SidebarIcon sub icon="solar:file-text-bold" background="orange" size="workspace" />
                Competency
              </SidebarSubMenuItem>
              <SidebarSubMenuItem>
                <SidebarIcon sub icon="solar:users-group-rounded-bold" background="primary" size="workspace" />
                Employee
              </SidebarSubMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}