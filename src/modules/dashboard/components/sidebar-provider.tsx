"use client";

import Sidebar from "@/modules/dashboard/components/ui/sidebar";

import React from "react";
import { ComponentRef, useCallback, useEffect, useRef, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Logo } from "@/components/logo";
import { UserButton } from "@/components/user-button";

import { GroupWorkspace } from "@/modules/groups/components/group-workspace";
import { useMedia } from "react-use";
import { usePathname } from "next/navigation";

export const SidebarProvider = () => {
  const pathname = usePathname();

  const isMobile = useMedia("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      //   navbarRef.current.style.setProperty("left", `${newWidth}px`);
      //   navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
      // }
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  
  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      // navbarRef.current.style.setProperty(
        //   "width",
        //   isMobile ? "0" : "calc(100% - 240px)"
        // );
        
        // navbarRef.current.style.setProperty(
          //   "left",
          //   isMobile ? "100%" : "240px"
          // );
          
          setTimeout(() => setIsResetting(false), 300);
        }
      }
      
      const collapse = () => {
        console.log("Clicked");
        
    if (sidebarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      
      sidebarRef.current.style.width = "0";
      // navbarRef.current.style.setProperty("width", "100%");
      // navbarRef.current.style.setProperty("left", "0");
      
      setTimeout(() => setIsResetting(false), 300);
    }
  }
  
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } 
  }, [pathname, isMobile]);

  return (
    <Sidebar 
      ref={sidebarRef} 
      isMobile={isMobile} 
      collapse={collapse}
      isResetting={isResetting}
      handleMouseDown={handleMouseDown}
    >
      <Sidebar.Header>
        <Logo size={36} />
      </Sidebar.Header>
      <Sidebar.Separator />
      <Sidebar.Content>
        <Sidebar.MenuItem icon="solar:magnifer-bold-duotone" label="Search" variant="default" />
        <Sidebar.MenuItem icon="solar:face-scan-square-bold-duotone" label="Opal AI" variant="default" />
        <Sidebar.MenuItem icon="solar:home-angle-bold-duotone" label="Home" variant="default" />
        <Sidebar.MenuItem icon="solar:inbox-line-bold-duotone" label="Inbox" variant="default" />
        <Sidebar.MenuItem icon="solar:settings-minimalistic-bold-duotone" label="Settings" variant="default" />
      </Sidebar.Content>
      <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Sub 
                sub
                label="Group" 
                variant="pink"
                background="pink" 
                icon="solar:library-bold-duotone"
              >
                <GroupWorkspace />
              </Sidebar.Sub>
              <Sidebar.Sub 
                sub
                label="Competency" 
                variant="orange"
                background="orange" 
                icon="solar:bookmark-square-bold-duotone"
              >
                Content
              </Sidebar.Sub>
              <Sidebar.Sub 
                sub
                label="Employee" 
                variant="blue"
                background="blue" 
                icon="solar:users-group-rounded-bold-duotone"
              >
                Content
              </Sidebar.Sub>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </ScrollArea>
      <Sidebar.Separator />
      <Sidebar.Content>
        <UserButton />
      </Sidebar.Content>
    </Sidebar>
  );
} 