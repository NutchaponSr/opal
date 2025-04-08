import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient, trpc } from "@/trpc/server";

import { GroupClientPage } from "./client";

const GroupPage = async () => {
  void trpc.groups.getAll.prefetch();

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <GroupClientPage />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}

export default GroupPage;