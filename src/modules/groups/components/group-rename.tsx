import { Icon } from "@iconify/react";
import { Group } from "@prisma/client";
import { RefObject, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LucideFile } from "@/components/assets/icons";
import { EmojiPicker } from "@/components/emoji-picker";

interface Props {
  group: Group;
  height: number;
  isRename: boolean;
  itemRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export const GroupRename = ({
  group,
  height,
  isRename,
  itemRef,
  onClose
}: Props) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustPopoverPosition = () => {
      if (popoverRef.current && itemRef.current) {
        const itemRect = itemRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Check if popover would overflow right edge
        if (popoverRect.left + popoverRect.width > viewportWidth - 20) {
          popoverRef.current.style.left = "auto";
          popoverRef.current.style.right = "5px";
        }
        
        // Check if popover would overflow bottom edge
        if (popoverRect.top + popoverRect.height > viewportHeight - 20) {
          popoverRef.current.style.top = `${itemRect.top - popoverRect.height}px`;
        }
      }
    };

    if (isRename) {
      // Apply position adjustment after render
      setTimeout(adjustPopoverPosition, 0);
      // Also listen for window resize to readjust if needed
      window.addEventListener("resize", adjustPopoverPosition);
    } else {
      window.removeEventListener("resize", adjustPopoverPosition);
    }
    
    return () => {
      window.removeEventListener("resize", adjustPopoverPosition);
    };
  }, [isRename, itemRef, onClose]);

  if (!isRename) return null;

  return (
    <div
      ref={popoverRef}
      style={{ top: `${height + 35}px` }}
      className="fixed left-5 z-200 bg-background shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(84,72,49,0.08)] p-1 rounded-sm w-60"
    >
      <div className="flex flex-row items-center gap-1">
        <EmojiPicker>
          <Button variant="outline" size="smIcon">
            {group.icon === "lucide:file" && <LucideFile className="size-[18px] stroke-[#787774]" />}
          </Button>
        </EmojiPicker>
        <Input 
          value={group.name}
          onChange={() => {}}
          className="h-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] border-none bg-[#f2f1ee99] text-xs"
        />
      </div>
    </div>
  );
}