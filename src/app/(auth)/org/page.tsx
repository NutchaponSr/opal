import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { OrganizationView } from "@/modules/organization/ui/views/organization-view";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.fetchQuery(trpc.organizations.getOne.queryOptions());
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationView />
    </HydrationBoundary>
  );
}

export default Page;