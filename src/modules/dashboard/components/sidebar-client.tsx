"use client";

import Link from "next/link";
import Image from "next/image";

import dynamic from "next/dynamic";

import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarIcon, 
  SidebarMenuItem, 
  SidebarSkeleton, 
  SidebarSubMenuItem 
} from "@/modules/dashboard/components/ui/sidebar";
import { UserButton } from "@/modules/auth/components/user-button";
// import { GroupWorkspace } from "@/modules/groups/components/group-workspace";

import { useSidebarStore } from "@/modules/dashboard/store/use-sidebar-store";

const Sidebar = dynamic(
  () => import("@/modules/dashboard/components/ui/sidebar").then(
    (mod) => mod.Sidebar,
  ),
  {
    ssr: false,
    loading: () => <SidebarSkeleton />
  }
);

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
      <SidebarHeader className="min-h-12 max-h-12">
        <Link href="/" className="flex items-center gap-2 h-full hover:bg-[#00000008] p-1.5 rounded-sm">
          <Image src="/logo.svg" alt="Logo" width={26} height={26} />
          <span className="text-lg font-semibold text-primary">Opal</span>
        </Link>
      </SidebarHeader>
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
              {/* <GroupWorkspace /> */}
              <SidebarSubMenuItem>
                <SidebarIcon sub icon="solar:file-text-bold-duotone" variant="mikan" />
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
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}