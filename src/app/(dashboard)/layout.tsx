import { Merriweather_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

import { MenuBar } from "@/modules/dashboard/components/menu-bar";
import { SidebarClient } from "@/modules/dashboard/components/sidebar-client";

const font = Merriweather_Sans({
  subsets: ["latin"],
})

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={cn(font.className, "w-screen h-full relative flex bg-white")}>
      <SidebarClient />
      <div className="order-3 flex flex-col w-full overflow-hidden isolation-auto bg-transparent">
        <MenuBar />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;