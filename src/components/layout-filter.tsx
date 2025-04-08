import { Command } from "cmdk";
import { FilterIcon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "./ui/popover";
import { Button } from "./ui/button";
import { inputVariants } from "./ui/input";

const font = JetBrains_Mono({ subsets: ["latin"] });

export const LayoutFilter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xs" className="text-[#868686] hover:text-[#868686] dark:hover:bg-[#262626]">
          <FilterIcon className="size-4 text-[#868686]" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={12} className="w-auto p-0">
        <Command className="p-1">
          <Command.Input placeholder="Filter by..." className={cn(inputVariants({ variant: "search", area: "sm" }), font.className)} />
          <Command.List>
            <Command.Empty className={cn(font.className)}>No results found.</Command.Empty>
            <Command.Group>
              <Command.Item>1</Command.Item>
              <Command.Item>2</Command.Item>
              <Command.Item>3</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  );
}