"use client";

import { useContext } from "react";
import { HeaderContext } from "../providers/HeaderProvider";
import { AlignJustify } from "lucide-react";
import { cn } from "../lib/utils";

export const MobileNavToggle = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(HeaderContext);
  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
      >
        <AlignJustify
          className={cn(
            "h-6 w-6 transform transition-transform duration-300 text-main-blue",
            mobileMenuOpen ? "rotate-180" : ""
          )}
        />
      </button>
    </div>
  );
};
