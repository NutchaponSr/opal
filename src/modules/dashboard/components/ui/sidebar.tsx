import { Icon } from "@iconify-icon/react";
import { ChevronRightIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariant = cva("", {
  variants: {
    variant:{ 
      default: "fill-[#91918e]",
      pink: "fill-[#b24b78]",
      orange: "fill-[#c37a38]",
      blue: "fill-[#2383E2]"
    },
    size: {
      lg: "size-8",
      sm: "size-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  }
})

const sidebarItemVariant = cva(
  "flex items-center w-full font-sm min-h-[30px] h-[30px] py-1 px-2 rounded-sm cursor-pointer gap-2 hover:bg-[#00000008] text-[#5f5e5b]", {
    variants: {
      variant: {
        default: "bg-[#37352f0f] dark:bg-[#ffffff0e]",
        pink: "bg-[#e188b345] dark:bg-[#4e2c3c]",
        orange: "bg-[#e07c3945] dark:bg-[#5c3b23]",
      }
    }
  },
);

interface SidebarItemProps extends VariantProps<typeof sidebarItemVariant> {
  label: string;
  icon: string;
  background: Exclude<VariantProps<typeof iconVariant>["variant"], null | undefined>;
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="order-1 grow-0 shrink-0 relative h-full w-60 overflow-hidden shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)] z-[111] bg-[#f8f8f7]">
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
    <div role="tree" className="flex flex-col gap-px">
      {children}
    </div>
  );
}

Sidebar.Item = ({
  icon,
  label,
  variant,
  background
}: SidebarItemProps) => {
  return (
    <div role="treeitem" className="flex items-center w-full font-sm min-h-[30px] h-[30px] py-1 px-2 rounded-sm cursor-pointer gap-2 hover:bg-[#00000008] text-[#5f5e5b]">
      <div className="flex items-center justify-center shrink-0 grow-0 size-6 relative">
        <div role="button" className={cn("relative flex items-center justify-center size-6 rounded", iconVariant({ variant }))}>
          <Icon icon={icon} width={20} height={20} style={{ color: "#ad1a72" }} />
        </div>
      </div>
      <div className="flex-1 whitespace-nowrap overflow-hidden text-clip flex items-center">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis font-medium text-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

Sidebar.MenuItem = ({
  icon,
  label
}: {
  icon: string;
  label: string;  
}) => {
  return (
    <div role="menuitem" className="flex items-center w-full font-sm min-h-[30px] h-[30px] py-1 px-2 rounded-sm cursor-pointer gap-2 hover:bg-[#00000008] text-[#5f5e5b]">
      <div className="flex items-center justify-center shrink-0 grow-0 size-6 relative">
        <div role="button" className="relative flex items-center justify-center size-6 rounded">
          <Icon icon={icon} width={20} height={20} style={{ color: "#91918e" }} />
        </div>
      </div>
      <div className="flex-1 whitespace-nowrap overflow-hidden text-clip flex items-center">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis font-medium text-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

export default Sidebar;