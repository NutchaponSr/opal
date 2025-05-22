"use client";

import { RefObject } from "react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { ChevronRightIcon, SidebarIcon as LucideSidebar } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Accordion } from "@/components/accordion";

import { iconVariant } from "@/modules/dashboard/types";
import { getRandomWidth } from "@/modules/dashboard/utils";
import { VariantProps } from "class-variance-authority";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface CollapsibleProps extends BaseProps {
  isOpen?: boolean;
  onOpen?: () => void;
}

interface MenuItemProps extends BaseProps {
  indent?: number;
}

interface SidebarProps {
  children: React.ReactNode;
  isDragging: boolean;
  isCollapsed: boolean;
  isResetting: boolean;
  ref: RefObject<HTMLElement | null>;
  collapse: () => void;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Sidebar = ({ 
  children,
  ref,
  isDragging,
  isCollapsed,
  isResetting,
  collapse,
  handleMouseDown
}: SidebarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <aside 
      ref={ref}
      className={cn(
        "order-1 bg-foreground grow-0 shrink-0 z-111 shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)] dark:shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.055)] transition group w-60 relative overflow-hidden [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)] dark:[&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.1)]",
        isResetting && "transition-all ease-in-out duration-300",
        isDragging && "shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]",
        (isMobile || isCollapsed) && "w-0",
      )}
    >
      <Button 
        size="icon"
        variant="ghost"
        onClick={collapse} 
        className={cn(
          "size-6 hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 z-[110]",
          isMobile && "opacity-100"
        )}
      >
        <LucideSidebar />
      </Button>
      <div className="flex flex-col h-full relative pointer-events-auto w-full text-[#5f5e5b] dark:text-[#9b9b9b]">
        {children}
      </div>
      <div className="resize-handle absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0">
        <div 
          onMouseDown={handleMouseDown}
          className="cursor-e-resize h-full w-3 -ml-1.5"
        />
      </div>
    </aside>
  );
};

export const SidebarContent = ({ children, className }: BaseProps) => (
  <div className={cn("grow-0 shrink-0 p-1.5", className)}>
    {children}
  </div>
);

export const SidebarMenuItem = ({ children, indent, className }: MenuItemProps) => (
  <div 
    role="button" 
    style={{ paddingLeft: indent }}
    className={cn("select-none hover:bg-accent cursor-pointer transition flex items-center font-medium py-1 px-2 min-h-7 h-7 text-sm w-full rounded-sm gap-2 text-inherit", className)}
  >
    {children}
  </div>
);

export const SidebarSubMenuItem = ({ children, indent }: MenuItemProps) => (
  <div 
    role="button" 
    style={{ paddingLeft: indent }}
    className="select-none hover:bg-accent cursor-pointer transition flex items-center font-medium py-1 px-2 min-h-7 h-7 text-sm w-full rounded-sm gap-2 text-inherit group/item"
  >
    {children}
  </div>
);

interface SidebarIconProps extends VariantProps<typeof iconVariant> {
  icon: string;
  sub?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

export const SidebarIcon = ({ 
  icon, 
  sub,
  isOpen,
  background,
  size,
  text,
  onClick
}: SidebarIconProps) => (
  <>
    <div className={cn(
      "shrink-0 grow-0 rounded-sm size-5 flex items-center justify-center transition-opacity", 
      sub && "group-hover/item:opacity-0 opacity-100 group-hover/item:hidden",
      iconVariant({ background }),
    )}>
      <Icon 
        icon={icon} 
        className={cn(iconVariant({ text, size }))}
      />
    </div>
    {sub && (
      <div 
        onClick={onClick} 
        className="shrink-0 grow-0 rounded-sm size-5 hidden items-center justify-center transition-opacity group-hover/item:opacity-100 opacity-0 group-hover/item:flex hover:bg-accent"
      >
        <ChevronRightIcon 
          className={cn(
            isOpen ? "rotate-90" : "rotate-0", 
            "size-3.5 transition duration-300 text-icon"
          )} 
        />
      </div>
    )}
  </>
);

export const SidebarGroup = ({ children }: BaseProps) => (
  <div className="flex flex-col gap-px w-full">
    {children}
  </div>
);

export const SidebarGroupLabel = ({ children, onOpen }: CollapsibleProps) => (
  <div 
    role="button" 
    onClick={onOpen} 
    className="flex items-center select-none transition h-6 px-2 rounded-sm hover:bg-accent cursor-pointer group/label"
  >
    <span className="text-xs text-icon group-hover/label:text-[#37352fcc] dark:text-[#9b9b9b] font-medium transition-colors">
      {children}
    </span>
  </div>
);

export const SidebarGroupContent = ({ children, isOpen }: CollapsibleProps) => (
  <Accordion isOpen={!!isOpen}>
    <div className="flex flex-col gap-px">
      {children}
    </div>
  </Accordion>
);

// =================================
// Submenu Components
// =================================

export const SidebarSub = ({ children }: BaseProps) => (
  <div className="flex flex-col gap-px w-full">
    {children}
  </div>
);

export const SidebarSubContent = ({ children, isOpen }: CollapsibleProps) => (
  <Accordion isOpen={!!isOpen}>
    <div className="flex flex-col gap-px">
      {children}
    </div>
  </Accordion>
);

// =================================
// Skeleton Components
// =================================

const SkeletonRow = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="size-7 rounded-md bg-neutral-200 animate-pulse" />
    <Skeleton className={cn("h-2.5 rounded-2xl bg-neutral-200 animate-pulse", getRandomWidth())} />
  </div>
);

export const SidebarSkeleton = () => (
  <aside className="order-1 bg-foreground grow-0 shrink-0 z-111 shadow-[inset_-1px_0px_0px_0px_rgba(0,0,0,0.024)] transition group w-60 relative overflow-hidden [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]">
    <div className="flex flex-col gap-px h-full">
      {/* Header */}
      <div className="grow-0 shrink-0 p-1.5 h-12 flex items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-md bg-neutral-200 animate-pulse" />
          <Skeleton className="h-2.5 w-16 rounded-2xl bg-neutral-200 animate-pulse" />
        </div>
      </div>

      {/* Content (Navigation Items) */}
      <div className="grow-0 shrink-0 p-1.5 flex flex-col gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonRow key={`nav-${index}`} />
        ))}
      </div>

      {/* Workspace */}
      <div className="p-1.5 flex flex-col gap-1 flex-1">
        <div className="h-7 flex items-center">
          <Skeleton className="h-2.5 w-20 rounded-2xl bg-neutral-200 animate-pulse" />
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonRow key={`workspace-${index}`} />
        ))}
      </div>

      {/* Footer */}
      <div className="p-1.5 h-12 flex items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-md bg-neutral-200 animate-pulse" />
          <Skeleton className="h-2.5 w-16 rounded-2xl bg-neutral-200 animate-pulse" />
        </div>
      </div>
    </div>
  </aside>
);