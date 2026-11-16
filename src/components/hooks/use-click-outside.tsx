"use client";

import { useRef, useCallback, useEffect } from "react";

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => handleClick(event);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClick]);

  return ref;
};
