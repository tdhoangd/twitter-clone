"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

import React from "react";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("blue");
  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme, setTheme, accent, setAccent } = context;

  useEffect(() => {
    document.body.dataset.theme = theme;
    document.body.dataset.accent = accent;
  }, [theme, accent]);

  return { theme, setTheme, accent, setAccent };
};
