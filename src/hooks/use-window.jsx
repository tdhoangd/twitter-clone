"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const WindowContext = createContext(null);

export function WindowContextProvider({ children }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = {
    ...windowSize,
    isMobile: windowSize.width < 500,
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);

  if (!context)
    throw new Error("useWindow must be used within an WindowContextProvider");

  return context;
}
