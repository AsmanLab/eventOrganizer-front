import React, { createContext, useContext, ReactNode } from "react";
import { TFestival } from "shared/types/festivals";

interface FestivalContextValue {
  festival: TFestival;
}

const FestivalInfoContext = createContext<FestivalContextValue | undefined>(
  undefined
);

export const FestivalInfoProvider = ({
  festival,
  children,
}: {
  festival: TFestival;
  children: ReactNode;
}) => {
  return (
    <FestivalInfoContext.Provider value={{ festival }}>
      {children}
    </FestivalInfoContext.Provider>
  );
};

export const useFestivalInfo = () => {
  const context = useContext(FestivalInfoContext);
  if (!context) {
    throw new Error(
      "useFestivalInfo must be used within a FestivalInfoProvider"
    );
  }
  return context.festival;
};
