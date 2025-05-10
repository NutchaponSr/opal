import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { trpc, getQueryClient } from "@/trpc/server";

import { GroupView } from "@/modules/groups/components/views/group-view";

interface Props {
  params: Promise<{ organizationId: string; }>;
}

const Page = async ({ params }: Props) => {
  const { organizationId } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.groups.getMany.queryOptions({ organizationId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupView organizationId={organizationId} />
    </HydrationBoundary>
  );
}

export default Page;