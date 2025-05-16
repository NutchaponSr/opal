"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { OrganizationForm } from "@/modules/organization/ui/components/organization-form";

export const OrganizationView = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    ...trpc.organizations.getOne.queryOptions(),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      router.push(`/${data.id}`);
    }
  }, [data, router]);

  if (isLoading) {
    return (
      <Icon icon="svg-spinners:bars-rotate-fade" className="size-10 text-primary" />
    )
  };

  if (isError) {
    return (
      <div className="p-4 rounded bg-red-50 text-red-700">
        <p>Failed to load organization: {error?.message || "Unknown error"}</p>
        <button 
          onClick={() => router.refresh()}
          className="mt-2 px-4 py-2 bg-red-100 rounded hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return <OrganizationForm />
  }

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Icon icon="svg-spinners:bars-rotate-fade" className="size-10 text-primary" />
    </div>
  );
}