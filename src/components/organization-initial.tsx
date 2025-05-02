"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { organizationSchema, OrganizationSchema } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const OrganizationInitial = () => {
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

  const form = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      slugUrl: "",
    }
  });

  const onSubmit = (values: OrganizationSchema) => {
    createOrganization.mutate({ ...values });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slugUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug-url</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button>
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}