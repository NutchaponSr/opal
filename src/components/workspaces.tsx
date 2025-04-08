"use client";

import { SquareDashedKanbanIcon } from "lucide-react";

import { WorkspaceCard } from "@/components/workspace-card";

import { competency, employee, group } from "@/types/workspace";

export const Workspaces = () => {
  return (
    <div className="min-w-0 col-start-2 select-none">
      <div className="shrink-0 flex justify-between items-center h-12 ml-2">
        <div className="flex items-center text-xs font-medium text-[#7f7f7f] shrink-0 max-w-full gap-2">
          <div className="flex items-center justify-center">
            <SquareDashedKanbanIcon className="size-4" />
          </div>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            Workspace
          </span>
        </div>
      </div>
      <div className="relative min-h-36">
        <div className="grid grid-cols-3 gap-6">
          <WorkspaceCard workspace={group} />
          <WorkspaceCard workspace={competency} />
          <WorkspaceCard workspace={employee} />
        </div>
      </div>
    </div>
  );
}