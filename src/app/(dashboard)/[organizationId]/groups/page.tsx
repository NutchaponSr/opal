import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { trpc, getQueryClient } from "@/trpc/server";

import { GroupView } from "@/modules/groups/components/views/group-view";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.groups.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupView />
    </HydrationBoundary>
  );
}

export default Page;