import { FilterIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CommandSearch } from "@/components/command-search";

export const LayoutFilter = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="sm"
          variant="ghost"
          className="text-[#9B9A97] hover:text-[#9B9A97]"
        >
          <FilterIcon />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-0"
        align="end"
      >
        <CommandSearch placeholder="Filter by..." />
      </PopoverContent>
    </Popover>
  );
}