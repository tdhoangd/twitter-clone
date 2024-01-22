import { useContext, useEffect } from "react";
import ThemeContext from "./theme-context";

export function useTheme() {
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
}
