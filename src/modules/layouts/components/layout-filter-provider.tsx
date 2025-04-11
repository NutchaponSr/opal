import LayoutFilter from "./ui/layout-filter";

import { ColumnType } from "@/types/column";
import { Column } from "@tanstack/react-table";

interface LayoutFilterProviderProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export const LayoutFilterProvider = <TData, TValue>({ ...props }: LayoutFilterProviderProps<TData, TValue>) => {
  const type = props.column.columnDef.meta?.variant as ColumnType;

  switch (type) {
    case "text": 
      return <LayoutFilter.Text {...props} />
    case "numeric": 
      return <LayoutFilter.Numeric {...props} />
  }
}