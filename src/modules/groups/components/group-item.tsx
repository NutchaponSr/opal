import { Group } from "@prisma/client";
import { useToggle } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";

import { 
  SidebarIcon,
  SidebarMenuItem,
  SidebarSub,
  SidebarSubContent,
  SidebarSubMenuItem 
} from "@/modules/dashboard/components/ui/sidebar";

import { GroupRename } from "@/modules/groups/components/group-rename";
import { GroupActions } from "@/modules/groups/components/group-actions";

interface Props {
  group: Group;
  organizationId: string;
}

export const GroupItem = ({ group, organizationId }: Props) => {
  const [isToggled, toggle] = useToggle(false); 

  const [height, setHeight] = useState(0);
  const [isRename, setIsRename] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRename && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setHeight(rect.bottom);
    }
  }, [isRename]);

  return (
    <SidebarSub>
      <div ref={itemRef} />
      <SidebarSubMenuItem indent={24}>
        <SidebarIcon sub isOpen={isToggled} onClick={toggle} icon={group.icon} size="item" text="gray" />
        {group.name}

        <GroupActions 
          group={group} 
          organizationId={organizationId}
          onRenameAction={() => setTimeout(() => { setIsRename(true) }, 200)}
        />
      </SidebarSubMenuItem>
      <SidebarSubContent isOpen={isToggled}>
        <SidebarMenuItem indent={32}>
          <SidebarIcon icon="radix-icons:dot-filled" text="gray" size="dot" />
          Competency
        </SidebarMenuItem>
        <SidebarMenuItem indent={32}>
          <SidebarIcon icon="radix-icons:dot-filled" text="gray" size="dot" />
          Employee
        </SidebarMenuItem>
      </SidebarSubContent>
      
      <GroupRename 
        group={group}
        height={height} 
        isRename={isRename} 
        organizationId={organizationId}
        onClose={() => setIsRename(false)}
      />
    </SidebarSub>
  );
}