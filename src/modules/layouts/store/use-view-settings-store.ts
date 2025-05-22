import { create } from "zustand";

type ViewContent = "layouts" | "properties" | "filter" | "sort" | "grouping" | "automations";

type ViewSettingsStore = {
  isOpen: boolean;
  content: ViewContent | null;
  onOpen: (content: ViewContent) => void;
  onBack: () => void;
}

export const useViewSettingsStore = create<ViewSettingsStore>((set) => ({
  isOpen: false,
  content: null,
  onOpen: (content) => set({ content, isOpen: true }),
  onBack: () => set({ content: null }),
}));