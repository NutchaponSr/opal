import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient, trpc } from "@/trpc/server";

import { PageClient } from "./client";

const OverviewPage = async () => {
  void trpc.hello.prefetch({ text: "Antonio" });

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}

export default OverviewPage;