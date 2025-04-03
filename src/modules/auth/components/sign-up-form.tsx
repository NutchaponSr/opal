"use client";

import { useState, useTransition } from "react";

import { useZodForm } from "@/hooks/use-zod-form";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/form";
import { Loader } from "@/components/loader";
import { FormGenerator } from "@/components/form-generator";

import { SignUpSchema, signUpSchema } from "@/modules/auth/schema";

import { register as signUp } from "@/modules/auth/actions/register";

export const SignUpForm = () => {
  const {
    errors,
    reset,
    register,
    handleSubmit,
  } = useZodForm(signUpSchema);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = handleSubmit(async (value: SignUpSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signUp(value)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
    });
  }); 

  return (
    <form onSubmit={onSubmit} className="relative w-full flex flex-col gap-3">
      <FormGenerator 
        register={register}
        errors={errors}
        placeholder=""
        label="Username"
        name="name"
        type="text"
        inputType="input"
        disabled={isPending}
      />
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