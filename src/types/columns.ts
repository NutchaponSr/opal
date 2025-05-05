import { Column } from "@tanstack/react-table";
import { 
  CalendarDaysIcon,
  HashIcon,
  Heading1Icon, 
  LoaderIcon, 
  LucideIcon 
} from "lucide-react";

export type ColumnType = "text" | "numeric" | "date" | "select";

export const columnIcons: Record<ColumnType, LucideIcon> = {
  text: Heading1Icon,
  numeric: HashIcon,
  date: CalendarDaysIcon,
  select: LoaderIcon,
}

export const columnFilterOptions: Record<ColumnType, string[]> = {
  text: ["contains", "does not contain"],
  numeric: [">", "<", "≤", "≥", "=", "≠"],
  date: ["is", "is before", "is after", "is on or before", "is on or after", "is between"],
  select: ["is", "is not"],        
};

export interface Filter<T> {
  id: number;
  column: Column<T>;
  operator: string;
  value: string;
  columnType: ColumnType;
}

export interface FilterGroup<T> {
  id: number;
  filters: Filter<T>[];
  groups: FilterGroup<T>[];
  connector: "AND" | "OR";
}