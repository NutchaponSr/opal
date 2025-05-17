"use client";

import { toast } from "sonner";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Group } from "@prisma/client";
import { useEffect, useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDropdownContext } from "@/providers/dropdown-provider";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  group: Group;
  organizationId: string;
  onRenameAction: () => void;
}

export const GroupActions = ({ 
  group, 
  organizationId,
  onRenameAction 
}: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { open: openId, setOpen } = useDropdownContext();
  
  const [isOpen, setIsOpen] = useState(false);

  const trashGroup = useMutation(trpc.groups.trash.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.groups.getMany.queryOptions({ organizationId }));
    },
  }));
  const duplicateGroup = useMutation(trpc.groups.copy.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.groups.getMany.queryOptions({ organizationId }));
    },
  }));

  const PATH = `${process.env.NEXT_PUBLIC_APP_URL}/${organizationId}/groups/${group.id}`;

  const onCopy = () => {
    navigator.clipboard.writeText(PATH)
      .then(() => toast.success("Copied link into cilpboard"));
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setOpen(group.id);
    } else if (openId === group.id) {
      setOpen(null);
    }
  };

  useEffect(() => {
    if (openId !== null && openId !== group.id && isOpen) {
      setIsOpen(false);
    }
  }, [openId, group.id, isOpen]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button 
          className="ml-auto hover:bg-[#00000008] shrink-0 grow-0 rounded-sm size-5 flex items-center justify-center cursor-pointer opacity-0 group-hover/item:opacity-100 transition-opacity"
        >
          <MoreHorizontalIcon className="text-[#91918e] fill-[#91918e] size-4 stroke-[1.5]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" sideOffset={20} className="w-60">
        <DropdownMenuItem onClick={onCopy}>
          <Icon icon="solar:link-outline"  />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => duplicateGroup.mutate(group)}>
          <Icon icon="hugeicons:copy-01" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRenameAction}>
          <Icon icon="hugeicons:pencil-edit-02"  />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => trashGroup.mutate({ id: group.id })}>
          <Icon icon="hugeicons:delete-02"  />
          Move to Trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.open(PATH)}>
          <Icon icon="solar:arrow-right-up-outline"  />
          Open in new tab
        </DropdownMenuItem>
        {/* TODO: Mode peek */}
        <DropdownMenuItem>
          <Icon icon="hugeicons:sidebar-right" /> 
          Open in side peek
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-1 flex flex-col">
          <p className="text-[#46444073] text-xs">
            Last edited by {group.updatedBy}
          </p>
          <p className="text-[#46444073] text-xs">
            {format(group.updatedAt, "MMM d, yyyy, h:mm a")}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}