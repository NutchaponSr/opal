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
);

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  variant?: VariantProps<typeof inputVariant>["variant"];
  scale?: VariantProps<typeof inputVariant>["scale"];
  input?: VariantProps<typeof inputVariant>["input"];
  reset?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  function Input({ className, type, reset, variant, scale, input, onChange, value: controlledValue, ...props }, forwardedRef) {
    // สร้าง internal ref สำหรับ input element
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    // ตรวจสอบว่าเป็น controlled หรือ uncontrolled component
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState("");
    
    // ค่า value ที่จะแสดงใน input
    const displayValue = isControlled ? controlledValue : uncontrolledValue;
    
    React.useEffect(() => {
      // อัพเดต internal state เมื่อ controlledValue เปลี่ยน (เฉพาะ controlled mode)
      if (isControlled && controlledValue !== undefined) {
        if (typeof controlledValue === 'string') {
          setUncontrolledValue(controlledValue);
        } else if (controlledValue !== null) {
          setUncontrolledValue(String(controlledValue));
        }
      }
    }, [controlledValue, isControlled]);

    // จัดการ ref จากภายนอกและภายใน
    const mergedRef = useMergedRef(forwardedRef, inputRef);
    
    // จัดการการเปลี่ยนแปลงค่าใน input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      
      if (onChange) {
        onChange(e);
      }
    };

    // ล้างค่าใน input
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (!isControlled) {
        setUncontrolledValue("");
      }
      
      if (onChange) {
        // ส่ง proper synthetic event object
        onChange({
          target: { value: "" },
          currentTarget: inputRef.current,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.ChangeEvent<HTMLInputElement>);
      }
      
      // โฟกัสกลับไปที่ input
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
            <SearchIcon className="size-4 shrink-0 text-[#787774]" />
            
            <input 
              ref={mergedRef}
              type={type}
              value={displayValue}
              onChange={handleChange}
              data-slot="input"
              className={cn(
                inputVariant({ input }), 
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
          "shadow-none border-none w-full bg-transparent",
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
