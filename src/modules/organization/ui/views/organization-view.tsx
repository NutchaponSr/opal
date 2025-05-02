"use client";

import { OrganizationInitial } from "@/components/organization-initial";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const OrganizationView = () => {
  const trpc = useTRPC();

  const { data, isLoading } = useQuery(trpc.organizations.getOne.queryOptions());

  if (isLoading) return null;

  if (data) {
    redirect(`/org/${data.id}`);
  }

  return (
    <OrganizationInitial />
  );
}