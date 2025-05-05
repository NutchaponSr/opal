import { create } from "zustand";
import { Column } from "@tanstack/react-table";

import { columnFilterOptions, ColumnType, Filter, FilterGroup } from "@/types/columns";

type FilterStore<T> = {
  filterGroup: FilterGroup<T>;
  setFilterGroup: (filterGroup: FilterGroup<T>) => void;
  addFilter: (column: Column<T>, columnType: ColumnType) => void;
  updateFilter: (filterId: number, updateFilter: Filter<T>) => void;
  removeFilter: (filterId: number) => void;
  addFilterGroup: () => void;
  updateGroup: (groupId: number, updateGroup: FilterGroup<T>) => void;
  removeGroup: (groupId: number) => void;
  setConnector: (connector: "AND" | "OR") => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLayoutFilterStore = create<FilterStore<any>>((set) => ({
  filterGroup: {
    id: Date.now(),
    filters: [],
    groups: [],
    connector: "AND",
  },
  setFilterGroup: (filterGroup) => set({ filterGroup }),
  addFilter: (column, columnType) => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      filters: [
        ...state.filterGroup.filters,
        {
          id: Date.now(),
          column,
          operator: columnFilterOptions[columnType][0],
          value: "",
          columnType,
        },
      ],
    },
  })),
  updateFilter: (filterId, updateFilter) => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      filters: state.filterGroup.filters.map((f) => 
        f.id === filterId ? updateFilter : f
      ),
    },
  })),
  removeFilter: (filterId) => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      filters: state.filterGroup.filters.filter((f) => f.id !== filterId)
    }
  })),
  addFilterGroup: () => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      groups: [
        ...state.filterGroup.groups,
        {
          id: Date.now(),
          filters: [],
          groups: [],
          connector: "AND",
        },
      ],
    },
  })),
  updateGroup: (groupId, updateGroup) => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      groups: state.filterGroup.groups.map((g) => 
        g.id === groupId ? updateGroup : g
      ),
    },
  })),
  removeGroup: (groupId) => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      groups: state.filterGroup.groups.filter((g) => g.id !== groupId),
    },
  })),
  setConnector: (connector) => set((state) => ({
    filterGroup: {
      ...state.filterGroup,
      connector,
    },
  })),
}));