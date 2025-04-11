import { create } from "zustand";
import { Table } from "@tanstack/react-table";

type ColumnFilterStore<TData> = {
  columnFilter: Set<string>;
  table: Table<TData> | null;
  setTable: (table: Table<TData>) => void;
  setColumnFilter: (column: string) => void;
  onRemove: (column: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useColumnFilterStore = create<ColumnFilterStore<any>>((set) => ({
  columnFilter: new Set<string>(),
  table: null, // Initial value
  setTable: (table) => set({ table }),
  setColumnFilter: (column: string) => set((state) => {
    const newSet = new Set(state.columnFilter);
    if (newSet.has(column)) {
      newSet.delete(column); 
    } else {
      newSet.add(column); 
    }
    return { columnFilter: newSet };
  }),
  onRemove: (column: string) => set((state) => {
    const newSet = new Set(state.columnFilter);
      if (newSet.has(column)) {
        if (state.table) {
          const columnObj = state.table.getColumn(column);
          if (columnObj) {
            columnObj.setFilterValue(undefined);
          }
        }
        newSet.delete(column);
      }
    return { columnFilter: newSet };
  }),
}));