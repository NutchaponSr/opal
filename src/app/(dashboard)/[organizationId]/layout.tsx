import localFont from "next/font/local";

import { cn } from "@/lib/utils";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { MenuBar } from "@/modules/dashboard/components/menu-bar";
import { SidebarSkeleton } from "@/modules/dashboard/components/ui/sidebar";
import { SidebarClient } from "@/modules/dashboard/components/sidebar-client";


const sfPro = localFont({
  src: '../../../../public/fonts/sf-pro-display.woff2',
  variable: '--font-sf-pro'
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}

const Layout = async ({ children, params }: Props) => {
  const { organizationId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.groups.getMany.queryOptions({ organizationId }));
  void queryClient.prefetchQuery(trpc.organizations.getMany.queryOptions());

  return (
    <div className={cn(sfPro.className, "w-screen h-full relative flex bg-white")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SidebarSkeleton />}>
          <ErrorBoundary fallback={<SidebarSkeleton />}>
            <SidebarClient organizationId={organizationId} /> 
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
      <div className="order-3 flex flex-col w-full overflow-hidden isolation-auto bg-transparent">
        <MenuBar />
        <main className="grow-0 shrink flex flex-col bg-white h-full min-h-full w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;