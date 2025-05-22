"use client";

import { Command } from "cmdk";

import { cn } from "@/lib/utils";

interface Props {
  placeholder: string;
  className?: string;
  children: React.ReactNode;
}

export const CommandSearch = ({ placeholder, className, children }: Props) => {
  return (
    <Command className="flex flex-col gap-1 focus:outline-none">
      <div className={cn(className)}>
        <Command.Input 
          autoFocus
          placeholder={placeholder}
          className="shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] h-7 px-2 py-0.5 rounded-sm bg-accent w-full placeholder:text-sm placeholder:text-[#9B9A97] text-muted-foreground text-sm font-normal focus:shadow-[inset_0_0_0_1px_rgba(37,132,227,0.57),0_0_0_2px_rgba(37,132,227,0.35)] focus-visible:outline-none"
        />
      </div>
      <Command.List className="relative flex flex-col">
        <Command.Empty className="flex items-center gap-2 leading-[120%] w-full text-xs py-1 px-2 mb-1.5 text-muted-foreground mt-0.5">
          No result 
        </Command.Empty>
        {children}
      </Command.List>
    </Command>
  );
}