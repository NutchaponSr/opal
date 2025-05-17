import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "text-primary inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)]",
        success: "bg-green-600 text-white shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)]",
        outline: "bg-background hover:bg-[#f2f1ee99] shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)]",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-[#00000008] hover:text-primary dark:hover:bg-accent/50",
        item: "hover:bg-accent text-[#787774] hover:text-[#787774] justify-start font-normal dark:hover:bg-accent/50 w-full",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-marine hover:bg-[#0077d4] text-white shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)]"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        md: "h-8 rounded-sm px-2 py-1 text-sm",
        sm: "h-7 rounded-sm gap-1 px-2 has-[>svg]:px-2 text-xs",
        xs: "h-6 rounded-sm gap-1 px-3 has-[>svg]:px-2 text-xs",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        maxIcon: "size-8 rounded-md",
        smIcon: "size-7 rounded-sm",
        icon: "size-6 rounded-sm",
        item: "h-7 rounded-sm px-2 has-[>svg]:px-2 text-xs gap-2",
        xsIcon: "size-5 rounded-sm",
        group: "h-7 rounded-none p-0 px-2 text-xs"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
