"use client";

import { useTheme } from "@/features/theme";

function ThemeChanger() {
  const { theme, setTheme, accent, setAccent } = useTheme();

  return (
    <div className={`bg-color-bg text-color-text-main p-3`}>
      <label>
        Select Theme:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dim">Dim</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label>
        Select Accent:
        <select value={accent} onChange={(e) => setAccent(e.target.value)}>
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="red">Pink</option>
          <option value="orange">Orange</option>
          <option value="green">Green</option>
        </select>
      </label>
    </div>
  );
}

export default ThemeChanger;
