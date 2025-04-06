"use client";

import Sidebar from "@/modules/dashboard/components/ui/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Logo } from "@/components/logo";

import { UserButton } from "@/components/user-button";
import { GroupWorkspace } from "@/modules/groups/components/group-workspace";

export const SidebarProvider = () => {

  return (
    <Sidebar>
      <Sidebar.Header>
        <Logo size={36} />
      </Sidebar.Header>
      <Sidebar.Separator />
      <Sidebar.Content>
        <Sidebar.MenuItem icon="solar:magnifer-bold-duotone" label="Search" variant="default" />
        <Sidebar.MenuItem icon="solar:face-scan-square-bold-duotone" label="Opal AI" variant="default" />
        <Sidebar.MenuItem icon="solar:home-angle-bold-duotone" label="Home" variant="default" />
        <Sidebar.MenuItem icon="solar:inbox-line-bold-duotone" label="Inbox" variant="default" />
        <Sidebar.MenuItem icon="solar:settings-minimalistic-bold-duotone" label="Settings" variant="default" />
      </Sidebar.Content>
      <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Sub 
                sub
                label="Group" 
                variant="pink"
                background="pink" 
                icon="solar:library-bold-duotone"
              >
                <GroupWorkspace />
              </Sidebar.Sub>
              <Sidebar.Sub 
                sub
                label="Competency" 
                variant="orange"
                background="orange" 
                icon="solar:bookmark-square-bold-duotone"
              >
                Content
              </Sidebar.Sub>
              <Sidebar.Sub 
                sub
                label="Employee" 
                variant="blue"
                background="blue" 
                icon="solar:users-group-rounded-bold-duotone"
              >
                Content
              </Sidebar.Sub>
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