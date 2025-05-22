import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { LayoutType, PeekType } from "../types";

type LayoutStore = {
  layout: LayoutType;
  isShowLine: boolean;
  isShowIcon: boolean;
  peek: PeekType;
  onChangeLayout: (layout: LayoutType) => void;
  onChangeLine: (value: boolean) => void;
  onChangeIcon: (value: boolean) => void;
  onChangePeek: (peek: PeekType) => void;

}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      layout: "table",
      isShowIcon: true,
      isShowLine: true,
      peek: "side",
      onChangeLayout: (layout) => set({ layout }),
      onChangeLine: (value) => set({ isShowLine: value }),
      onChangeIcon: (value) => set({ isShowIcon: value }),
      onChangePeek: (peek) => set({ peek: peek }),
    }),
    {
      name: "layout",
      storage: createJSONStorage(() => localStorage),
    }
  )
)