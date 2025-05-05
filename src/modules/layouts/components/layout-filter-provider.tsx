import { Filter } from "@/types/columns";

import { FilterNumeric, FilterText } from "./ui/layout-filter";

interface Props<T> {
  filter: Filter<T>;
}

export const LayoutFilterProvider = <T,>({ ...props }: Props<T>) => {
switch (props.filter.columnType) {
    case "text": 
      return <FilterText {...props} />
    case "numeric":
      return <FilterNumeric {...props}  />
    default:
      break;
  }
}