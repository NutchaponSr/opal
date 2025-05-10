import * as React from "react";
import { Icon } from "@iconify/react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const inputVariant = cva(
  "",
  {
    variants: {
      variant: {
        default: "bg-background border",
        search: "bg-[#f2f1ee99] shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)]",
      },
      scale: {
        sm: "text-sm h-7 leading-5 rounded-sm px-2"
      },
      input: {
        setup: "placeholder:text-[#b9b9b6] outline-none font-light text-primary"
      }
    },
    defaultVariants: {
      variant: "default",
      scale: "sm",
      input: "setup",
    }
  }
)

function Input({ 
  className, type, reset, variant, scale, input, ...props 
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariant> & { reset?: boolean }) {
  const [value, setValue] = React.useState(props.value?.toString() ?? "");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  }

  const onClear = () => {
    setValue("");
    props.onChange?.({
      target: { value: "" },
      currentTarget: { value: "" },
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.ChangeEvent<HTMLInputElement>)
  }
  
  if (reset) {
    return (
      <div className="flex-1">
        <div className={cn("flex items-center w-full cursor-text", inputVariant({ scale, variant }), className)}>
          <SearchIcon className="size-4 shrink-0 text-[#787774]" />

          <input 
            type={type}
            value={value}
            onChange={onChange}
            data-slot="input"
            className={cn(inputVariant({ input }), "shadow-none border-none w-full bg-transparent")}
            {...props}
          />
          {value && (
            <button onClick={onClear}>
              <Icon icon="solar:close-circle-bold" className="size-4 text-[#c2c0ba]" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      data-slot="input"
      className={cn(
        inputVariant({ variant }),
        className,
      )}
      {...props}
    />
  )
}

export { Input }
