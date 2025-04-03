"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { useZodForm } from "@/hooks/use-zod-form";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/form";
import { Loader } from "@/components/loader";
import { FormGenerator } from "@/components/form-generator";

import { SignInSchema, signInSchema } from "@/modules/auth/schema";

import { login } from "@/modules/auth/actions/login";

export const SignInForm = () => {
  const {
    errors,
    reset,
    register,
    handleSubmit,
  } = useZodForm(signInSchema);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = handleSubmit((value: SignInSchema) => {
    setError("");

    startTransition(() => {
      login(value, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
          }
        })
    });
  }); 

  return (
    <form onSubmit={onSubmit} className="relative w-full flex flex-col gap-3">
      <FormGenerator 
        register={register}
        errors={errors}
        placeholder=""
        label="Email"
        name="email"
        type="email"
        inputType="input"
        disabled={isPending}
      />
      <FormGenerator 
        register={register}
        errors={errors}
        placeholder=""
        label="Password"
        disabled={isPending}
        name="password"
        type="password"
        inputType="input"
      />
      <Form.Error message={error} />
      <Form.Success message={success} />
      <Button type="submit" className="p-0" disabled={isPending}>
        <Loader state={isPending}>
          Continue
        </Loader>
      </Button>
    </form>
  );
}