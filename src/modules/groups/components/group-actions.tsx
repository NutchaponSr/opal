  "use client";

  import { format } from "date-fns";
  import { Icon } from "@iconify/react";
  import { Group } from "@prisma/client";
  import { MoreHorizontalIcon } from "lucide-react";

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";

  interface Props {
    group: Group;
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  }

  export const GroupActions = ({ group, open, onClose, onOpen }: Props) => {
    return (
      <DropdownMenu open={open} onOpenChange={onClose}>
        <DropdownMenuTrigger asChild>
          <button 
            onClick={onOpen}
            className="ml-auto hover:bg-[#00000008] shrink-0 grow-0 rounded-sm size-6 flex items-center justify-center cursor-pointer opacity-0 group-hover/item:opacity-100 transition-opacity"
          >
            <MoreHorizontalIcon className="text-[#91918e] fill-[#91918e] size-[18px] stroke-[1.5]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" sideOffset={20} className="w-60">
          <DropdownMenuItem>
            <Icon icon="solar:link-outline"  />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon="hugeicons:copy-01"  />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon="hugeicons:pencil-edit-02"  />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Icon icon="hugeicons:delete-02"  />
            Move to Trash
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon icon="solar:arrow-right-up-outline"  />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon="hugeicons:sidebar-right"  />
            Move to Trash
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