"use client";

import { Command } from "cmdk";

interface Props {
  placeholder: string;
  children: React.ReactNode;
}

export const CommandSearch = ({ placeholder, children }: Props) => {
  return (
    <Command className="flex flex-col gap-1 focus:outline-none">
      <Command.Input 
        placeholder={placeholder}
        className="shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] h-7 px-2 py-0.5 rounded-sm bg-[#f2f1ee99] w-full placeholder:text-sm placeholder:text-[#9B9A97] placeholder:font-light text-[#787774] text-sm font-normal focus:shadow-[inset_0_0_0_1px_rgba(37,132,227,0.57),0_0_0_2px_rgba(37,132,227,0.35)] focus-visible:outline-none"
      />
      <Command.List className="relative flex flex-col">
        <Command.Empty className="flex items-center gap-2 leading-[120%] w-full text-xs py-1 px-2 mb-1.5 text-[#787774] mt-0.5">
          No result 
        </Command.Empty>
        {children}
      </Command.List>
    </Command>
  );
}