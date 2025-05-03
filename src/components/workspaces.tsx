"use client";

import Link from "next/link";

import { Icon } from "@iconify/react";
import { SquareDashedKanbanIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { competency, employee, group, Workspace } from "@/types/workspace";

import { iconVariant } from "@/modules/dashboard/types";

interface Props {
  organizationId: string;
}

export const Workspaces = ({ ...props }: Props) => {
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
          <WorkspaceCard workspace={group} {...props} />
          <WorkspaceCard workspace={competency} {...props} />
          <WorkspaceCard workspace={employee} {...props} />
        </div>
      </div>
    </div>
  );
}

const WorkspaceCard = ({ 
  workspace,
  organizationId
}: { 
  workspace: Workspace;
  organizationId: string; 
}) => {
  return (
    <div className="relative group">
      <Link href={`/${organizationId}/${workspace.href}`}
        className="flex flex-col transition cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-[#ffffff0d] relative h-40 justify-stretch"
      >
        <div className="relative mb-4">
          <div className={cn("h-11", workspace.className)} />
          <div className="flex items-center justify-center rounded-e-sm absolute -bottom-3.5 left-4">
            <Icon icon={workspace.icon} className={cn(iconVariant({ color: workspace.color }), "size-8")} />
          </div>
        </div>
        <div className="w-full min-h-20 py-2.5 px-4 relative flex flex-col justify-start gap-2 grow">
          <h2 className="whitespace-pre-wrap overflow-hidden text-ellipsis font-semibold text-sm text-primary w-auto">
            {workspace.label}
          </h2>
          <p className="text-xs text-[#787774] dark:text-[#7f7f7f] line-clamp-2">
            {workspace.description}
          </p>
        </div>
      </Link>
      <div className="absolute rounded-2xl inset-0 shadow-[0_12px_32px_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.086)] dark:shadow-[unset] dark:group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />
    </div>
  );
}