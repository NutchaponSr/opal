

import { Button } from "@/components/ui/button";
import { ArrowDownUp, FilterIcon } from "lucide-react";

export const Toolbar = () => {
  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0">
      <div className="flex justify-between items-center h-10 shadow-[0_1px_0_rgb(233,233,231)] w-full">
        <div className="flex items-center h-full grow-0" />
        <div className="flex items-center justify-end gap-px">
          <Button
            size="sm"
            variant="ghost"
          >
            <FilterIcon />
            Filter
          </Button>
          <Button
            size="sm"
            variant="ghost"
          >
            <ArrowDownUp />
            Sort
          </Button>
        </div>
      </div>
    </section>
  );
}