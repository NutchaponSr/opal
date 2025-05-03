import { iconVariant } from "@/modules/dashboard/types";

import { VariantProps } from "class-variance-authority";

export interface Workspace extends VariantProps<typeof iconVariant> {
  href: string;
  label: string;
  description: string;
  icon: string;
  className: string;
}

export const group: Workspace = {
  label: "Group",
  href: "groups",
  description: "Combining diverse skills to achieve shared goals.",
  icon: "solar:library-bold-duotone",
  className: "bg-[#f5e0e9] dark:bg-[#4e2c3c]",
  color: "pink",
};

export const competency: Workspace = {
  label: "Competency",
  href: "competencies",
  description: "Diverse skills and competencies to achieve shared goals.",
  icon: "solar:bookmark-square-bold-duotone",
  className: "bg-[#fadec9] dark:bg-[#5c3b23]",
  color: "orange",
}

export const employee: Workspace = {
  label: "Employee",
  href: "employees",
  description: "Manage employees with diverse competencies to achieve goals.",
  icon: "solar:users-group-rounded-bold-duotone",
  className: "bg-[#d8e5ee] dark:bg-[#143a4e]",
  color: "primary",
}

export const workspaces: Workspace[] = [group, competency, employee] as const;