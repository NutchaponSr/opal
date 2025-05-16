import { useState } from "react";
import { Icon } from "@iconify/react";
import { Group } from "@prisma/client";

import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IconsPicker } from "@/components/icons-picker";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface Props {
  group: Group;
  height: number;
  isRename: boolean;
  organizationId: string;
  onClose: () => void;
}

export const GroupRename = ({
  group,
  height,
  isRename,
  organizationId,
  onClose
}: Props) => {


  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateGroup = useMutation(trpc.groups.rename.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.groups.getMany.queryOptions({ organizationId }))
    },
  }));

  const [icon, setIcon] = useState(group.icon);
  const [name, setName] = useState(group.name);

  const onChangeEmoji = (icon: string) => {
    setIcon(icon);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateGroup.mutate({
      id: group.id,
      icon,
      name,
    });
  }

  const handleClose = () => {
    onClose();

    setIcon(group.icon);
    setName(group.name);
  }

  return (
    <Popover open={isRename} onOpenChange={handleClose}>
      <PopoverContent 
        style={{ top: `${height + 35}px` }}
        className="fixed left-5 z-200 bg-background shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(84,72,49,0.08)] p-1 rounded-sm w-80"
      >
        <form onSubmit={onSubmit} className="flex flex-row items-center gap-1">
          <IconsPicker onChange={onChangeEmoji}>
            <Button variant="outline" size="smIcon">
              <Icon icon={icon} className="size-[18px] text-muted-foreground" />
            </Button>
          </IconsPicker>
          <Input 
            value={name}
            variant="search"
            onChange={(e) => setName(e.target.value)}
          />
          <Button size="sm" variant="primary">
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}