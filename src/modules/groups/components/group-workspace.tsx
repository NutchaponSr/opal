"use client";

import { SidebarIcon, SidebarMenuItem, SidebarSub, SidebarSubContent, SidebarSubMenuItem } from "@/modules/dashboard/components/ui/sidebar";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useToggle } from "usehooks-ts";

export const GroupWorkspace = () => {
  const currentYear = new Date().getFullYear();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [isToggled, toggle] = useToggle(false);
  const [toggledYears, setToggledYears] = useState<Record<string, boolean>>({});
  const [toggledGroups, setToggledGroups] = useState<Record<string, boolean>>({});

  const { data } = useSuspenseQuery(trpc.groups.getMany.queryOptions());
  const createGroup = useMutation(trpc.groups.craete.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.groups.getMany.queryOptions());
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

  const toggleGroup = (groupId: string) => {
    setToggledGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <SidebarSub>
      <SidebarSubMenuItem>
        <SidebarIcon 
          sub 
          icon="solar:library-bold-duotone" 
          variant="pink" 
          onClick={toggle} 
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
                isOpen={toggledYears[year]}
                onClick={() => toggleYear(year)}
                icon="solar:calendar-bold-duotone" 
              />
              {year}
              <button 
                onClick={() => {
                  createGroup.mutate({ year });
                }}
                className="ml-auto hover:bg-[#00000008] shrink-0 grow-0 rounded-sm size-6 flex items-center justify-center cursor-pointer opacity-0 group-hover/item:opacity-100 transition-opacity"
              >
                <PlusIcon className="text-[#91918e] size-5" />
              </button>
            </SidebarSubMenuItem>
            <SidebarSubContent isOpen={toggledYears[year]}>
              {data?.filter((f) => f.year === year)
                .map((item) => (
                  <SidebarSub key={item.id}>
                    <SidebarSubMenuItem indent={24}>
                      <SidebarIcon 
                        sub
                        isOpen={toggledGroups[item.id]}
                        onClick={() => toggleGroup(item.id)}
                        icon="lucide:file"
                      />
                      {item.name}
                    </SidebarSubMenuItem>
                    <SidebarSubContent isOpen={toggledGroups[item.id]}>
                      <SidebarMenuItem indent={32}>
                        <SidebarIcon icon="radix-icons:dot-filled" />
                        Competency
                      </SidebarMenuItem>
                      <SidebarMenuItem indent={32}>
                        <SidebarIcon icon="radix-icons:dot-filled" />
                        Employee
                      </SidebarMenuItem>
                    </SidebarSubContent>
                  </SidebarSub>
                ))
              }
            </SidebarSubContent>
          </SidebarSub>
        ))}
        <SidebarMenuItem indent={16} className="text-xs text-[#91918e]">
          More detail
        </SidebarMenuItem>
      </SidebarSubContent> 
    </SidebarSub>
  );
}  