import { create } from "zustand"; 

type CreateStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateStore = create<CreateStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));