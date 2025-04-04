"use client";

import Sidebar from "@/modules/dashboard/components/ui/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Logo } from "@/components/logo";

import { UserButton } from "@/modules/auth/components/user-button";
import { ChevronRightIcon } from "lucide-react";

export const SidebarProvider = () => {
  return (
    <Sidebar>
      <Sidebar.Header>
        <Logo size={36} />
      </Sidebar.Header>
      <Sidebar.Separator />
      <Sidebar.Content>
        <Sidebar.MenuItem icon="solar:magnifer-bold-duotone" label="Search" />
        <Sidebar.MenuItem icon="solar:face-scan-square-bold-duotone" label="Opal AI" />
        <Sidebar.MenuItem icon="solar:home-angle-bold-duotone" label="Home" />
        <Sidebar.MenuItem icon="solar:inbox-line-bold-duotone" label="Inbox" />
        <Sidebar.MenuItem icon="solar:settings-minimalistic-bold-duotone" label="Settings" />
      </Sidebar.Content>
      <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Item icon="solar:library-bold-duotone" label="Group" background="pink" />
              <Sidebar.Item icon="solar:bookmark-square-bold-duotone" label="Competency" background="orange" />
              <Sidebar.Item icon="solar:users-group-rounded-bold-duotone" label="Employee" background="blue" />
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </ScrollArea>
      <Sidebar.Separator />
      <Sidebar.Content>
        <UserButton />
      </Sidebar.Content>
    </Sidebar>
  );
} 