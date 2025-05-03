"use client";

import { Command } from "cmdk"

interface Props {
  placeholder: string;
  data: {
    
  }[];
}

export const CommandSearch = ({ placeholder }: Props) => {
  return (
    <Command>
      <div className="p-2 h-9">
        <Command.Input 
          placeholder={placeholder}
          className="shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] h-7 px-2 py-0.5 rounded-sm bg-[#f2f1ee99] w-full placeholder:text-sm placeholder:text-[#9B9A97] placeholder:font-light text-[#787774] text-sm font-normal"
        />
      </div>
      <Command.List className="p-2 relative flex flex-col">
        <Command.Empty className="flex items-center gap-2 leading-[120%] w-full text-xs py-1 mb-1.5 text-[#787774] mt-0.5">
          No result 
        </Command.Empty>
        <Command.Group>

        </Command.Group>
      </Command.List>
    </Command>
  );
}