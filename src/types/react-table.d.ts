import "@tanstack/react-table";

import { FilterFn } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import { ColumnType } from "./columns";
declare module "@tanstack/react-table" {
  interface ColumnMeta {
    width?: string;
    icon?: LucideIcon;
    variant: ColumnType;
    options?: string[];
  }

  interface FilterFns {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    custom: FilterFn<any>;
  }

  interface ColumnSort {
    desc: boolean;
    id: string;
    type: ColumnType;
    icon?: LucideIcon;
  }
}
