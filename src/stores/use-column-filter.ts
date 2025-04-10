import { create } from "zustand";

type ColumnFilterStore = {
  columnFilter: Set<string>;
  setColumnFilter: (column: string) => void;
  onRemove: (column: string) => void;
};

export const useColumnFilterStore = create<ColumnFilterStore>((set) => ({
  columnFilter: new Set<string>(),
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
    newSet.delete(column); 
    return { columnFilter: newSet };
  }),
}));