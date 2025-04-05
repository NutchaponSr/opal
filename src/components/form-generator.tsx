import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormGeneratorProps {
  type?: "text" | "email" | "password";
  inputType: "select" | "input";
  options?: {
    value: string;
    label: string;
    id: string;
  }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  disabled?: boolean;
  errors: FieldErrors<FieldValues>;
}

export const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  disabled,
  name,
  errors,
}: FormGeneratorProps) => {
  switch (inputType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2 items-start" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-destructive text-xs">
                {message}
              </p>
            )}
          />
        </Label>
      );
    default:
      break;
  }
}