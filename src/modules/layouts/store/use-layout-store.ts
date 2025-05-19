import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { LayoutType } from "../types";

type LayoutStore = {
  layout: LayoutType;
  onChangeLayout: (layout: LayoutType) => void;
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