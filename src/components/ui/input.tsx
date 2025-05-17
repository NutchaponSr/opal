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
        default: "bg-background border shadow-xs",
        none: "border-none",
        search: "bg-[#f2f1ee99] shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)]",
      },
      scale: {
        none: "text-xs h-7 leading-6 px-0",
        sm: "text-sm h-7 leading-5 rounded-sm px-2",
        md: "text-sm h-8 rounded-md px-3 py-1.5",
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
);

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  variant?: VariantProps<typeof inputVariant>["variant"];
  scale?: VariantProps<typeof inputVariant>["scale"];
  input?: VariantProps<typeof inputVariant>["input"];
  reset?: boolean;
  showSearch?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  function Input({ className, type, reset, variant, scale, showSearch, input, onChange, value: controlledValue, ...props }, forwardedRef) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState("");
    
    const displayValue = isControlled ? controlledValue : uncontrolledValue;
    
    React.useEffect(() => {
      if (isControlled && controlledValue !== undefined) {
        if (typeof controlledValue === 'string') {
          setUncontrolledValue(controlledValue);
        } else if (controlledValue !== null) {
          setUncontrolledValue(String(controlledValue));
        }
      }
    }, [controlledValue, isControlled]);

    const mergedRef = useMergedRef(forwardedRef, inputRef);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (!isControlled) {
        setUncontrolledValue("");
      }
      
      if (onChange) {
        onChange({
          target: { value: "" },
          currentTarget: inputRef.current,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.ChangeEvent<HTMLInputElement>);
      }
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };

    if (reset) {
      return (
        <div className="flex-1">
          <div 
            className={cn(
              "flex items-center w-full cursor-text", 
              inputVariant({ scale, variant }), 
              className
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {showSearch && <SearchIcon className="size-4 shrink-0 text-[#787774]" />}
            
            <input 
              ref={mergedRef}
              type={type}
              value={displayValue}
              onChange={handleChange}
              data-slot="input"
              className={cn(
                inputVariant({ input, scale }), 
                "shadow-none border-none w-full bg-transparent"
              )}
              {...props}
            />
            
            {displayValue && (
              <button 
                type="button"
                onClick={handleClear}
                className="focus:outline-none p-1"
              >
                <Icon 
                  icon="solar:close-circle-bold" 
                  className="size-4 text-[#c2c0ba] hover:text-[#a09f9d] transition-colors"
                />
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <input
        ref={mergedRef}
        type={type}
        value={displayValue}
        onChange={handleChange}
        data-slot="input"
        className={cn(
          "w-full bg-transparent",
          inputVariant({ variant, scale }),
          className,
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return React.useCallback((value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  }, [refs]);
}

export { Input }
