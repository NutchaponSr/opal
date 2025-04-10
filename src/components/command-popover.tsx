"use client";

import { Command } from "cmdk";
import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import { inputVariants } from "@/components/ui/input";

const font = JetBrains_Mono({ subsets: ["latin"] });

interface CommandPopoverProps {
  data: {
    label: string;
    icon?: string;
    onSelect: (id: string) => void;
  }[];
}

export const CommandPopover = ({ data }: CommandPopoverProps) => {
  return (
    <Command className="p-1.5 gap-2 bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md">
      <Command.Input 
        autoFocus
        placeholder="Filter by..." 
        className={cn(inputVariants({ variant: "search", area: "sm" }), font.className)} 
      />
      <Command.List>
        <Command.Empty className={cn(font.className)}>
          <div className="mb-1.5 mt-0.5 flex items-center w-full py-1 px-2">
            <div className="mx-3 min-w-0 flex-auto">
              <div data-slot="command-empty" className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-[#787774] min-h-full">
                No results found.
              </div>
            </div>
          </div>
        </Command.Empty>
        <Command.Group className="flex flex-col gap-px">
          {data.map((column, index) => (
            <Command.Item 
              key={index} 
              onSelect={() => column.onSelect(column.label)}
              className={cn(
                "h-7 rounded-sm flex items-center py-1 px-2 hover:bg-[#ffffff0e] data-[selected=true]:bg-[#ffffff0e] cursor-pointer text-sm",
                font.className,
              )}
            >
              {column.label}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List> 
    </Command>
  );
}