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

import { GroupActions } from "@/modules/groups/components/group-actions";
import { GroupRename } from "./group-rename";

interface Props {
  group: Group;
}

export const GroupItem = ({ group }: Props) => {
  const [isToggled, toggle] = useToggle(false); 

  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
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
        <SidebarIcon sub isOpen={isToggled} onClick={toggle} icon="lucide:file" />
        {group.name}

        <GroupActions 
          group={group} 
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          onRename={() => setIsRename(true)}
        />
      </SidebarSubMenuItem>
      <SidebarSubContent isOpen={isToggled}>
        <SidebarMenuItem indent={32}>
          <SidebarIcon icon="radix-icons:dot-filled" />
          Competency
        </SidebarMenuItem>
        <SidebarMenuItem indent={32}>
          <SidebarIcon icon="radix-icons:dot-filled" />
          Employee
        </SidebarMenuItem>
      </SidebarSubContent>
      
      <GroupRename 
        group={group}
        height={height} 
        isRename={isRename} 
        itemRef={itemRef}
        onClose={() => setIsRename(false)}
      />
    </SidebarSub>
  );
}