"use client";

import { RefObject } from "react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { ChevronRightIcon, ChevronsLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/accordion";

import { iconVariant, IconVariant } from "../../types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { getRandomWidth } from "../../utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  indent?: number;
  onOpen?: () => void;
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

const Sidebar = ({ 
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
        "order-1 bg-[#f8f8f7] grow-0 shrink-0 z-111 shadow-[inset_-1px_0px_0px_0px_rgba(0,0,0,0.024)] transition group w-60 relative overflow-hidden [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]",
        isResetting && "transition-all ease-in-out duration-300",
        isDragging && "shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]",
        isMobile || isCollapsed && "w-0",
      )}
    >
      <Button 
        size="icon"
        variant="ghost"
        onClick={collapse} 
        className={cn(
          "size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 z-[110]",
          isMobile && "opacity-100"
        )}
      >
        <ChevronsLeftIcon />
      </Button>
      <div className="flex flex-col h-full relative pointer-events-auto w-full text-[#5f5e5b]">
        {children}
      </div>
      <div className="resize-handle absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0">
        <div 
          onMouseDown={handleMouseDown}
          className={cn(
            "cursor-e-resize h-full w-3 -ml-1.5",
          )}
        />
      </div>
    </aside>
  );
}

function SidebarHeader({ children, className }: Props) {
  return (
    <div className={cn("grow-0 shrink-0 p-1.5 shadow-[0px_1px_0px_rgba(55,53,47,0.09)]", className)}>
      {children}
    </div>
  );
}

function SidebarContent({ children, className }: Props) {
  return (
    <div className={cn("grow-0 shrink-0 p-1.5", className)}>
      {children}
    </div>
  );
}

function SidebarFooter({ children, className }: Props) {
  return (
    <div className={cn("grow-0 shrink-0 p-1.5 shadow-[0px_-1px_0px_rgba(55,53,47,0.09)]", className)}>
      {children}
    </div>
  );
}

function SidebarMenuItem({ children, indent, className }: Props) {
  return (
    <div 
      role="button" 
      style={{ paddingLeft: indent }}
      className={cn(
        "select-none cursor-pointer transition flex items-center font-medium hover:bg-[#00000008] py-1 px-2 min-h-[30px] h-[30px] text-sm w-full rounded-sm gap-2 text-inherit",
        className
      )}
    >
      {children}
    </div>
  );
}

function SidebarSubMenuItem({ children, indent }: Props) {
  return (
    <div 
      role="button" 
      style={{ paddingLeft: indent }}
      className="select-none cursor-pointer transition flex items-center font-medium hover:bg-[#00000008] py-1 px-2 min-h-[30px] h-[30px] text-sm w-full rounded-sm gap-2 text-inherit group/item"
    >
      {children}
    </div>
  );
}

function SidebarIcon({ 
  icon, 
  variant, 
  sub,
  isOpen,
  onClick
}: { 
  icon: string; 
  variant?: IconVariant; 
  sub?: boolean; 
  isOpen?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      <div className={cn(
        "shrink-0 grow-0 rounded-sm size-6 flex items-center justify-center transition-opacity", 
        iconVariant({ background: variant }),
        sub && "group-hover/item:opacity-0 opacity-100 group-hover/item:hidden"
      )}>
        <Icon icon={icon} className={cn(iconVariant({ color: variant }), "size-5")} />
      </div>
      {sub && (
        <div onClick={onClick} className="shrink-0 grow-0 rounded-sm size-6 hidden items-center justify-center transition-opacity group-hover/item:opacity-100 opacity-0 group-hover/item:flex hover:bg-[#37352f0f]">
          <ChevronRightIcon className={cn(iconVariant({ color: "default" }), isOpen ? "rotate-90" : "rotate-0", "size-5 transition duration-300")} />
        </div>
      )}
    </>
  );
}

function SidebarGroup({ children }: Props) {
  return (
    <div className="flex flex-col gap-px w-full">
      {children}
    </div>
  );
}

function SidebarGroupLabel({ children, onOpen }: Props) {
  return (
    <div role="button" onClick={onOpen} className="flex items-center select-none transition h-[30px] px-2 rounded-sm hover:bg-[#00000008] cursor-pointer group/label">
      <span className="text-xs text-[#91918e] group-hover/label:text-[#37352fcc] font-medium transition-colors">
        {children}
      </span>
    </div>
  );
}

function SidebarGroupContent({ children, isOpen }: Props) {
  return (
    <Accordion isOpen={!!isOpen}>
      <div className="flex flex-col gap-px">
        {children}
      </div>
    </Accordion>
  );
}

function SidebarSub({ children }: Props) {
  return (
    <div className="flex flex-col gap-px w-full">
      {children}
    </div>
  );
}
function SidebarSubContent({ children, isOpen }: Props) {
  return (
    <Accordion isOpen={!!isOpen}>
      <div className="flex flex-col gap-px">
        {children}
      </div>
    </Accordion>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-7 rounded-md bg-neutral-200 animate-pulse" />
      <Skeleton className={cn("h-2.5 rounded-2xl bg-neutral-200 animate-pulse", getRandomWidth())} />
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <aside className="order-1 bg-[#f8f8f7] grow-0 shrink-0 z-111 shadow-[inset_-1px_0px_0px_0px_rgba(0,0,0,0.024)] transition group w-60 relative overflow-hidden [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]">
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
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarIcon,
  SidebarMenuItem,
  SidebarSkeleton,
  SidebarSub,
  SidebarSubContent,
  SidebarSubMenuItem
}