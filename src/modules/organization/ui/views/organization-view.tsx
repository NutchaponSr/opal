"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { OrganizationForm } from "@/modules/organization/ui/components/organization-form";

export const OrganizationView = () => {
  const trpc = useTRPC();

  const { data, isLoading, refetch } = useQuery(trpc.organizations.getOne.queryOptions());

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <Icon icon="svg-spinners:bars-rotate-fade" className="size-10 text-primary" />
    )
  };

  if (data) {
    redirect(`/${data.id}`);
  }

  return (
    <OrganizationForm />
  );
}