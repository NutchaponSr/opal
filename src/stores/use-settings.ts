import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Layout } from "@/modules/layouts/types/layout";

type SettingsStore = {
  layout: Layout;
  onChangeLayout: (layout: Layout) => void;
}

export const useSettings = create<SettingsStore>()(
  persist((set) => ({
    layout: "table",
    onChangeLayout: (layout) => set({ layout }),
  }), {
    name: "settings",
  })
)