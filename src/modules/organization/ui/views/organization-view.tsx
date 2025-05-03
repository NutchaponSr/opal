"use client";

import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { OrganizationInitial } from "@/components/organization-initial";
import { useTRPC } from "@/trpc/client";

export const OrganizationView = () => {
  const trpc = useTRPC();

  const { data, isLoading } = useQuery(trpc.organizations.getOne.queryOptions());

  if (isLoading) {
    return (
      <Icon icon="svg-spinners:bars-rotate-fade" className="size-10 text-primary" />
    )
  };

  if (data) {
    redirect(`/${data.id}`);
  }

  return (
    <OrganizationInitial />
  );
}