"use client";

import { createContext, useState } from "react";

export const HeaderContext = createContext<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <HeaderContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </HeaderContext.Provider>
  );
};
