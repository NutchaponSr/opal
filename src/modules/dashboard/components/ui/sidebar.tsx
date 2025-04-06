"use client";

import { useToggle } from "react-use";
import { Icon } from "@iconify-icon/react";
import { ChevronRightIcon, HashIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/accordion";

const iconVariant = cva("", {
  variants: {
    variant:{ 
      default: "#91918e",
      pink: "#AD1A72",
      orange: "#D9730D",
      blue: "#2383E2"
    },
    background: {
      default: "bg-[#37352f0f] dark:bg-[#ffffff0e]",
      pink: "bg-[#F4DFEB] dark:bg-[#4e2c3c]",
      orange: "bg-[#FAEBDD] dark:bg-[#5c3b23]",
      blue: "bg-[#DDEBF1] dark:bg-[#5c3b23]",
    }
  },
})

interface SidebarItemProps extends VariantProps<typeof iconVariant> {
  isOpen?: boolean;
  label: string;
  icon?: string;
  emoji?: string | null;
  className?: string;
  action?: React.ReactNode;
  sub?: boolean;
  onToggle?: () => void;
}

interface SidebarSubProps extends SidebarItemProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="order-1 grow-0 shrink-0 relative h-full w-60 overflow-hidden shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)] z-[111] bg-[#f8f8f7] select-none">
      <div className="flex flex-col h-full relative pointer-events-auto w-60">
        {children}
      </div>
    </aside>
  );
}

Sidebar.Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grow-0 shrink-0 flex flex-col p-1.5">
      {children}
    </div>
  );
}

Sidebar.Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grow-0 shrink-0 flex flex-col justify-center items-center max-h-16 min-h-16 p-1.5">
      {children}
    </div>
  );
}

Sidebar.Separator = () => {
  return (
    <div className="shadow-[inset_0_-1px_0_0_rgba(55,53,37,0.09)] shrink-0 h-px w-full" />
  );
}

Sidebar.Group = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="mb-3 w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}

Sidebar.GroupLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div role="button" className="flex items-center rounded-sm hover:bg-[#00000008] px-2 h-[30px] transition group/label">
      <span className="text-xs font-medium transition text-[#91918e] group-hover/label:text-[#37352fcc]">
        {children}
      </span>
      <ChevronRightIcon className="ml-auto size-4 opacity-0 group-hover/label:opacity-100 transition-opacity text-[#91918e]" />
    </div>
  );
}

Sidebar.GroupContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-px">
      {children}
    </div>
  );
}

Sidebar.MenuItem = ({
  sub,
  icon,
  label,
  emoji,
  variant,
  isOpen,
  action,
  background,
  className,
  onToggle
}: SidebarItemProps) => {
  return (
    <div 
      role="menuitem" 
      className={cn(
        "flex items-center w-full font-sm min-h-[30px] h-[30px] py-1 px-2 rounded-sm cursor-pointer gap-2 hover:bg-[#00000008] text-[#5f5e5b]",
        sub && "group/item",
        className,
      )}
    >
      <div className="flex group-hover/item:hidden items-center justify-center shrink-0 grow-0 size-6 relative">
        <div 
          role="button" 
          aria-label={`${label} menu`}
          className={cn(iconVariant({ background }), "relative flex items-center justify-center size-6 rounded-sm")}
        >
          {icon ? (
            <Icon icon={icon} width={20} height={20} style={{ color: iconVariant({ variant }) }} />
          ) : (
            emoji ? (
              <span className="text-lg">{emoji}</span>
            ) : (
              <HashIcon className="size-5 stroke-[1.75] text-[#91918e]" />
            )
          )}
        </div>
      </div>
      <div className="hidden group-hover/item:flex items-center justify-center shrink-0 grow-0 size-6 relative transition-all">
         <div role="button" onClick={onToggle} className="relative flex items-center justify-center size-6 rounded-sm hover:bg-[#37352f0f] transition">
            <ChevronRightIcon className={cn("size-4 transition duration-200 text-[#9b9c99]", isOpen && "rotate-90")} />
        </div>
      </div>
      <div className="flex-1 whitespace-nowrap overflow-hidden text-clip flex items-center">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis font-medium text-sm">
          {label}
        </span>
      </div>
      {action && action}
    </div>
  );
}

Sidebar.Sub = ({
  children,
  ...props
}: SidebarSubProps) => {
  const [isOpen, toggle] = useToggle(false);

   return (
    <div className="flex flex-col gap-px">
      <Sidebar.MenuItem {...props} isOpen={isOpen} onToggle={toggle} />
      <div role="group" className="flex flex-col gap-px">
        <Accordion isOpen={isOpen}>
          {children}
        </Accordion>
      </div>
    </div>
  );
}


export default Sidebar;