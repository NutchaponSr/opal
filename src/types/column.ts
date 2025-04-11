export type ColumnType = "text" | "numeric" | "date" | "select";

export const columnIcons: Record<ColumnType, string> = {
  text: "famicons:text-outline",
  numeric: "mage:hash",
  date: "solar:calendar-outline",
  select: "teenyicons/loader-outline",
}

export const columnFilterOptions: Record<ColumnType, string[]> = {
  text: ["contain", "does not contain"],
  numeric: [">", "<", "≤", "≥", "=", "≠"],
  date: ["is", "is before", "is after", "is on or before", "is on or after", "is between"],
  select: ["is", "is not"],        
};