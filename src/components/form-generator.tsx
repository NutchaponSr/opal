import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  options?: {
    value: string;
    label: string;
    id: string;
  }[];
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
}

export const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  className,
  register,
  name,
  disabled,
  errors,
  lines
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-1.5 items-start"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Input 
            id={`input-${label}`}
            type={type}
            scale="md"
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            {...register(name)}
          />
          <ErrorMessage 
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-destructive text-xs">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    default:
      break;
  }
}