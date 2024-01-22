import React, { useState } from "react";
import ThemeContext from "./theme-context";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("purple");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}
