import "@tanstack/react-table";
import { FilterFn } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
  interface ColumnMeta {
    width?: string;
    icon?: string;
    variant: ColumnType;
    options?: string[];
  }

  interface FilterFns {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    custom: FilterFn<any>;
  }
}