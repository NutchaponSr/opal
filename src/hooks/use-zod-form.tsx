import { z, ZodSchema } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = (
  schema: ZodSchema,
  defaultValues?: any,
  mutation?: UseMutateFunction
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = handleSubmit(async (value) => {
    if (mutation) {
      mutation(value);
    }
  });

  return {
    register,
    watch,
    reset,
    onSubmit,
    handleSubmit,
    errors
  };
}