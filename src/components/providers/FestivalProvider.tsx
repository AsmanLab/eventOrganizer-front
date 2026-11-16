import React, { createContext, useContext, ReactNode } from "react";

export interface FestivalOption {
  value: string;
  label: string;
}

interface FestivalContextValue {
  festivalOptions: FestivalOption[];
}

const FestivalContext = createContext<FestivalContextValue | undefined>(
  undefined
);

export const FestivalProvider = ({
  festivalOptions,
  children,
}: {
  festivalOptions: FestivalOption[];
  children: ReactNode;
}) => {
  return (
    <FestivalContext.Provider value={{ festivalOptions }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestivalOptions = () => {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error(
      "useFestivalOptions must be used within a FestivalProvider"
    );
  }
  return context.festivalOptions;
};
