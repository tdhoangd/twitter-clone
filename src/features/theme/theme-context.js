import { createContext } from "react";

const ThemeContext = createContext({
  theme: "default",
  setTheme: () => {},
  accent: "blue",
  setAccent: () => {},
});

export default ThemeContext;
