import { Merriweather_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { MenuBar } from "@/modules/dashboard/components/menu-bar";
import { SidebarSkeleton } from "@/modules/dashboard/components/ui/sidebar";
import { SidebarClient } from "@/modules/dashboard/components/sidebar-client";

const font = Merriweather_Sans({
  subsets: ["latin"],
})

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.groups.getMany.queryOptions());

  return (
    <div className={cn(font.className, "w-screen h-full relative flex bg-white")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarClient /> 
        </Suspense>
      </HydrationBoundary>
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