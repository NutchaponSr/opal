import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type LayoutStore = {
  layout: "table" | "kanban";
  onChangeLayout: (layout: "table" | "kanban") => void;
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      layout: "table",
      onChangeLayout: (layout) => set({ layout }),
    }),
    {
      name: "layout",
      storage: createJSONStorage(() => localStorage),
    }
  )
)