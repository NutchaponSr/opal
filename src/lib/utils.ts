import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { timesOfDay } from "@/types/date";
import { Row, RowData } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cuid() {
  const timestamp = Date.now().toString(36);

  let counter = 0;
  const count = (counter++).toString(36);

  const random = Array.from({ length: 8 }, () => Math.random().toString(36).substring(2, 3)).join("");

  return "c" + timestamp + count + random;
}

export function formatGreeting(date: Date): string {
  const hour = date.getHours(); 

  const timeOfDay = timesOfDay.find(({ from, to }) => from < to ? hour >= from && hour < to : hour >= from || hour < to);

  return `Good ${timeOfDay?.time || "Day"}`;
}

interface CustomFilterValue {
  operator: string;
  value: string | { from: Date; to: Date };
}

export const customFilterFn = <TData extends RowData>(
  row: Row<TData>,
  columnId: string,
  filterValue: CustomFilterValue | undefined
): boolean => {
  // If no filter or incomplete filter, include the row
  if (!filterValue || !filterValue.operator || !filterValue.value) {
    return true;
  }

  const { operator, value } = filterValue;
  const cellValue = row.getValue(columnId);

  // Exclude rows with null/undefined cell values
  if (cellValue == null) {
    return false;
  }

  // Handle string-based filters (text, numeric, and single-date operators)
  if (typeof value === "string") {
    try {
      const cellStr = String(cellValue).toLowerCase();
      const filterStr = value.toLowerCase();

      switch (operator) {
        // Text operators
        case "contain":
          return cellStr.includes(filterStr);
        case "does not contain":
          return !cellStr.includes(filterStr);

        // Numeric operators
        case ">":
          return Number(cellValue) > Number(value);
        case "<":
          return Number(cellValue) < Number(value);
        case "≤":
          return Number(cellValue) <= Number(value);
        case "≥":
          return Number(cellValue) >= Number(value);
        case "=":
          return Number(cellValue) === Number(value);
        case "≠":
          return Number(cellValue) !== Number(value);

        // Date operators (value as ISO string)
        case "is": {
          const cellDate = new Date(cellValue as string | Date);
          const filterDate = new Date(value);
          if (isNaN(cellDate.getTime()) || isNaN(filterDate.getTime())) {
            return false;
          }
          return cellDate.getTime() === filterDate.getTime();
        }
        case "is before": {
          const cellDate = new Date(cellValue as string | Date);
          const filterDate = new Date(value);
          if (isNaN(cellDate.getTime()) || isNaN(filterDate.getTime())) {
            return false;
          }
          return cellDate < filterDate;
        }
        case "is after": {
          const cellDate = new Date(cellValue as string | Date);
          const filterDate = new Date(value);
          if (isNaN(cellDate.getTime()) || isNaN(filterDate.getTime())) {
            return false;
          }
          return cellDate > filterDate;
        }
        case "is on or before": {
          const cellDate = new Date(cellValue as string | Date);
          const filterDate = new Date(value);
          if (isNaN(cellDate.getTime()) || isNaN(filterDate.getTime())) {
            return false;
          }
          return cellDate <= filterDate;
        }
        case "is on or after": {
          const cellDate = new Date(cellValue as string | Date);
          const filterDate = new Date(value);
          if (isNaN(cellDate.getTime()) || isNaN(filterDate.getTime())) {
            return false;
          }
          return cellDate >= filterDate;
        }

        default:
          console.warn(`Unsupported operator: ${operator} for string value`);
          return true;
      }
    } catch (error) {
      console.error(`Error in customFilterFn for ${columnId}:`, error);
      return false;
    }
  }

  // Handle date range filters
  if ("from" in value && "to" in value) {
    try {
      const cellDate = new Date(cellValue as string | Date);
      if (isNaN(cellDate.getTime())) {
        return false;
      }
      const fromDate = new Date(value.from);
      const toDate = new Date(value.to);
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return false;
      }

      switch (operator) {
        case "is between":
          return cellDate >= fromDate && cellDate <= toDate;
        default:
          console.warn(`Operator ${operator} not supported with DateRange`);
          return true;
      }
    } catch (error) {
      console.error(`Error in customFilterFn for ${columnId} with DateRange:`, error);
      return false;
    }
  }

  // Fallback for unhandled cases
  console.warn(`Unhandled filter value type for operator: ${operator}`);
  return true;
};