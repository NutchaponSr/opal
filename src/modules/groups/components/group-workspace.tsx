"use client";

import { 
  useMutation, 
  useQueryClient, 
  useSuspenseQuery 
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useToggle } from "usehooks-ts";

import { useTRPC } from "@/trpc/client";

import { 
  SidebarIcon, 
  SidebarMenuItem, 
  SidebarSub, 
  SidebarSubContent, 
  SidebarSubMenuItem 
} from "@/modules/dashboard/components/ui/sidebar";

import { GroupItem } from "@/modules/groups/components/group-item";

interface Props {
  organizationId: string;
}

export const GroupWorkspace = ({ organizationId }: Props) => {
  const currentYear = new Date().getFullYear();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [isToggled, toggle] = useToggle(false);
  const [toggledYears, setToggledYears] = useState<Record<string, boolean>>({});

  const { data } = useSuspenseQuery(trpc.groups.getMany.queryOptions({ organizationId }));
  const createGroup = useMutation(trpc.groups.craete.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.groups.getMany.queryOptions({ organizationId }));
      toast.success("Group created");
    }
  }));

  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  const toggleYear = (year: string) => {
    setToggledYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  return (
    <SidebarSub>
      <SidebarSubMenuItem>
        <SidebarIcon 
          sub 
          icon="solar:library-bold-duotone" 
          onClick={toggle} 
          background="pink"
          size="workspace"
          isOpen={isToggled}
        />
        Group
      </SidebarSubMenuItem>
      <SidebarSubContent isOpen={isToggled}>
        {years.map((year) => (
          <SidebarSub key={year}>
            <SidebarSubMenuItem indent={16}>
              <SidebarIcon 
                sub
                size="dot"
                text="gray"
                isOpen={toggledYears[year]}
                onClick={() => toggleYear(year)}
                icon="radix-icons:dot-filled" 
              />
              {year}

              <button 
                onClick={() => {
                  createGroup.mutate({ year, organizationId });
                }}
                className="ml-auto hover:bg-accent shrink-0 grow-0 rounded-sm size-5 flex items-center justify-center cursor-pointer opacity-0 group-hover/item:opacity-100 transition-opacity"
              >
                <PlusIcon className="text-[#91918e] size-4" />
              </button>
            </SidebarSubMenuItem>
            <SidebarSubContent isOpen={toggledYears[year]}>
              {data?.filter((f) => f.year === year)
                .map((group) => (
                  <GroupItem 
                    key={group.id} 
                    group={group}
                    organizationId={organizationId} 
                  />
                ))
              }
            </SidebarSubContent>
          </SidebarSub>
        ))}
        <SidebarMenuItem indent={16} className="text-xs text-icon">
          More detail
        </SidebarMenuItem>
      </SidebarSubContent> 
    </SidebarSub>
  );
}  