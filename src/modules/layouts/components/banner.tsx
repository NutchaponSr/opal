import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CircleAlertIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Workspace } from "@/types/workspace";

import { Button } from "@/components/ui/button";

import { iconVariant } from "@/modules/dashboard/types";

interface Props {
  workspace: Workspace;
}

export const Banner = ({ workspace }: Props) => {
  const [show, setShow] = useLocalStorage("show-description", true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <section className="w-full flex flex-col items-center shrink-0 grow-0 sticky left-0 group">
      <div className="w-full pl-24"> 
        <div className="flex py-1 justify-start flex-wrap">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShow((prev) => !prev)}
            className="group-hover:opacity-100 opacity-0 transition-all text-[#b9b9b7] hover:text-[#b9b9b7]"
          >
            <CircleAlertIcon />
            {show ? "Hide" : "Show"} description
          </Button>
        </div>
        <div className="pr-24 mb-2 w-full">
          <div className="flex justify-start gap-1.5">
            <div className="flex items-center justify-center size-9">
              <Icon icon={workspace.icon} className={cn(iconVariant({ text: workspace.text }), "size-9")} />
            </div>
            <div className="text-[32px] leading-[1.2] flex items-center">
              <h1 className="font-bold text-primary w-full whitespace-pre-wrap break-words tracking-wide">
                {workspace.label}
              </h1>
            </div>
          </div>
          {show && (
            <div className="max-w-full overflow-hidden mb-3">
              <div className="w-[780px] whitespace-pre-wrap break-words text-sm px-1.5 py-1">
                <p className="font-semibold text-primary tracking-wide">
                  {workspace.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}