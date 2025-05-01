import { cva, type VariantProps } from "class-variance-authority";

export const iconVariant = cva("", {
  variants: {
    color: {
      default: "text-[#91918e]",
      pink: "text-[#c14c8a]",
      orange: "text-[#c86f21]",
      primary: "text-[#347ea9]",
    },
    background: {
      default: "bg-none",
      pink: "bg-[#f3dae3]",
      orange: "bg-[#f2d7c6]",
      primary: "bg-[#d0e2ed]"
    },
  },
  defaultVariants: {
    color: "default",
    background: "default",
  }
});

export type IconVariant = NonNullable<VariantProps<typeof iconVariant>["color"]>;