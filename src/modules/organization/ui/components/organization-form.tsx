"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { organizationSchema } from "@/schema";

import { useZodForm } from "@/hooks/use-zod-form";

import { Button } from "@/components/ui/button";

import { FormGenerator } from "@/components/form-generator";

export const OrganizationForm = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createOrganization = useMutation(trpc.organizations.create.mutationOptions({
    onSuccess: () => {
      toast.success("Organization created");
      queryClient.invalidateQueries(trpc.organizations.getOne.queryOptions());
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  }));

  const {
    errors,
    register,
    onFormSubmit,
  } = useZodForm(
    organizationSchema, 
    createOrganization.mutate, 
    {
      name: "",
      slugUrl: "",
    }
  );

  return (
    <form 
      onSubmit={onFormSubmit}
      className="w-full flex flex-col gap-4"
    >
      {/* <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
        Create organization
      </h1> */}
      <FormGenerator 
        register={register}
        name="name"
        label="Organization name"
        errors={errors}
        inputType="input"
        type="text"
        className="h-10 bg-white"
        disabled={createOrganization.isPending}
        />
      <FormGenerator 
        register={register}
        name="slugUrl"
        label="slug url"
        errors={errors}
        inputType="input"
        type="text"
        className="h-10 bg-white"
        disabled={createOrganization.isPending}
      />
      <Button size="lg" disabled={createOrganization.isPending}>
        Continue
      </Button>
    </form>
  );
}