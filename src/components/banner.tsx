"use client";

import { iconVariant } from "@/modules/dashboard/components/ui/sidebar";
import { Workspace } from "@/types/workspace";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Button } from "./ui/button";

interface BannerProps {
  workspace: Workspace;
}

export const Banner = ({ workspace }: BannerProps) => {
  return (
    <section className="w-full flex flex-col items-center shrink-0 grow-0 sticky left-0 group">
      <div className="w-full pl-24 pt-4">
        <div className="flex justify-start flex-wrap py-1">
          <Button size="sm" variant="ghost" className="text-[#626262] dark:hover:text-[#626262] opacity-0 group-hover:opacity-100">
            <Icon icon="solar:info-circle-bold" width={16} height={16} style={{ color: "#626262" }} />
            Hide description
          </Button>
        </div>
        <div className="pr-24 mb-2 w-auto">
          <div className="flex items-start space-x-1">
            <div className="flex items-center justify-center size-9">
              <Icon icon={workspace.icon} width={36} height={36} style={{ color: iconVariant({ variant: workspace.variant }) }} />
            </div>
            <h1 className="max-w-full w-full break-words whitespace-pre-wrap text-primary text-3xl font-bold">
              {workspace.label}
            </h1>
          </div>
          <div className="max-w-full overflow-hidden mb-3">
            <span className="font-semibold max-w-full w-[780px] whitespace-pre-wrap break-words text-primary text-sm py-1">
              {workspace.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}