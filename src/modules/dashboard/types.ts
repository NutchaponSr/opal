import { cva, type VariantProps } from "class-variance-authority";

export const iconVariant = cva("", {
  variants: {
    background: {
      default: "bg-none",
      pink: "bg-[#c14c8a]",
      orange: "bg-[#c86f21]",
      primary: "bg-[#347ea9]",
    },
    text: {
      default: "text-white",
      gray: "text-[#91918e]",
      pink: "text-[#c14c8a]",
      orange: "text-[#c86f21]",
      primary: "text-[#347ea9]",
    },
    size: {
      menu: "size-5",
      workspace: "size-3.5",
      dot: "size-2.5",
      item: "size-4.5",
    },
  },
  defaultVariants: {
    background: "default",
    text: "default",
    size: "menu",
  }
});

export type IconVariant = NonNullable<VariantProps<typeof iconVariant>["background"]>;