"use client";

import { createContext, useContext, useState } from "react";

type DropdownContextType = {
  open: string | null;
  setOpen: (id: string | null) => void; 
}

const DropdownContext = createContext<DropdownContextType>({
  open: null,
  setOpen: () => {},
});

export const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}

export const useDropdownContext = () => useContext(DropdownContext);