import { createContext } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  accent: "purple",
  setAccent: () => {},
});

export default ThemeContext;
