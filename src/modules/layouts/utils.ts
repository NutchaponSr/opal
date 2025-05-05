import { ColumnType } from "@/types/columns";

export function compareValues(
  value: string | number,
  filterValue: string,
  operator: string,
  columnType: ColumnType,
): boolean {
  if (columnType === "text" && typeof value === "string") {
    const lowerValue = value.toLowerCase();
    const lowerFilterValue = filterValue.toLowerCase();

    switch (operator) {
      case "contains":
        return lowerValue.includes(lowerFilterValue);
      case "does not contain":
        return !lowerValue.includes(lowerFilterValue);
      default:
        return true;
    }
  }

  return true;
}