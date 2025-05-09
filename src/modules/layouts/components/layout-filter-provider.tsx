import { Filter } from "@/types/columns";

import { FilterNumeric, FilterText } from "./ui/layout-filter";

interface Props<T> {
  filter: Filter<T>;
  onUpdate: (filter: Filter<T>) => void;
  onRemove: () => void;
}

const filterComponents = {
  text: FilterText,
  numeric: FilterNumeric,
} as const;

export const LayoutFilterProvider = <T,>({ filter, ...props }: Props<T>) => {
  const FilterComponent = filterComponents[filter.columnType as keyof typeof filterComponents];
  
  if (!FilterComponent) {
    return null;
  }

  return <FilterComponent filter={filter} {...props} />;
}