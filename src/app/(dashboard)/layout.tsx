import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Menubar } from "@/modules/dashboard/components/menu-bar";
import { SidebarProvider } from "@/modules/dashboard/components/sidebar-provider";

const font = JetBrains_Mono({
  subsets: ["latin"],
})

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={cn(font.className, "w-screen h-full relative flex bg-background")}>
      <SidebarProvider />
      <div className="flex flex-col w-full overflow-hidden isolation-auto bg-transparent">
        <Menubar />
        <main className="grow-0 shrink flex flex-col bg-background h-[calc(-44px+100vh)] max-h-full relative w-full shadow-[inset_0_1px_0_0_rgba(55,53,37,0.09)] dark:shadow-[inset_0_1px_0_0_rgba(47,47,47)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;