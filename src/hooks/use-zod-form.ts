import { z, ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";

export const useZodForm = <T extends ZodSchema>(
  schema: T,
  mutation: UseMutateFunction<unknown, unknown, z.infer<T>, unknown>,
  defaultValues?: z.infer<T>,
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onFormSubmit = handleSubmit(async (values) => mutation({ ...values })); 

  return {
    register,
    watch,
    reset,
    onFormSubmit,
    errors
  };
}